import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { getSizesSelection } from '$features/sizes/server/repository';
import { getCategoriesSelection } from '$features/categories/server/repository';
import { getColorsSelection } from '$features/colors/server/repository';

import { productFormSchema, productIdSchema } from '$features/products/schemas';
import { getProduct } from '$features/products/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = productIdSchema.safeParse({ productId: params.productId });
	if (!result.success) redirect(307, `/${store.id}/products`);

	const { productId } = result.data;

	const product = await getProduct(store.id, productId);
	if (!product) redirect(307, `/${store.id}/products`);

	const categories = await getCategoriesSelection(store.id);
	const sizes = await getSizesSelection(store.id);
	const colors = await getColorsSelection(store.id);

	return { product, categories, sizes, colors };
}) satisfies PageServerLoad;
