import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { settingsFormSchema } from '$features/settings/schemas';

export const load = (async ({ parent }) => {
	const { store } = await parent();

	const form = await superValidate(zod(settingsFormSchema), {
		defaults: store
	});

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request, params }) => {
		const { userId } = locals.auth;

		if (!userId) redirect(307, '/sign-in');

		const form = await superValidate(request, zod(settingsFormSchema));

		if (!form.valid) return fail(400, { form });

		console.log(form.data, params.storeId);
	}
} satisfies Actions;
