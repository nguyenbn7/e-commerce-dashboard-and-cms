import type { Actions, PageServerLoad } from './$types';

import { sizeFormSchema, storeIdSchema } from '$features/sizes/schema';
import { createSize } from '$features/sizes/server/repository';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { fail, redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const form = await superValidate(zod(sizeFormSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth();
		if (!userId) redirect(307, '/sign-in');

		const result = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!result.success) redirect(307, '/');

		const form = await superValidate(request, zod(sizeFormSchema));
		if (!form.valid) return fail(400, { form });

		const { storeId } = result.data;

		const store = await findStoreByUserIdAndStoreId({ userId, id: storeId });
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const { name, value } = form.data;

		await createSize({ name, value, storeId });

		return { form };
	}
};
