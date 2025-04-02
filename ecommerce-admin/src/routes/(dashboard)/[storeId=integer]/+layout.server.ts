import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async ({ locals, params }) => {
	const { userId } = locals.auth;

	if (!userId) redirect(307, '/sign-in');

	const store = await prisma.store.findFirst({
		where: {
			id: Number(params.storeId),
			userId
		}
	});

	if (!store) redirect(307, '/');

	return {
		store
	};
}) satisfies LayoutServerLoad;
