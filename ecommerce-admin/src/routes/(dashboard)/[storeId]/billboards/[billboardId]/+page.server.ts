import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { storeIdSchema } from '$features/stores/schemas';
import { billboardFormSchema, billboardIdSchema } from '$features/billboards/schemas';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';
import { getBillboard, updateBillboard } from '$features/billboards/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();
	// TODO: check billboardId
	const { billboardId: id } = params;

	const result = billboardIdSchema.safeParse({ id: id });

	if (!result.success) redirect(307, `/${store.id}/billboards`);

	const { id: billboardId } = result.data;

	const billboard = await getBillboard(store.id, billboardId);

	if (!billboard) redirect(307, `/${store.id}/billboards`);

	const form = await superValidate(zod(billboardFormSchema), {
		defaults: {
			label: billboard.label,
			imageUrl: billboard.imageUrl
		}
	});

	return { form, billboard };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth;

		if (!userId) redirect(307, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ id: params.storeId });

		if (!checkStoreIdResult.success) redirect(307, '/');

		const { id: storeId } = checkStoreIdResult.data;

		const form = await superValidate(request, zod(billboardFormSchema));
		if (!form.valid) return fail(400, { form });

		const storeByUserId = await findStoreByUserIdAndStoreId(userId, storeId);

		// TODO: add message
		if (!storeByUserId) return fail(403, { form });

		const checkBillboardIdResult = billboardIdSchema.safeParse({ id: params.billboardId });

		if (!checkBillboardIdResult.success) redirect(308, `/${storeId}/billboards`);

		const { id: billboardId } = checkBillboardIdResult.data;

		const { label, imageUrl } = form.data;

		const newBillboard = await updateBillboard(storeId, billboardId, { label, imageUrl });

		form.data = {
			label: newBillboard.label,
			imageUrl: newBillboard.imageUrl
		};

		return { form };
	}
};
