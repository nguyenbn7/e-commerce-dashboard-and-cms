import type { PageServerLoad } from './$types';
import { getCategories } from '$features/categories/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();
	const categories = await getCategories(store.id);
	return { categories };
}) satisfies PageServerLoad;
