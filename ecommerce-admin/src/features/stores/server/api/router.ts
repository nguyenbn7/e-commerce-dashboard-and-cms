import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { setupSchema, storeIdSchema } from '$features/stores/schema';
import { validateUserHaveRightWithStore } from '$features/stores/server/api/middleware';
import { createStore, deleteStore, getStore, getStores } from '$features/stores/server/repository';
import { clerkMiddlewareAuthenticated } from '$features/stores/server/api/internal/middleware';

import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const publicRoute = new Hono().get('/:id', zValidator('param', storeIdSchema), async (c) => {
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

		const stores = await getStores({ userId });

		return c.json({
			stores
		});
	})
	.post('/', zValidator('json', setupSchema), async (c) => {
		const userId = c.get('userId');

		const { name } = c.req.valid('json');

		const store = await createStore({ userId }, { name });

		return c.json({
			store
		});
	})
	.delete(
		'/:id',
		zValidator('param', storeIdSchema),
		validateUserHaveRightWithStore(),
		async (c) => {
			const { id } = c.req.valid('param');
			const { userId } = c.var;

			const deletedStore = await deleteStore({ id, userId });

			return c.json({
				store: deletedStore
			});
		}
	);

export default app;
