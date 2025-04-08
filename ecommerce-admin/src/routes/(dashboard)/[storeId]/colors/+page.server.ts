import type { PageServerLoad } from './$types';
import { getColors } from '$features/colors/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const colors = await getColors(store.id);

	return { colors };
}) satisfies PageServerLoad;
