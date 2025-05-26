import type { PageServerLoad } from './$types';

import { getStore } from '$features/stores/api/server/get-store';
import { getBillboard } from '$features/billboards/api/server/get-billboard';
import { getProducts } from '$features/products/api/server/get-products';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';
import { getCategories } from '$features/categories/api/server/get-categories';

export const load = (async ({ params, fetch }) => {
	const { storeId } = params;

	const { store } = await getStore({ id: storeId, fetch });

	if (!store) redirect(StatusCodes.PERMANENT_REDIRECT, '/stores');

	const billboard = store.billboards.at(0);

	const { products } = await getProducts({ storeId, isFeatured: true, fetch });

	const { categories } = await getCategories({ storeId, fetch });

	return {
		store,
		billboard,
		products,
		categories
	};
}) satisfies PageServerLoad;
