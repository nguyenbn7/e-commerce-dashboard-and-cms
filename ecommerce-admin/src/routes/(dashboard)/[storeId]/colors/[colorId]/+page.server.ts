import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { storeIdSchema } from '$features/stores/schemas';
import { colorFormSchema, colorIdSchema } from '$features/colors/schemas';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';
import { getColor, updateColor } from '$features/colors/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();
	// TODO: check billboardId
	const { colorId: id } = params;

	const result = colorIdSchema.safeParse({ id: id });

	if (!result.success) redirect(307, `/${store.id}/colors`);

	const { id: colorId } = result.data;

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
		const { userId } = locals.auth;

		if (!userId) redirect(307, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ id: params.storeId });

		if (!checkStoreIdResult.success) redirect(307, '/');

		const { id: storeId } = checkStoreIdResult.data;

		const form = await superValidate(request, zod(colorFormSchema));
		if (!form.valid) return fail(400, { form });

		const storeByUserId = await findStoreByUserIdAndStoreId(userId, storeId);

		// TODO: add message
		if (!storeByUserId) return fail(403, { form });

		const checkColorIdResult = colorIdSchema.safeParse({ id: params.colorId });

		if (!checkColorIdResult.success) redirect(308, `/${storeId}/colors`);

		const { id: colorId } = checkColorIdResult.data;

		const { name, value } = form.data;

		const color = await updateColor(storeId, colorId, { name, value });

		form.data = {
			name: color.name,
			value: color.value
		};

		return { form };
	}
};
