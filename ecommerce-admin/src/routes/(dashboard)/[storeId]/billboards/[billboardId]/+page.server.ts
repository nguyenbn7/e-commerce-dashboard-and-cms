import type { Actions, PageServerLoad } from './$types';

import { billboardFormSchema, billboardIdSchema, storeIdSchema } from '$features/billboards/schema';
import { getBillboard, updateBillboard } from '$features/billboards/server/repository';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { fail, redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = billboardIdSchema.safeParse({ id: params.billboardId });
	if (!result.success) redirect(StatusCodes.PERMANENT_REDIRECT, `/${store.id}/billboards`);

	const { id } = result.data;

	const billboard = await getBillboard({ id, storeId: store.id });
	if (!billboard) redirect(StatusCodes.PERMANENT_REDIRECT, `/${store.id}/billboards`);

	const form = await superValidate(zod(billboardFormSchema), {
		defaults: {
			label: billboard.label,
			imageUrl: billboard.imageUrl,
			isFeatured: billboard.isFeatured
		}
	});

	return { form, billboard };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth();
		if (!userId) redirect(StatusCodes.TEMPORARY_REDIRECT, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!checkStoreIdResult.success) redirect(StatusCodes.PERMANENT_REDIRECT, '/');

		const form = await superValidate(request, zod(billboardFormSchema));
		if (!form.valid) return fail(StatusCodes.BAD_REQUEST, { form });

		const { storeId } = checkStoreIdResult.data;

		const store = await findStoreByUserIdAndStoreId({ userId, id: storeId });
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const checkBillboardIdResult = billboardIdSchema.safeParse({ id: params.billboardId });
		if (!checkBillboardIdResult.success)
			redirect(StatusCodes.PERMANENT_REDIRECT, `/${storeId}/billboards`);

		const { id } = checkBillboardIdResult.data;
		const { label, imageUrl, isFeatured } = form.data;

		console.log(label, imageUrl, isFeatured);

		const billboard = await updateBillboard({ storeId, id }, { label, imageUrl, isFeatured });

		form.data = {
			label: billboard.label,
			imageUrl: billboard.imageUrl,
			isFeatured: billboard.isFeatured
		};

		return { form };
	}
};
