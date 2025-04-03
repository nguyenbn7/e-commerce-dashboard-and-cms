import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { findStoreById } from '$features/stores/server/repository';

export const load = (async ({ locals, params }) => {
	const { userId } = locals.auth;

	if (!userId) redirect(307, '/sign-in');

	const result = z.coerce.number().safeParse(params.storeId);

	if (!result.success) redirect(307, '/');

	const storeId = result.data;

	const store = await findStoreById(userId, storeId);

	if (!store) redirect(307, '/');

	return {
		store
	};
}) satisfies LayoutServerLoad;
