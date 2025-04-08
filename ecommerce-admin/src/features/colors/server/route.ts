import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
	clerkMiddlewareAuthenticated,
	configuredClerkMiddleware
} from '$lib/server/hono.middleware';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';
import { deleteColor, getColor, getColors } from '$features/colors/server/repository';
import { storeIdAndColorIdSchema } from '$features/colors/schemas';

const app = new Hono()
	.get('/', zValidator('param', storeIdAndColorIdSchema.omit({ colorId: true })), async (c) => {
		const { storeId } = c.req.valid('param');

		const colors = await getColors(storeId);

		return c.json({
			status: 'success',
			data: {
				colors
			}
		});
	})
	.get('/:colorId', zValidator('param', storeIdAndColorIdSchema), async (c) => {
		const { storeId, colorId } = c.req.valid('param');

		const color = await getColor(storeId, colorId);

		if (!color)
			return c.json(
				{
					status: 'fail',
					data: {
						code: StatusCodes.NOT_FOUND,
						message: 'Color not found'
					}
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			status: 'success',
			data: {
				color
			}
		});
	})
	.delete(
		'/:colorId',
		configuredClerkMiddleware,
		clerkMiddlewareAuthenticated(),
		zValidator('param', storeIdAndColorIdSchema),
		async (c) => {
			const { storeId, colorId } = c.req.valid('param');
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

			const color = await getColor(storeId, colorId);

			if (!color)
				return c.json(
					{
						status: 'fail',
						data: {
							code: StatusCodes.NOT_FOUND,
							message: 'Color not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			await deleteColor(storeId, colorId);

			return c.json({
				status: 'success',
				data: null
			});
		}
	);

export default app;
