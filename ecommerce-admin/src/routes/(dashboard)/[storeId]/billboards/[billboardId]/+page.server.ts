import type { Actions, PageServerLoad } from './$types';

import { StatusCodes } from 'http-status-codes';

import { fail, redirect } from '@sveltejs/kit';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { storeIdSchema } from '$features/stores/schema';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { billboardFormSchema, billboardIdSchema } from '$features/billboards/schema';
import { getBillboard, updateBillboard } from '$features/billboards/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = billboardIdSchema.safeParse({ billboardId: params.billboardId });
	if (!result.success) redirect(307, `/${store.id}/billboards`);

	const { billboardId } = result.data;

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
		const { userId } = locals.auth();
		if (!userId) redirect(307, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!checkStoreIdResult.success) redirect(307, '/');

		const form = await superValidate(request, zod(billboardFormSchema));
		if (!form.valid) return fail(400, { form });

		const { storeId } = checkStoreIdResult.data;

		const store = await findStoreByUserIdAndStoreId(userId, storeId);
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const checkBillboardIdResult = billboardIdSchema.safeParse({ billboardId: params.billboardId });
		if (!checkBillboardIdResult.success) redirect(308, `/${storeId}/billboards`);

		const { billboardId } = checkBillboardIdResult.data;
		const { label, imageUrl } = form.data;

		const billboard = await updateBillboard(storeId, billboardId, { label, imageUrl });

		form.data = {
			label: billboard.label,
			imageUrl: billboard.imageUrl
		};

		return { form };
	}
};
