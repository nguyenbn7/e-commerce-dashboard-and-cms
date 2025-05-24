import type { PageServerLoad } from './$types';

import { getSizesSelection } from '$features/sizes/server/repository';
import { getCategoriesSelection } from '$features/categories/server/repository';
import { getColorsSelection } from '$features/colors/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const categories = await getCategoriesSelection({ storeId: store.id });
	const sizes = await getSizesSelection({ storeId: store.id });
	const colors = await getColorsSelection({ storeId: store.id });

	return { categories, sizes, colors };
}) satisfies PageServerLoad;
