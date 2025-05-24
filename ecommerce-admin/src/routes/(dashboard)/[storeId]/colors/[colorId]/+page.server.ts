import type { Actions, PageServerLoad } from './$types';

import { colorFormSchema, colorIdSchema, storeIdSchema } from '$features/colors/schema';
import { getColor, updateColor } from '$features/colors/server/repository';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { fail, redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = colorIdSchema.safeParse({ id: params.colorId });
	if (!result.success) redirect(307, `/${store.id}/colors`);

	const { id } = result.data;

	const color = await getColor({ id, storeId: store.id });
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

		const store = await findStoreByUserIdAndStoreId({ userId, id: storeId });
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const checkColorIdResult = colorIdSchema.safeParse({ colorId: params.colorId });
		if (!checkColorIdResult.success) redirect(308, `/${storeId}/colors`);

		const { id } = checkColorIdResult.data;
		const { name, value } = form.data;

		const color = await updateColor({ storeId, id }, { name, value });

		form.data = {
			name: color.name,
			value: color.value
		};

		return { form };
	}
};
