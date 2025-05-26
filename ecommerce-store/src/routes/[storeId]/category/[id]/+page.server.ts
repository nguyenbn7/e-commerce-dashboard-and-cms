import type { PageServerLoad } from './$types';

import { getCategory } from '$features/categories/api/server/get-category';
import { getProducts } from '$features/products/api/server/get-products';
import { getSizes } from '$features/sizes/api/server/get-sizes';
import { getColors } from '$features/colors/api/server/get-colors';

import { StatusCodes } from 'http-status-codes';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, url, fetch }) => {
	const { id, storeId } = params;

	const searchParams = Object.fromEntries(url.searchParams.entries()) as {
		colorId: string;
		sizeId: string;
	};

	try {
		const { category } = await getCategory({ storeId, id, fetch });

		const { products } = await getProducts({ categoryId: id, storeId, ...searchParams, fetch });

		const { sizes } = await getSizes({ storeId, fetch });

		const { colors } = await getColors({ storeId, fetch });

		return {
			products,
			sizes,
			colors,
			category
		};
	} catch {
		redirect(StatusCodes.PERMANENT_REDIRECT, '/stores');
	}
}) satisfies PageServerLoad;
