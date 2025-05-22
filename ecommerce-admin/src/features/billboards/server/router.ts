import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';

import { clerkMiddlewareAuthenticated } from '$lib/server/route.middleware';

import { storeIdSchema } from '$features/stores/schemas';
import { checkStoreBelongsToUser } from '$features/stores/server/route.middleware';

import { billboardIdSchema } from '$features/billboards/schemas';
import {
	deleteBillboard,
	getBillboard,
	getBillboards
} from '$features/billboards/server/repository';

const publicRoute = new Hono()
	.get('/', zValidator('param', storeIdSchema), async (c) => {
		const { storeId } = c.req.valid('param');

		const billboards = await getBillboards(storeId);

		return c.json({
			billboards
		});
	})
	.get(
		'/:billboardId',
		zValidator('param', storeIdSchema.extend(billboardIdSchema.shape)),
		async (c) => {
			const { storeId, billboardId } = c.req.valid('param');

			const billboard = await getBillboard(storeId, billboardId);

			if (!billboard)
				return c.json(
					{
						error: {
							code: StatusCodes.NOT_FOUND,
							message: 'Billboard not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			return c.json({
				billboard
			});
		}
	);

const app = publicRoute
	.use(
		clerkMiddleware({
			secretKey: CLERK_SECRET_KEY,
			publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY
		})
	)
	.use(clerkMiddlewareAuthenticated())
	.delete(
		'/:billboardId',
		zValidator('param', storeIdSchema.extend(billboardIdSchema.shape)),
		checkStoreBelongsToUser(),
		async (c) => {
			const { storeId, billboardId } = c.req.valid('param');

			const billboard = await getBillboard(storeId, billboardId);

			if (!billboard)
				return c.json(
					{
						error: {
							code: StatusCodes.NOT_FOUND,
							message: 'Billboard not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			const deletedBillboard = await deleteBillboard(storeId, billboardId);

			return c.json({
				billboard: deletedBillboard
			});
		}
	);

export default app;
