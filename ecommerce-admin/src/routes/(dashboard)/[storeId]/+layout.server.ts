import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import prisma from '$lib/server/prisma';

export const load = (async ({ locals, params }) => {
	const { userId } = locals.auth;

	if (!userId) redirect(307, '/sign-in');

	const result = z.coerce.number().safeParse(params.storeId);

	if (!result.success) redirect(307, '/');

	const storeId = result.data;

	const store = await prisma.store.findFirst({
		where: {
			id: storeId,
			userId
		}
	});

	if (!store) redirect(307, '/');

	return {
		store
	};
}) satisfies LayoutServerLoad;
