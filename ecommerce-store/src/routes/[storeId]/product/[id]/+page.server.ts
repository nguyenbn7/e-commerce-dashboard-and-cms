import type { PageServerLoad } from './$types';

import { getProduct } from '$features/products/api/server/get-product';
import { getProducts } from '$features/products/api/server/get-products';

import { redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

export const load = (async ({ params, fetch }) => {
	const { id, storeId } = params;

	try {
		const { product } = await getProduct({ id, storeId, fetch });

		const { products: suggestedProducts } = await getProducts({
			storeId,
			categoryId: product.category.id,
			fetch
		});

		return {
			product,
			suggestedProducts
		};
	} catch {
		redirect(StatusCodes.PERMANENT_REDIRECT, '/stores');
	}
}) satisfies PageServerLoad;
