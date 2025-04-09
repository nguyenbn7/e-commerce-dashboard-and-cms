import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { findStoreById } from '$features/stores/server/repository';
import { storeIdSchema } from '$features/stores/schemas';

export const load = (async ({ locals, params }) => {
	const { userId } = locals.auth;

	if (!userId) redirect(307, '/sign-in');

	const result = storeIdSchema.safeParse({ storeId: params.storeId });

	if (!result.success) redirect(307, '/');

	const { storeId } = result.data;

	const store = await findStoreById(userId, storeId);

	if (!store) redirect(307, '/');

	return {
		store
	};
}) satisfies LayoutServerLoad;
