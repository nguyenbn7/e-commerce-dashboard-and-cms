import type { PageServerLoad } from './$types';

import { getProducts } from '$features/products/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const products = await getProducts({ storeId: store.id });

	return {
		products
	};
}) satisfies PageServerLoad;
