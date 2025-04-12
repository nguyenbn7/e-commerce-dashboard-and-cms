import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import { productIdSchema } from '$features/products/schemas';
import { getProduct, getProducts } from '$features/products/api';

export const load = (async ({ params, fetch }) => {
	const result = productIdSchema.safeParse({ productId: params.productId });
	if (!result.success) redirect(308, '/');

	const { productId } = result.data;

	const response = await fetch(`${PUBLIC_API_URL}/products/${productId}`);
	if (!response.ok) redirect(308, '/');

	const { product } = await getProduct(productId, { fetch });
	const { products: suggestedProducts } = await getProducts({
		categoryId: product.category.id,
		fetch
	});

	return {
		product,
		suggestedProducts
	};
}) satisfies PageServerLoad;
