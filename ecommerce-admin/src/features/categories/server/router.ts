import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';

import { clerkMiddlewareAuthenticated } from '$lib/server/api/middleware';

import { storeIdSchema } from '$features/stores/schema';
import { checkStoreBelongsToUser } from '$features/stores/server/api/middleware';

import { categoryIdSchema } from '$features/categories/schemas';
import { deleteCategory, getCategories, getCategory } from '$features/categories/server/repository';

const publicRoute = new Hono()
	.get('/', zValidator('param', storeIdSchema), async (c) => {
		const { storeId } = c.req.valid('param');

		const categories = await getCategories(storeId);

		return c.json({
			categories
		});
	})
	.get(
		'/:categoryId',
		zValidator('param', storeIdSchema.extend(categoryIdSchema.shape)),
		async (c) => {
			const { storeId, categoryId } = c.req.valid('param');

			const category = await getCategory(storeId, categoryId);

			if (!category)
				return c.json(
					{
						error: {
							code: StatusCodes.NOT_FOUND,
							message: 'Category not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			return c.json({
				category
			});
		}
	);

const app = publicRoute
	.use(
		clerkMiddleware({
			secretKey: CLERK_SECRET_KEY,
			publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY
		})
	)
	.use(clerkMiddlewareAuthenticated())
	.delete(
		'/:categoryId',
		clerkMiddlewareAuthenticated(),
		zValidator('param', storeIdSchema.extend(categoryIdSchema.shape)),
		checkStoreBelongsToUser(),
		async (c) => {
			const { storeId, categoryId } = c.req.valid('param');

			const category = await getCategory(storeId, categoryId);

			if (!category)
				return c.json(
					{
						error: {
							code: StatusCodes.NOT_FOUND,
							message: 'Category not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			const deletedCategory = await deleteCategory(storeId, categoryId);

			return c.json({
				category: deletedCategory
			});
		}
	);

export default app;
