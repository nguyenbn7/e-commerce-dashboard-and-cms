import type { LayoutServerLoad } from './$types';
import { buildClerkProps } from 'svelte-clerk/server';

export const load = (async ({ locals }) => {
	return {
		...buildClerkProps(locals.auth)
	};
}) satisfies LayoutServerLoad;
