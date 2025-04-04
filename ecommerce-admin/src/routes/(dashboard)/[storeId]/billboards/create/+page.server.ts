import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { billboardFormSchema } from '$features/billboards/schemas';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const form = await superValidate(zod(billboardFormSchema));

	return { form };
}) satisfies PageServerLoad;
