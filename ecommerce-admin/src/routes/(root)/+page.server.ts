import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getFirstStore } from '$features/stores/server/repository';

export const load = (async ({ locals }) => {
	const { userId } = locals.auth();

	if (!userId) redirect(307, '/sign-in');

	const store = await getFirstStore(userId);

	if (store) redirect(308, `/${store.id}`);

	return {};
}) satisfies PageServerLoad;
