import { colorIdSchema, storeIdSchema } from '$features/colors/schema';
import { deleteColor, getColor, getColors } from '$features/colors/server/repository';

import {
	clerkMiddleware,
	clerkMiddlewareAuthenticated,
	preventActionsWhenStoreClosed,
	storeCreatedByUserValidator
} from '$lib/server/router.middleware';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const publicRoutes = new Hono()
	.use(preventActionsWhenStoreClosed())
	.get('/', zValidator('param', storeIdSchema), async (c) => {
		const { storeId } = c.req.valid('param');

		const colors = await getColors({ storeId });

		return c.json({
			colors
		});
	})
	.get('/:id', zValidator('param', storeIdSchema.extend(colorIdSchema.shape)), async (c) => {
		const { storeId, id } = c.req.valid('param');

		const color = await getColor({ id, storeId });

		if (!color)
			return c.json(
				{
					title: ReasonPhrases.NOT_FOUND,
					status: StatusCodes.NOT_FOUND,
					detail: `Color not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			color
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.delete(
		'/:id',
		zValidator('param', storeIdSchema.extend(colorIdSchema.shape)),
		storeCreatedByUserValidator(),
		async (c) => {
			const { storeId, id } = c.req.valid('param');

			const color = await getColor({ id, storeId });

			if (!color)
				return c.json(
					{
						title: ReasonPhrases.NOT_FOUND,
						status: StatusCodes.NOT_FOUND,
						detail: `Color not found`
					},
					StatusCodes.NOT_FOUND
				);

			const deletedColor = await deleteColor({ id, storeId });

			return c.json({
				color: deletedColor
			});
		}
	);

export default app;
