import type { RequestIdVariables } from 'hono/request-id';

import { setupSchema, storeIdSchema } from '$features/stores/schema';
import {
	createStore,
	deleteStore,
	getStoresIncludeStatus,
	getStore,
	getStores
} from '$features/stores/server/repository';

import {
	authorizeStoreByUser,
	clerkMiddleware,
	clerkMiddlewareAuthenticated,
	validateStoreInDatabase
} from '$lib/server/router.middleware';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const publicRoutes = new Hono<{ Variables: RequestIdVariables }>()
	.get('/status', async (c) => {
		const stores = await getStoresIncludeStatus();

		return c.json({
			stores
		});
	})
	.get('/:id', zValidator('param', storeIdSchema), async (c) => {
		const { requestId } = c.var;
		const { id } = c.req.valid('param');

		const store = await getStore({ id });

		if (!store)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Store not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			store
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.get('/', async (c) => {
		const userId = c.get('userId');

		const stores = await getStores({ userId });

		return c.json({
			stores
		});
	})
	.post('/', zValidator('json', setupSchema), async (c) => {
		const userId = c.get('userId');

		const { name } = c.req.valid('json');

		const store = await createStore({ userId, name });

		return c.json({
			store
		});
	})
	.delete('/:id', validateStoreInDatabase('id'), authorizeStoreByUser(), async (c) => {
		const { userId, store } = c.var;

		const deletedStore = await deleteStore({ id: store.id, userId });

		return c.json({
			store: deletedStore
		});
	});

export default app;
