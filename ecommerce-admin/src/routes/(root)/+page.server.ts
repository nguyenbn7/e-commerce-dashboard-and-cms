import type { PageServerLoad } from './$types';

import { getFirstStore } from '$features/stores/server/repository';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ locals }) => {
	const { userId } = locals.auth();
	if (!userId) redirect(StatusCodes.TEMPORARY_REDIRECT, '/sign-in');

	const store = await getFirstStore({ userId });
	if (store) redirect(StatusCodes.PERMANENT_REDIRECT, `/${store.id}`);

	return {};
}) satisfies PageServerLoad;
