import type { PageServerLoad } from './$types';
import { getSizes } from '$features/sizes/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const sizes = await getSizes(store.id);
	
	return { sizes };
}) satisfies PageServerLoad;
