import type { LayoutServerLoad } from './$types';

import { storeIdSchema } from '$features/stores/schema';
import { findStoreById } from '$features/stores/server/repository';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ locals, params }) => {
	const { userId } = locals.auth();
	if (!userId) redirect(StatusCodes.TEMPORARY_REDIRECT, '/sign-in');

	const result = storeIdSchema.safeParse({ id: params.storeId });
	if (!result.success) redirect(StatusCodes.TEMPORARY_REDIRECT, '/');

	const { id } = result.data;

	const store = await findStoreById({ userId, id });
	if (!store) redirect(StatusCodes.TEMPORARY_REDIRECT, '/');

	return {
		store
	};
}) satisfies LayoutServerLoad;
