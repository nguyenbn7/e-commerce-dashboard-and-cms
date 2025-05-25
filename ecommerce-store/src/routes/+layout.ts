import type { LayoutLoad } from './$types';

import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({ fetch }) => {
	const response = await fetch(new URL('/api/stores/available', PUBLIC_API_URL));

	const { stores } = ((await response.json()) as { stores: { id: string; name: string }[] }) ?? {
		stores: []
	};

	return { stores };
}) satisfies LayoutLoad;
