import type { Actions, PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { storeIdSchema } from '$features/stores/schemas';
import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { productFormSchema, productIdSchema } from '$features/products/schemas';
import { getProduct } from '$features/products/server/repository';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();

	const result = productIdSchema.safeParse({ productId: params.productId });
	if (!result.success) redirect(307, `/${store.id}/products`);

	const { productId } = result.data;

	const product = await getProduct(store.id, productId);
	if (!product) redirect(307, `/${store.id}/products`);

	const form = await superValidate(zod(productFormSchema), {
		defaults: {
			name: product.name,
			image: product.image,
			price: product.price,
			categoryId: product.categoryId,
			colorId: product.colorId,
			sizeId: product.sizeId,
			isArchived: product.isArchived,
			isFeatured: product.isFeatured
		}
	});

	return { form, product };
}) satisfies PageServerLoad;

// export const actions: Actions = {
// 	default: async ({ request, locals, params }) => {
// 		const { userId } = locals.auth;
// 		if (!userId) redirect(307, '/sign-in');

// 		const checkStoreIdResult = storeIdSchema.safeParse({ id: params.storeId });

// 		if (!checkStoreIdResult.success) redirect(307, '/');

// 		const { id: storeId } = checkStoreIdResult.data;

// 		const form = await superValidate(request, zod(billboardFormSchema));
// 		if (!form.valid) return fail(400, { form });

// 		const storeByUserId = await findStoreByUserIdAndStoreId(userId, storeId);

// 		// TODO: add message
// 		if (!storeByUserId) return fail(403, { form });

// 		const checkBillboardIdResult = billboardIdSchema.safeParse({ id: params.billboardId });

// 		if (!checkBillboardIdResult.success) redirect(308, `/${storeId}/billboards`);

// 		const { id: billboardId } = checkBillboardIdResult.data;

// 		const { label, imageUrl } = form.data;

// 		const billboard = await updateBillboard(storeId, billboardId, { label, imageUrl });

// 		form.data = {
// 			label: billboard.label,
// 			imageUrl: billboard.imageUrl
// 		};

// 		return { form };
// 	}
// };
