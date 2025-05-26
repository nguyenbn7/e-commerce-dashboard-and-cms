import { categoryIdSchema } from '$features/categories/schema';
import { deleteCategory, getCategories, getCategory } from '$features/categories/server/repository';

import {
	clerkMiddlewareAuthenticated,
	clerkMiddleware,
	authorizeStoreByUser,
	notAllowWhenStoreClosed,
	validateStoreInDatabase
} from '$lib/server/router.middleware';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const publicRoutes = new Hono()
	.use(validateStoreInDatabase())
	.get('/', async (c) => {
		const { store } = c.var;

		const categories = await getCategories({ storeId: store.id });

		return c.json({
			categories
		});
	})
	.get('/:id', zValidator('param', categoryIdSchema), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const category = await getCategory({ storeId: store.id, id });

		if (!category)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
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
		zValidator('param', categoryIdSchema),
		authorizeStoreByUser(),
		async (c) => {
			const { store, requestId } = c.var;
			const { id } = c.req.valid('param');

			const category = await getCategory({ id, storeId: store.id });

			if (!category)
				return c.json(
					{
						id: requestId,
						status: StatusCodes.NOT_FOUND,
						title: ReasonPhrases.NOT_FOUND,
						detail: `Category not found`
					},
					StatusCodes.NOT_FOUND
				);

			const deletedCategory = await deleteCategory({ id, storeId: store.id });

			return c.json({
				category: deletedCategory
			});
		}
	);

export default app;
