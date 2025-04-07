import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
	clerkMiddlewareAuthenticated,
	configuredClerkMiddleware
} from '$lib/server/hono.middleware';
import { setupSchema, storeIdSchema } from '$features/stores/schemas';
import { createStore, deleteStore, getStores } from '$features/stores/server/repository';

const app = new Hono()
	.get('/', configuredClerkMiddleware, clerkMiddlewareAuthenticated(), async (c) => {
		const userId = c.get('userId');

		const stores = await getStores(userId);

		return c.json({
			status: 'success',
			data: {
				stores
			}
		});
	})
	.post(
		'/',
		configuredClerkMiddleware,
		clerkMiddlewareAuthenticated(),
		zValidator('json', setupSchema),
		async (c) => {
			const userId = c.get('userId');

			const { name } = c.req.valid('json');

			const store = await createStore(userId, { name });

			return c.json({
				status: 'success',
				data: {
					store
				}
			});
		}
	)
	.delete(
		'/:id',
		configuredClerkMiddleware,
		clerkMiddlewareAuthenticated(),
		zValidator('param', storeIdSchema),
		async (c) => {
			const { id: storeId } = c.req.valid('param');
			const userId = c.get('userId');

			// TODO: check if store exists
			await deleteStore(userId, storeId);

			return c.json({
				status: 'success',
				data: null
			});
		}
	);

export default app;
