import {
	productFormSchema,
	productIdSchema,
	productsSearchParamsSchema,
	storeIdSchema
} from '$features/products/schema';
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct
} from '$features/products/server/repository';

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
	.get(
		'/',
		zValidator('param', storeIdSchema),
		zValidator('query', productsSearchParamsSchema),
		async (c) => {
			const { storeId } = c.req.valid('param');
			const { categoryId, colorId, isFeatured, sizeId } = c.req.valid('query');

			const products = await getProducts({ storeId, categoryId, isFeatured, colorId, sizeId });

			return c.json({
				products
			});
		}
	)
	.get('/:id', zValidator('param', storeIdSchema.extend(productIdSchema.shape)), async (c) => {
		const { storeId, id } = c.req.valid('param');

		const product = await getProduct({ id, storeId });

		if (!product)
			return c.json(
				{
					title: ReasonPhrases.NOT_FOUND,
					status: StatusCodes.NOT_FOUND,
					detail: `Product not found`
				},
				StatusCodes.NOT_FOUND
			);

		return c.json({
			product
		});
	});

const app = publicRoutes
	.use(clerkMiddleware())
	.use(clerkMiddlewareAuthenticated())
	.post(
		'/',
		zValidator('param', storeIdSchema),
		storeCreatedByUserValidator(),
		zValidator('json', productFormSchema),
		async (c) => {
			const { storeId } = c.req.valid('param');
			const { name, price, categoryId, colorId, images, sizeId, isArchived, isFeatured } =
				c.req.valid('json');

			const product = await createProduct({
				storeId,
				name,
				price,
				categoryId,
				colorId,
				images,
				sizeId,
				isArchived,
				isFeatured
			});

			return c.json({
				product
			});
		}
	)
	.put(
		'/:id',
		zValidator('param', storeIdSchema.extend(productIdSchema.shape)),
		storeCreatedByUserValidator(),
		zValidator('json', productFormSchema),
		async (c) => {
			const { storeId, id } = c.req.valid('param');
			const { name, price, categoryId, colorId, images, sizeId, isArchived, isFeatured } =
				c.req.valid('json');

			const existedProduct = await getProduct({ id, storeId });

			if (!existedProduct)
				return c.json(
					{
						title: ReasonPhrases.NOT_FOUND,
						status: StatusCodes.NOT_FOUND,
						detail: `Product not found`
					},
					StatusCodes.NOT_FOUND
				);

			const product = await updateProduct(
				{ id, storeId },
				{
					name,
					price,
					categoryId,
					colorId,
					images,
					sizeId,
					isArchived,
					isFeatured
				}
			);

			return c.json({
				product
			});
		}
	)
	.delete(
		'/:id',
		zValidator('param', storeIdSchema.extend(productIdSchema.shape)),
		storeCreatedByUserValidator(),
		async (c) => {
			const { storeId, id } = c.req.valid('param');

			const product = await getProduct({ id, storeId });

			if (!product)
				return c.json(
					{
						title: ReasonPhrases.NOT_FOUND,
						status: StatusCodes.NOT_FOUND,
						detail: `Product not found`
					},
					StatusCodes.NOT_FOUND
				);

			const deletedProduct = await deleteProduct({ id, storeId });

			return c.json({
				product: deletedProduct
			});
		}
	);

export default app;
