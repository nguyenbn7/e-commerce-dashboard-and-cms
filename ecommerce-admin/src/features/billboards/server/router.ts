import {
	deleteBillboard,
	getBillboard,
	getBillboards
} from '$features/billboards/server/repository';
import { billboardIdSchema, storeIdSchema } from '$features/billboards/schema';

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

		const billboards = await getBillboards({ storeId });

		return c.json({
			billboards
		});
	})
	.get('/:id', zValidator('param', storeIdSchema.extend(billboardIdSchema.shape)), async (c) => {
		const { storeId, id } = c.req.valid('param');

		const billboard = await getBillboard({ id, storeId });

		if (!billboard)
			return c.json(
				{
					title: ReasonPhrases.NOT_FOUND,
					status: StatusCodes.NOT_FOUND,
					detail: `Billboard not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			billboard
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.delete(
		'/:id',
		zValidator('param', storeIdSchema.extend(billboardIdSchema.shape)),
		storeCreatedByUserValidator(),
		async (c) => {
			const { storeId, id } = c.req.valid('param');

			const billboard = await getBillboard({ storeId, id });

			if (!billboard)
				return c.json(
					{
						title: ReasonPhrases.NOT_FOUND,
						status: StatusCodes.NOT_FOUND,
						detail: `Billboard not found`
					},
					StatusCodes.NOT_FOUND
				);

			const deletedBillboard = await deleteBillboard({ storeId, id });

			return c.json({
				billboard: deletedBillboard
			});
		}
	);

export default app;
