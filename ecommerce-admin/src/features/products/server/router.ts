import {
	productFormSchema,
	productIdSchema,
	productsSearchParamsSchema
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
	notAllowWhenStoreClosed,
	authorizeStoreByUser,
	validateStoreInDatabase
} from '$lib/server/router.middleware';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const publicRoutes = new Hono()
	.use(validateStoreInDatabase())
	.get(
		'/',
		notAllowWhenStoreClosed(),
		zValidator('query', productsSearchParamsSchema),
		async (c) => {
			const { store } = c.var;
			const { categoryId, colorId, isFeatured, sizeId } = c.req.valid('query');

			const products = await getProducts({
				storeId: store.id,
				categoryId,
				isFeatured,
				colorId,
				sizeId
			});

			return c.json({
				products
			});
		}
	)
	.get('/:id', notAllowWhenStoreClosed(), zValidator('param', productIdSchema), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const product = await getProduct({ id, storeId: store.id });

		if (!product)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
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
	.post('/', authorizeStoreByUser(), zValidator('json', productFormSchema), async (c) => {
		const { store } = c.var;
		const { name, price, categoryId, colorId, images, sizeId, isArchived, isFeatured } =
			c.req.valid('json');

		const product = await createProduct({
			storeId: store.id,
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
	})
	.put(
		'/:id',
		zValidator('param', productIdSchema),
		authorizeStoreByUser(),
		zValidator('json', productFormSchema),
		async (c) => {
			const { store, requestId } = c.var;
			const { id } = c.req.valid('param');
			const { name, price, categoryId, colorId, images, sizeId, isArchived, isFeatured } =
				c.req.valid('json');

			const existedProduct = await getProduct({ id, storeId: store.id });

			if (!existedProduct)
				return c.json(
					{
						id: requestId,
						status: StatusCodes.NOT_FOUND,
						title: ReasonPhrases.NOT_FOUND,
						detail: `Product not found`
					},
					StatusCodes.NOT_FOUND
				);

			const product = await updateProduct(
				{ id, storeId: store.id },
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
	.delete('/:id', zValidator('param', productIdSchema), authorizeStoreByUser(), async (c) => {
		const { store, requestId } = c.var;
		const { id } = c.req.valid('param');

		const product = await getProduct({ id, storeId: store.id });

		if (!product)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Product not found`
				},
				StatusCodes.NOT_FOUND
			);

		const deletedProduct = await deleteProduct({ id, storeId: store.id });

		return c.json({
			product: deletedProduct
		});
	});

export default app;
