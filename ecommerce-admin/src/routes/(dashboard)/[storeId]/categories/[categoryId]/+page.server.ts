import type { Actions, PageServerLoad } from './$types';

import { categoryFormSchema, categoryIdSchema, storeIdSchema } from '$features/categories/schema';
import { getCategory, updateCategory } from '$features/categories/server/repository';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { fail, redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = categoryIdSchema.safeParse({ id: params.categoryId });
	if (!result.success) redirect(307, `/${store.id}/categories`);

	const { id } = result.data;

	const category = await getCategory({ storeId: store.id, id });
	if (!category) redirect(307, `/${store.id}/categories`);

	const form = await superValidate(zod(categoryFormSchema), {
		defaults: {
			name: category.name,
			billboardId: category.billboardId
		}
	});

	return { form, category };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth();
		if (!userId) redirect(307, '/sign-in');

		const checkStoreIdResult = storeIdSchema.safeParse({ storeId: params.storeId });
		if (!checkStoreIdResult.success) redirect(307, '/');

		const form = await superValidate(request, zod(categoryFormSchema));
		if (!form.valid) return fail(400, { form });

		const { storeId } = checkStoreIdResult.data;

		const store = await findStoreByUserIdAndStoreId({ userId, id: storeId });
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const checkCategoryIdResult = categoryIdSchema.safeParse({ categoryId: params.categoryId });
		if (!checkCategoryIdResult.success) redirect(308, `/${storeId}/categories`);

		const { id } = checkCategoryIdResult.data;
		const { name, billboardId } = form.data;

		const category = await updateCategory({ storeId, id }, { name, billboardId });

		form.data = {
			name: category.name,
			billboardId: category.billboardId
		};

		return { form };
	}
};
