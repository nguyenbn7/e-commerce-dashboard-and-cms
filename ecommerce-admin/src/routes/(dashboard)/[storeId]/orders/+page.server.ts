import type { PageServerLoad } from './$types';

import { getOrders } from '$features/orders/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const orders = await getOrders(store.id);

	return {
		orders
	};
}) satisfies PageServerLoad;
