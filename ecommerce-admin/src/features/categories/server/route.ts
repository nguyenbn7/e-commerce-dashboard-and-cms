import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
	clerkMiddlewareAuthenticated,
	configuredClerkMiddleware
} from '$lib/server/hono.middleware';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';
import { deleteCategory, getCategories, getCategory } from './repository';
import { storeIdAndCategoryIdSchema } from '../schemas';

const app = new Hono()
	.get(
		'/',
		zValidator('param', storeIdAndCategoryIdSchema.omit({ categoryId: true })),
		async (c) => {
			const { storeId } = c.req.valid('param');

			const categories = await getCategories(storeId);

			return c.json({
				status: 'success',
				data: {
					categories
				}
			});
		}
	)
	.get('/:categoryId', zValidator('param', storeIdAndCategoryIdSchema), async (c) => {
		const { storeId, categoryId } = c.req.valid('param');

		const category = await getCategory(storeId, categoryId);

		if (!category)
			return c.json(
				{
					status: 'fail',
					data: {
						code: StatusCodes.NOT_FOUND,
						message: 'Category not found'
					}
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			status: 'success',
			data: {
				category
			}
		});
	})
	.delete(
		'/:categoryId',
		configuredClerkMiddleware,
		clerkMiddlewareAuthenticated(),
		zValidator('param', storeIdAndCategoryIdSchema),
		async (c) => {
			const { storeId, categoryId } = c.req.valid('param');
			const userId = c.get('userId');

			const storeByUserId = await findStoreByUserIdAndStoreId(userId, storeId);

			if (!storeByUserId)
				return c.json(
					{
						status: 'error',
						error: {
							code: StatusCodes.UNAUTHORIZED,
							message: ReasonPhrases.UNAUTHORIZED
						}
					},
					StatusCodes.UNAUTHORIZED
				);

			const category = await getCategory(storeId, categoryId);

			if (!category)
				return c.json(
					{
						status: 'fail',
						data: {
							code: StatusCodes.NOT_FOUND,
							message: 'Billboard not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			await deleteCategory(storeId, categoryId);

			return c.json({
				status: 'success',
				data: null
			});
		}
	);

export default app;
