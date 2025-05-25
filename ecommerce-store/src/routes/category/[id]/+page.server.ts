import type { PageServerLoad } from './$types';

import { getCategory } from '$features/categories/api/server/get-category';

import { getProducts } from '$features/products/api/server/get-products';

import { getSizes } from '$features/sizes/api/server/get-sizes';

import { getColors } from '$features/colors/api/server/get-colors';

export const load = (async ({ params, url, fetch }) => {
	const searchParams = Object.fromEntries(url.searchParams.entries()) as {
		colorId: string;
		sizeId: string;
	};
	const { id } = params;

	const { category } = await getCategory({ id, fetch });

	const { products } = await getProducts({ categoryId: id, ...searchParams, fetch });

	const { sizes } = await getSizes({ fetch });

	const { colors } = await getColors({ fetch });

	return {
		products,
		sizes,
		colors,
		category
	};
}) satisfies PageServerLoad;
