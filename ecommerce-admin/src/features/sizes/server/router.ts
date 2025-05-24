import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';

import { clerkMiddlewareAuthenticated } from '$lib/server/api/middleware';

import { storeIdSchema } from '$features/stores/schema';
import { checkStoreBelongsToUser } from '$features/stores/server/api/middleware';

import { sizeIdSchema } from '$features/sizes/schemas';
import { deleteSize, getSize, getSizes } from '$features/sizes/server/repository';

const publicRoute = new Hono()
	.get('/', zValidator('param', storeIdSchema), async (c) => {
		const { storeId } = c.req.valid('param');

		const sizes = await getSizes(storeId);

		return c.json({
			sizes
		});
	})
	.get('/:sizeId', zValidator('param', storeIdSchema.extend(sizeIdSchema.shape)), async (c) => {
		const { storeId, sizeId } = c.req.valid('param');

		const size = await getSize(storeId, sizeId);

		if (!size)
			return c.json(
				{
					error: {
						code: StatusCodes.NOT_FOUND,
						message: 'Size not found'
					}
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			size
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
	.delete(
		'/:sizeId',
		zValidator('param', storeIdSchema.extend(sizeIdSchema.shape)),
		checkStoreBelongsToUser(),
		async (c) => {
			const { storeId, sizeId } = c.req.valid('param');

			const size = await getSize(storeId, sizeId);

			if (!size)
				return c.json(
					{
						error: {
							code: StatusCodes.NOT_FOUND,
							message: 'Size not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			const deletedSize = await deleteSize(storeId, sizeId);

			return c.json({
				size: deletedSize
			});
		}
	);

export default app;
