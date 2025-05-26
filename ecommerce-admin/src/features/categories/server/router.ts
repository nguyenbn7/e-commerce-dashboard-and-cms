import { categoryIdSchema, storeIdSchema } from '$features/categories/schema';
import { deleteCategory, getCategories, getCategory } from '$features/categories/server/repository';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import {
	clerkMiddlewareAuthenticated,
	clerkMiddleware,
	storeCreatedByUserValidator,
	preventActionsWhenStoreClosed
} from '$lib/server/router.middleware';

const publicRoutes = new Hono()
	.use(preventActionsWhenStoreClosed())
	.get('/', zValidator('param', storeIdSchema), async (c) => {
		const { storeId } = c.req.valid('param');

		const categories = await getCategories({ storeId });

		return c.json({
			categories
		});
	})
	.get('/:id', zValidator('param', storeIdSchema.extend(categoryIdSchema.shape)), async (c) => {
		const { storeId, id } = c.req.valid('param');

		const category = await getCategory({ storeId, id });

		if (!category)
			return c.json(
				{
					title: ReasonPhrases.NOT_FOUND,
					status: StatusCodes.NOT_FOUND,
					detail: `Category not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			category
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.delete(
		'/:categoryId',
		zValidator('param', storeIdSchema.extend(categoryIdSchema.shape)),
		storeCreatedByUserValidator(),
		async (c) => {
			const { storeId, id } = c.req.valid('param');

			const category = await getCategory({ id, storeId });

			if (!category)
				return c.json(
					{
						title: ReasonPhrases.NOT_FOUND,
						status: StatusCodes.NOT_FOUND,
						detail: `Category not found`
					},
					StatusCodes.NOT_FOUND
				);

			const deletedCategory = await deleteCategory({ id, storeId });

			return c.json({
				category: deletedCategory
			});
		}
	);

export default app;
