import type { Handle } from '@sveltejs/kit';
import { withClerkHandler } from 'svelte-clerk/server';
import { delay } from '$lib';

const { DEV } = import.meta.env;

export const handle: Handle = async ({ event, resolve }) => {
	// Stimulate long request
	if (
		DEV &&
		(event.request.method === 'POST' ||
			event.request.method === 'PUT' ||
			event.request.method === 'DELETE')
	)
		await delay(1, 2);

	if (event.url.pathname.startsWith('/api')) {
		return resolve(event);
	}

	return withClerkHandler()({ event, resolve });
};
