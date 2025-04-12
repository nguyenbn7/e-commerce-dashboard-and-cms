import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProducts } from '$features/products/api';
import { getSizes } from '$features/sizes/api';
import { getColors } from '$features/colors/api';
import { getCategory } from '$features/categories/api';

export const load = (async ({ params, url, fetch }) => {
	const searchParams = Object.fromEntries(url.searchParams.entries()) as {
		colorId: string;
		sizeId: string;
	};
	const { categoryId } = params;

	let category: Category;

	try {
		const data = await getCategory(categoryId, { fetch });
		category = data.category;
	} catch (e) {
		const err = e as HttpError;
		error(err.status ?? 500, { message: err.message });
	}
	const { products } = await getProducts({ categoryId, ...searchParams, fetch });
	const { sizes } = await getSizes({ fetch });
	const { colors } = await getColors({ fetch });

	return {
		products,
		sizes,
		colors,
		category
	};
}) satisfies PageServerLoad;
