import type { PageServerLoad } from './$types';

import { productIdSchema } from '$features/products/schema';
import { getProduct } from '$features/products/api/get-product';
import { getProducts } from '$features/products/api/server/get-products';

import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, fetch }) => {
	const result = productIdSchema.safeParse({ id: params.id });
	if (!result.success) redirect(308, '/');

	const { id } = result.data;

	const { product } = await getProduct({ id, fetch });

	const { products: suggestedProducts } = await getProducts({
		categoryId: product.category.id,
		fetch
	});

	return {
		product,
		suggestedProducts
	};
}) satisfies PageServerLoad;
