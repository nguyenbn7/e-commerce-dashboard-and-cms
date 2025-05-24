import type { Actions, PageServerLoad } from './$types';

import { sizeFormSchema, sizeIdSchema, storeIdSchema } from '$features/sizes/schema';
import { getSize, updateSize } from '$features/sizes/server/repository';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { fail, redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = sizeIdSchema.safeParse({ id: params.sizeId });
	if (!result.success) redirect(StatusCodes.PERMANENT_REDIRECT, `/${store.id}/sizes`);

	const { id } = result.data;

	const size = await getSize({ id, storeId: store.id });
	if (!size) redirect(StatusCodes.PERMANENT_REDIRECT, `/${store.id}/sizes`);

	const form = await superValidate(zod(sizeFormSchema), {
		defaults: {
			name: size.name,
			value: size.value
		}
	});

	return { form, size };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth();
		if (!userId) redirect(StatusCodes.TEMPORARY_REDIRECT, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!checkStoreIdResult.success) redirect(StatusCodes.PERMANENT_REDIRECT, '/');

		const form = await superValidate(request, zod(sizeFormSchema));
		if (!form.valid) return fail(400, { form });

		const { storeId } = checkStoreIdResult.data;

		const store = await findStoreByUserIdAndStoreId({ userId, id: storeId });
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const checkSizeIdResult = sizeIdSchema.safeParse({ sizeId: params.sizeId });
		if (!checkSizeIdResult.success) redirect(308, `/${storeId}/sizes`);

		const { id } = checkSizeIdResult.data;
		const { name, value } = form.data;

		const size = await updateSize({ storeId, id }, { name, value });

		form.data = {
			name: size.name,
			value: size.value
		};

		return { form };
	}
};
