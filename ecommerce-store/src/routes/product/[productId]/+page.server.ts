import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { productIdSchema } from '$features/products/schemas';
import { getProduct, getProducts } from '$features/products/api';

export const load = (async ({ params, fetch }) => {
	const result = productIdSchema.safeParse({ productId: params.productId });
	if (!result.success) redirect(308, '/');

	const { productId } = result.data;

	let product: Product;

	try {
		const data = await getProduct(productId, { fetch });
		product = data.product;
	} catch (e) {
		const err = e as HttpError;
		error(err.status ?? 500, { message: err.message });
	}

	const { products: suggestedProducts } = await getProducts({
		categoryId: product.category.id,
		fetch
	});

	return {
		product,
		suggestedProducts
	};
}) satisfies PageServerLoad;
