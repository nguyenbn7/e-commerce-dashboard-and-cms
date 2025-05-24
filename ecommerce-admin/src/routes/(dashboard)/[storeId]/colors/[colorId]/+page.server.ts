import type { Actions, PageServerLoad } from './$types';

import { StatusCodes } from 'http-status-codes';

import { fail, redirect } from '@sveltejs/kit';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { storeIdSchema } from '$features/stores/schema';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { colorFormSchema, colorIdSchema } from '$features/colors/schemas';
import { getColor, updateColor } from '$features/colors/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = colorIdSchema.safeParse({ colorId: params.colorId });
	if (!result.success) redirect(307, `/${store.id}/colors`);

	const { colorId } = result.data;

	const color = await getColor(store.id, colorId);
	if (!color) redirect(307, `/${store.id}/colors`);

	const form = await superValidate(zod(colorFormSchema), {
		defaults: {
			name: color.name,
			value: color.value
		}
	});

	return { form, color };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth();
		if (!userId) redirect(307, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!checkStoreIdResult.success) redirect(307, '/');

		const form = await superValidate(request, zod(colorFormSchema));
		if (!form.valid) return fail(400, { form });

		const { storeId } = checkStoreIdResult.data;

		const store = await findStoreByUserIdAndStoreId(userId, storeId);
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const checkColorIdResult = colorIdSchema.safeParse({ colorId: params.colorId });
		if (!checkColorIdResult.success) redirect(308, `/${storeId}/colors`);

		const { colorId } = checkColorIdResult.data;
		const { name, value } = form.data;

		const color = await updateColor(storeId, colorId, { name, value });

		form.data = {
			name: color.name,
			value: color.value
		};

		return { form };
	}
};
