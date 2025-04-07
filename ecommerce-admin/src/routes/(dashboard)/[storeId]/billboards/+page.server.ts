import type { PageServerLoad } from './$types';
import { getBillboards } from '$features/billboards/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const billboards = await getBillboards(store.id);

	return {
		billboards
	};
}) satisfies PageServerLoad;
