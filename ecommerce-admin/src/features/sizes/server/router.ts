import { sizeIdSchema } from '$features/sizes/schema';
import { deleteSize, getSize, getSizes } from '$features/sizes/server/repository';

import {
	clerkMiddleware,
	clerkMiddlewareAuthenticated,
	notAllowWhenStoreClosed,
	authorizeStoreByUser,
	validateStoreInDatabase
} from '$lib/server/router.middleware';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const publicRoutes = new Hono()
	.use(validateStoreInDatabase())
	.get('/', notAllowWhenStoreClosed(), async (c) => {
		const { store } = c.var;

		const sizes = await getSizes({ storeId: store.id });

		return c.json({
			sizes
		});
	})
	.get('/:id', notAllowWhenStoreClosed(), zValidator('param', sizeIdSchema), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const size = await getSize({ id, storeId: store.id });

		if (!size)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Size not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			size
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.delete('/:id', zValidator('param', sizeIdSchema), authorizeStoreByUser(), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const size = await getSize({ id, storeId: store.id });

		if (!size)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Size not found`
				},
				StatusCodes.NOT_FOUND
			);

		const deletedSize = await deleteSize({ id, storeId: store.id });

		return c.json({
			size: deletedSize
		});
	});

export default app;
