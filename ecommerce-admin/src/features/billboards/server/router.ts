import { billboardIdSchema } from '$features/billboards/schema';
import {
	deleteBillboard,
	getBillboard,
	getBillboards
} from '$features/billboards/server/repository';

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

		const billboards = await getBillboards({ storeId: store.id });

		return c.json({
			billboards
		});
	})
	.get('/:id', notAllowWhenStoreClosed(), zValidator('param', billboardIdSchema), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const billboard = await getBillboard({ id, storeId: store.id });

		if (!billboard)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Billboard not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			billboard
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.delete('/:id', zValidator('param', billboardIdSchema), authorizeStoreByUser(), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const billboard = await getBillboard({ storeId: store.id, id });

		if (!billboard)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Billboard not found`
				},
				StatusCodes.NOT_FOUND
			);

		const deletedBillboard = await deleteBillboard({ storeId: store.id, id });

		return c.json({
			billboard: deletedBillboard
		});
	});

export default app;
