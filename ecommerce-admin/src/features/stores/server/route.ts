import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';

import { clerkMiddlewareAuthenticated } from '$lib/server/route.middleware';

import { setupSchema, storeIdSchema } from '$features/stores/schemas';
import { checkStoreBelongsToUser } from '$features/stores/server/route.middleware';
import { createStore, deleteStore, getStore, getStores } from '$features/stores/server/repository';

const publicRoute = new Hono().get('/:storeId', zValidator('param', storeIdSchema), async (c) => {
	const { storeId } = c.req.valid('param');

	const store = await getStore(storeId);
	if (!store)
		return c.json({
			error: {
				code: StatusCodes.NOT_FOUND,
				message: 'Store not found'
			}
		});

	return c.json({
		store
	});
});

const app = publicRoute
	.use(
		clerkMiddleware({
			secretKey: CLERK_SECRET_KEY,
			publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY
		})
	)
	.use(clerkMiddlewareAuthenticated())
	.get('/', async (c) => {
		const userId = c.get('userId');

		const stores = await getStores(userId);

		return c.json({
			stores
		});
	})
	.post('/', zValidator('json', setupSchema), async (c) => {
		const userId = c.get('userId');

		const { name } = c.req.valid('json');

		const store = await createStore(userId, { name });

		return c.json({
			store
		});
	})
	.delete('/:storeId', zValidator('param', storeIdSchema), checkStoreBelongsToUser(), async (c) => {
		const { userId } = c.var;
		const { storeId } = c.req.valid('param');

		const deletedStore = await deleteStore(userId, storeId);

		return c.json({
			store: deletedStore
		});
	});

export default app;
