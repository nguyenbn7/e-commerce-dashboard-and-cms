import type { Actions, PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { storeIdSchema } from '$features/stores/schemas';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { productFormSchema } from '$features/products/schemas';
import { createProduct } from '$features/products/server/repository';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const form = await superValidate(zod(productFormSchema));

	return { form };
}) satisfies PageServerLoad;

// export const actions: Actions = {
// 	default: async ({ request, locals, params }) => {
// 		const { userId } = locals.auth;
// 		if (!userId) redirect(307, '/sign-in');

// 		const result = storeIdSchema.safeParse({ storeId: params.storeId });

// 		if (!result.success) redirect(307, '/');

// 		const form = await superValidate(request, zod(productFormSchema));
// 		if (!form.valid) return fail(400, { form });

// 		const { storeId } = result.data;

// 		const storeByUserId = await findStoreByUserIdAndStoreId(userId, storeId);
// 		if (!storeByUserId) return fail(403, { form });

// 		const { name,  } = form.data;

// 		await createProduct(storeId, { label, imageUrl });

// 		return { form };
// 	}
// };
