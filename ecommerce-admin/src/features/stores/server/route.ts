import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddlewareAuthenticated } from '$lib/server/hono.middleware';
import { setupSchema, storeIdAndBillboardIdSchema, storeIdSchema } from '../schemas';
import { createStore, deleteStore, findStoreByUserIdAndStoreId, getStores } from './repository';
import { deleteBillboard } from '$features/billboards/server/repository';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// TODO: public and private route

const app = new Hono()
	.use(
		clerkMiddleware({ secretKey: CLERK_SECRET_KEY, publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY })
	)
	.get('/', clerkMiddlewareAuthenticated(), async (c) => {
		const userId = c.get('userId');

		const stores = await getStores(userId);

		return c.json({
			status: 'success',
			data: {
				stores
			}
		});
	})
	.post('/', clerkMiddlewareAuthenticated(), zValidator('json', setupSchema), async (c) => {
		const userId = c.get('userId');

		const { name } = c.req.valid('json');

		const store = await createStore(userId, { name });

		return c.json({
			status: 'success',
			data: {
				store
			}
		});
	})
	.delete('/:id', clerkMiddlewareAuthenticated(), zValidator('param', storeIdSchema), async (c) => {
		const { id: storeId } = c.req.valid('param');
		const userId = c.get('userId');

		// TODO: check if store exists
		await deleteStore(userId, storeId);

		return c.json({
			status: 'success',
			data: null
		});
	})
	.delete(
		'/:storeId/billboards/:billboardId',
		clerkMiddlewareAuthenticated(),
		zValidator('param', storeIdAndBillboardIdSchema),
		async (c) => {
			const { storeId, billboardId } = c.req.valid('param');
			const userId = c.get('userId');

			const storeByUserId = await findStoreByUserIdAndStoreId(userId, storeId);

			if (!storeByUserId)
				return c.json(
					{
						status: 'error',
						error: {
							code: StatusCodes.UNAUTHORIZED,
							message: ReasonPhrases.UNAUTHORIZED
						}
					},
					StatusCodes.UNAUTHORIZED
				);

			// TODO: check if billboard exists

			await deleteBillboard(storeId, billboardId);

			return c.json({
				status: 'success',
				data: null
			});
		}
	);

export default app;
