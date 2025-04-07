import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
	clerkMiddlewareAuthenticated,
	configuredClerkMiddleware
} from '$lib/server/hono.middleware';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';
import { storeIdAndBillboardIdSchema } from '$features/billboards/schemas';
import {
	deleteBillboard,
	getBillboard,
	getBillboards
} from '$features/billboards/server/repository';

const app = new Hono()
	.get(
		'/',
		zValidator('param', storeIdAndBillboardIdSchema.omit({ billboardId: true })),
		async (c) => {
			const { storeId } = c.req.valid('param');

			const billboards = await getBillboards(storeId);

			return c.json({
				status: 'success',
				data: {
					billboards
				}
			});
		}
	)
	.get('/:billboardId', zValidator('param', storeIdAndBillboardIdSchema), async (c) => {
		const { storeId, billboardId } = c.req.valid('param');

		const billboard = await getBillboard(storeId, billboardId);

		if (!billboard)
			return c.json(
				{
					status: 'fail',
					data: {
						code: StatusCodes.NOT_FOUND,
						message: 'Billboard not found'
					}
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			status: 'success',
			data: {
				billboard
			}
		});
	})
	.delete(
		'/:billboardId',
		configuredClerkMiddleware,
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

			const billboard = await getBillboard(storeId, billboardId);

			if (!billboard)
				return c.json(
					{
						status: 'fail',
						data: {
							code: StatusCodes.NOT_FOUND,
							message: 'Billboard not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			await deleteBillboard(storeId, billboardId);

			return c.json({
				status: 'success',
				data: null
			});
		}
	);

export default app;
