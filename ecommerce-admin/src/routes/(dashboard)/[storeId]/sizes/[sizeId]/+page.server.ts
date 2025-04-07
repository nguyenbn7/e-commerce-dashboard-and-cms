import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { storeIdSchema } from '$features/stores/schemas';
import { sizeFormSchema, sizeIdSchema } from '$features/sizes/schemas';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';
import { getSize, updateSize } from '$features/sizes/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();
	// TODO: check billboardId
	const { sizeId: id } = params;

	const result = sizeIdSchema.safeParse({ id: id });

	if (!result.success) redirect(307, `/${store.id}/sizes`);

	const { id: sizeId } = result.data;

	const size = await getSize(store.id, sizeId);

	if (!size) redirect(307, `/${store.id}/sizes`);

	const form = await superValidate(zod(sizeFormSchema), {
		defaults: size
	});

	return { form, size };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth;

		if (!userId) redirect(307, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ id: params.storeId });

		if (!checkStoreIdResult.success) redirect(307, '/');

		const { id: storeId } = checkStoreIdResult.data;

		const form = await superValidate(request, zod(sizeFormSchema));
		if (!form.valid) return fail(400, { form });

		const storeByUserId = await findStoreByUserIdAndStoreId(userId, storeId);

		// TODO: add message
		if (!storeByUserId) return fail(403, { form });

		const checkSizeIdResult = sizeIdSchema.safeParse({ id: params.sizeId });

		if (!checkSizeIdResult.success) redirect(308, `/${storeId}/sizes`);

		const { id: sizeId } = checkSizeIdResult.data;

		const { name, value } = form.data;

		await updateSize(storeId, sizeId, { name, value });

		return { form };
	}
};
