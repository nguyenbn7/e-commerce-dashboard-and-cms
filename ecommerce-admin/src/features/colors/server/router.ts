import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';

import { clerkMiddlewareAuthenticated } from '$lib/server/route.middleware';

import { storeIdSchema } from '$features/stores/schemas';
import { checkStoreBelongsToUser } from '$features/stores/server/route.middleware';

import { colorIdSchema } from '$features/colors/schemas';
import { deleteColor, getColor, getColors } from '$features/colors/server/repository';

const publicRoute = new Hono()
	.get('/', zValidator('param', storeIdSchema), async (c) => {
		const { storeId } = c.req.valid('param');

		const colors = await getColors(storeId);

		return c.json({
			colors
		});
	})
	.get('/:colorId', zValidator('param', storeIdSchema.extend(colorIdSchema.shape)), async (c) => {
		const { storeId, colorId } = c.req.valid('param');

		const color = await getColor(storeId, colorId);

		if (!color)
			return c.json(
				{
					error: {
						code: StatusCodes.NOT_FOUND,
						message: 'Color not found'
					}
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			color
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
		'/:colorId',
		zValidator('param', storeIdSchema.extend(colorIdSchema.shape)),
		checkStoreBelongsToUser(),
		async (c) => {
			const { storeId, colorId } = c.req.valid('param');

			const color = await getColor(storeId, colorId);

			if (!color)
				return c.json(
					{
						error: {
							code: StatusCodes.NOT_FOUND,
							message: 'Color not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			const deletedColor = await deleteColor(storeId, colorId);

			return c.json({
				color: deletedColor
			});
		}
	);

export default app;
