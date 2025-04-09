import type { PageServerLoad } from './$types';

import { getSizesSelection } from '$features/sizes/server/repository';
import { getCategoriesSelection } from '$features/categories/server/repository';
import { getColorsSelection } from '$features/colors/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const categories = await getCategoriesSelection(store.id);
	const sizes = await getSizesSelection(store.id);
	const colors = await getColorsSelection(store.id);

	return { categories, sizes, colors };
}) satisfies PageServerLoad;
