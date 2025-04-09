import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';

import { clerkMiddlewareAuthenticated } from '$lib/server/route.middleware';

import { storeIdSchema } from '$features/stores/schemas';
import { checkStoreBelongsToUser } from '$features/stores/server/route.middleware';

import { productIdSchema } from '$features/products/schemas';
import { deleteProduct, getProduct, getProducts } from '$features/products/server/repository';

const publicRoute = new Hono()
	.get('/', zValidator('param', storeIdSchema), async (c) => {
		const { storeId } = c.req.valid('param');

		const products = await getProducts(storeId);

		return c.json({
			products
		});
	})
	.get(
		'/:productId',
		zValidator('param', storeIdSchema.extend(productIdSchema.shape)),
		async (c) => {
			const { storeId, productId } = c.req.valid('param');

			const product = await getProduct(storeId, productId);

			if (!product)
				return c.json(
					{
						error: {
							code: StatusCodes.NOT_FOUND,
							message: 'Product not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			return c.json({
				product
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
	// TODO: create product
	.delete(
		'/:productId',
		zValidator('param', storeIdSchema.extend(productIdSchema.shape)),
		checkStoreBelongsToUser(),
		async (c) => {
			const { storeId, productId } = c.req.valid('param');

			const product = await getProduct(storeId, productId);

			if (!product)
				return c.json(
					{
						error: {
							code: StatusCodes.NOT_FOUND,
							message: 'Product not found'
						}
					},
					StatusCodes.NOT_FOUND
				);

			const deletedProduct = await deleteProduct(storeId, productId);

			return c.json({
				product: deletedProduct
			});
		}
	);

export default app;
