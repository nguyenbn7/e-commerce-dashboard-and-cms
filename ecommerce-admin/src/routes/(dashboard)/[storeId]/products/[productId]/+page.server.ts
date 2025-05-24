import type { PageServerLoad } from './$types';

import { productIdSchema } from '$features/products/schema';
import { getProduct } from '$features/products/server/repository';

import { getSizesSelection } from '$features/sizes/server/repository';
import { getCategoriesSelection } from '$features/categories/server/repository';
import { getColorsSelection } from '$features/colors/server/repository';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = productIdSchema.safeParse({ id: params.productId });
	if (!result.success) redirect(StatusCodes.PERMANENT_REDIRECT, `/${store.id}/products`);

	const { id } = result.data;

	const product = await getProduct({ id, storeId: store.id });
	if (!product) redirect(StatusCodes.PERMANENT_REDIRECT, `/${store.id}/products`);

	const categories = await getCategoriesSelection({ storeId: store.id });
	const sizes = await getSizesSelection({ storeId: store.id });
	const colors = await getColorsSelection({ storeId: store.id });

	return { product, categories, sizes, colors };
}) satisfies PageServerLoad;
