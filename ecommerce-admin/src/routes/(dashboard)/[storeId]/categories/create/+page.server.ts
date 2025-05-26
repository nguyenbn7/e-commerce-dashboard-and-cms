import type { Actions, PageServerLoad } from './$types';

import { categoryFormSchema, storeIdSchema } from '$features/categories/schema';
import { createCategory } from '$features/categories/server/repository';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { fail, redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const form = await superValidate(zod(categoryFormSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth();
		if (!userId) redirect(StatusCodes.TEMPORARY_REDIRECT, '/sign-in');

		const result = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!result.success) redirect(StatusCodes.PERMANENT_REDIRECT, '/');

		const form = await superValidate(request, zod(categoryFormSchema));
		if (!form.valid) return fail(StatusCodes.BAD_REQUEST, { form });

		const { storeId } = result.data;

		const store = await findStoreByUserIdAndStoreId({ userId, id: storeId });
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const { name, billboardId } = form.data;

		await createCategory({ name, billboardId, storeId });

		return { form };
	}
};
