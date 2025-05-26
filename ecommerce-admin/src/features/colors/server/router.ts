import { colorIdSchema } from '$features/colors/schema';
import { deleteColor, getColor, getColors } from '$features/colors/server/repository';

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

		const colors = await getColors({ storeId: store.id });

		return c.json({
			colors
		});
	})
	.get('/:id', zValidator('param', colorIdSchema), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const color = await getColor({ id, storeId: store.id });

		if (!color)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Color not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			color
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.delete('/:id', zValidator('param', colorIdSchema), authorizeStoreByUser(), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const color = await getColor({ id, storeId: store.id });

		if (!color)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Color not found`
				},
				StatusCodes.NOT_FOUND
			);

		const deletedColor = await deleteColor({ id, storeId: store.id });

		return c.json({
			color: deletedColor
		});
	});

export default app;
