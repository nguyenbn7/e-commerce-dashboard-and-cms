import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { categoryFormSchema } from '$features/categories/schemas';
import { storeIdSchema } from '$features/stores/schemas';
import { createCategory } from '$features/categories/server/repository';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const form = await superValidate(zod(categoryFormSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const { userId } = locals.auth;

		if (!userId) redirect(307, '/sign-in');

		const result = storeIdSchema.safeParse({ id: params.storeId });

		if (!result.success) redirect(307, '/');

		const { id: storeId } = result.data;

		const storeByUserId = await findStoreByUserIdAndStoreId(userId, storeId);

		const form = await superValidate(request, zod(categoryFormSchema));
		if (!form.valid) return fail(400, { form });

		// TODO: add message
		if (!storeByUserId) return fail(403, { form });

		const { name, billboardId } = form.data;

		await createCategory(storeId, { name, billboardId });

		return { form };
	}
};
