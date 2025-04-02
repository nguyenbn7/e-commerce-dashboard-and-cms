import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const load = (async ({ locals }) => {
	const { userId } = locals.auth;

	if (!userId) redirect(307, '/sign-in');

	const store = await prisma.store.findFirst({
		where: {
			userId
		}
	});

	if (store) redirect(308, `/${store.id}`);

	return {};
}) satisfies PageServerLoad;
