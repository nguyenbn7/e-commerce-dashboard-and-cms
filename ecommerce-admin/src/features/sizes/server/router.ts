import { sizeIdSchema, storeIdSchema } from '$features/sizes/schema';
import { deleteSize, getSize, getSizes } from '$features/sizes/server/repository';

import {
	clerkMiddleware,
	clerkMiddlewareAuthenticated,
	storeCreatedByUserValidator
} from '$lib/server/router.middleware';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const publicRoutes = new Hono()
	.get('/', zValidator('param', storeIdSchema), async (c) => {
		const { storeId } = c.req.valid('param');

		const sizes = await getSizes({ storeId });

		return c.json({
			sizes
		});
	})
	.get('/:id', zValidator('param', storeIdSchema.extend(sizeIdSchema.shape)), async (c) => {
		const { storeId, id } = c.req.valid('param');

		const size = await getSize({ id, storeId });

		if (!size)
			return c.json(
				{
					title: ReasonPhrases.NOT_FOUND,
					status: StatusCodes.NOT_FOUND,
					detail: `Size not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			size
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.delete(
		'/:id',
		zValidator('param', storeIdSchema.extend(sizeIdSchema.shape)),
		storeCreatedByUserValidator(),
		async (c) => {
			const { storeId, id } = c.req.valid('param');

			const size = await getSize({ id, storeId });

			if (!size)
				return c.json(
					{
						title: ReasonPhrases.NOT_FOUND,
						status: StatusCodes.NOT_FOUND,
						detail: `Size not found`
					},
					StatusCodes.NOT_FOUND
				);

			const deletedSize = await deleteSize({ id, storeId });

			return c.json({
				size: deletedSize
			});
		}
	);

export default app;
