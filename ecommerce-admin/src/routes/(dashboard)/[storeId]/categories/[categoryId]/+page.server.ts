import type { Actions, PageServerLoad } from './$types';

import { StatusCodes } from 'http-status-codes';

import { fail, redirect } from '@sveltejs/kit';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { storeIdSchema } from '$features/stores/schema';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { categoryFormSchema, categoryIdSchema } from '$features/categories/schemas';
import { getCategory, updateCategory } from '$features/categories/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = categoryIdSchema.safeParse({ categoryId: params.categoryId });
	if (!result.success) redirect(307, `/${store.id}/categories`);

	const { categoryId } = result.data;

	const category = await getCategory(store.id, categoryId);
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

		const store = await findStoreByUserIdAndStoreId(userId, storeId);
		if (!store)
			return message(form, 'You do not own this store', { status: StatusCodes.FORBIDDEN });

		const checkCategoryIdResult = categoryIdSchema.safeParse({ categoryId: params.categoryId });
		if (!checkCategoryIdResult.success) redirect(308, `/${storeId}/categories`);

		const { categoryId } = checkCategoryIdResult.data;
		const { name, billboardId } = form.data;

		const category = await updateCategory(storeId, categoryId, { name, billboardId });

		form.data = {
			name: category.name,
			billboardId: category.billboardId
		};

		return { form };
	}
};
