import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { billboardFormSchema, billboardIdSchema } from '$features/billboards/schemas';
import { getBillboard } from '$features/billboards/server/repository';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ parent, params }) => {
	const { store } = await parent();
	// TODO: check billboardId
	const { billboardId: id } = params;

	const result = billboardIdSchema.safeParse({ id: id });

	if (!result.success) redirect(307, `/${store.id}/billboards/create`);

	const { id: billboardId } = result.data;

	const billboard = await getBillboard(billboardId, store.id);

	if (!billboard) redirect(307, `/${store.id}/billboards/create`);

	const form = await superValidate(zod(billboardFormSchema), {
		defaults: billboard
	});

	return { form };
}) satisfies PageServerLoad;
