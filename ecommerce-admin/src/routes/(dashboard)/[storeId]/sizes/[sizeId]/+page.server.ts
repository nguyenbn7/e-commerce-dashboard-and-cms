import type { Actions, PageServerLoad } from './$types';

import { StatusCodes } from 'http-status-codes';

import { fail, redirect } from '@sveltejs/kit';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { storeIdSchema } from '$features/stores/schema';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { sizeFormSchema, sizeIdSchema } from '$features/sizes/schemas';
import { getSize, updateSize } from '$features/sizes/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = sizeIdSchema.safeParse({ sizeId: params.sizeId });
	if (!result.success) redirect(307, `/${store.id}/sizes`);

	const { sizeId } = result.data;

	const size = await getSize(store.id, sizeId);
	if (!size) redirect(307, `/${store.id}/sizes`);

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
		if (!userId) redirect(307, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!checkStoreIdResult.success) redirect(307, '/');

		const form = await superValidate(request, zod(sizeFormSchema));
		if (!form.valid) return fail(400, { form });

		const { storeId } = checkStoreIdResult.data;

		const store = await findStoreByUserIdAndStoreId(userId, storeId);
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const checkSizeIdResult = sizeIdSchema.safeParse({ sizeId: params.sizeId });
		if (!checkSizeIdResult.success) redirect(308, `/${storeId}/sizes`);

		const { sizeId } = checkSizeIdResult.data;
		const { name, value } = form.data;

		const size = await updateSize(storeId, sizeId, { name, value });

		form.data = {
			name: size.name,
			value: size.value
		};

		return { form };
	}
};
