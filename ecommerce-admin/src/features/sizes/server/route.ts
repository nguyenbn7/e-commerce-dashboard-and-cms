import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
	clerkMiddlewareAuthenticated,
	configuredClerkMiddleware
} from '$lib/server/hono.middleware';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';
import { deleteSize, getSize, getSizes } from '$features/sizes/server/repository';
import { storeIdAndSizeIdSchema } from '$features/sizes/schemas';

const app = new Hono()
	.get('/', zValidator('param', storeIdAndSizeIdSchema.omit({ sizeId: true })), async (c) => {
		const { storeId } = c.req.valid('param');

		const sizes = await getSizes(storeId);

		return c.json({
			status: 'success',
			data: {
				sizes
			}
		});
	})
	.get('/:sizeId', zValidator('param', storeIdAndSizeIdSchema), async (c) => {
		const { storeId, sizeId } = c.req.valid('param');

		const size = await getSize(storeId, sizeId);

		if (!size)
			return c.json(
				{
					status: 'fail',
					data: {
						code: StatusCodes.NOT_FOUND,
						message: 'Size not found'
					}
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			status: 'success',
			data: {
				size
			}
		});
	})
	.delete(
		'/:sizeId',
		configuredClerkMiddleware,
		clerkMiddlewareAuthenticated(),
		zValidator('param', storeIdAndSizeIdSchema),
		async (c) => {
			const { storeId, sizeId } = c.req.valid('param');
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

			const size = await getSize(storeId, sizeId);

			if (!size)
				return c.json(
					{
						status: 'fail',
						data: {
							code: StatusCodes.NOT_FOUND,
							message: 'Size not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			await deleteSize(storeId, sizeId);

			return c.json({
				status: 'success',
				data: null
			});
		}
	);

export default app;
