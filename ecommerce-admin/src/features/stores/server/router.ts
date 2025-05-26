import { setupSchema, storeIdSchema } from '$features/stores/schema';
import { storeCreatedByUserValidator } from '$features/stores/server/router.middleware';
import {
	createStore,
	deleteStore,
	getStoresIncludeStatus,
	getStore,
	getStores
} from '$features/stores/server/repository';

import { clerkMiddleware, clerkMiddlewareAuthenticated } from '$lib/server/router.middleware';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const publicRoutes = new Hono()
	.get('/status', async (c) => {
		const stores = await getStoresIncludeStatus();

		return c.json({
			stores
		});
	})
	.get('/:id', zValidator('param', storeIdSchema), async (c) => {
		const { id } = c.req.valid('param');

		const store = await getStore({ id });

		if (!store)
			return c.json(
				{
					title: ReasonPhrases.NOT_FOUND,
					status: StatusCodes.NOT_FOUND,
					detail: `Store with id "${id}" not found`
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
	.delete('/:id', zValidator('param', storeIdSchema), storeCreatedByUserValidator(), async (c) => {
		const { id } = c.req.valid('param');
		const { userId } = c.var;

		const deletedStore = await deleteStore({ id, userId });

		return c.json({
			store: deletedStore
		});
	});

export default app;
