import type { PageServerLoad } from './$types';

import { getStores } from '$features/stores/api/server/get-stores';

export const load = (async ({ fetch }) => {
	const { stores } = await getStores({ fetch });

	return {
		stores
	};
}) satisfies PageServerLoad;
