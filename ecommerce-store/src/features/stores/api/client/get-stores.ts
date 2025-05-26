import { PUBLIC_API_URL } from '$env/static/public';
import { createQuery } from '@tanstack/svelte-query';

export type GetStoresResponseType = { stores: AvailableStore[] };

export function getStores() {
	const query = createQuery<GetStoresResponseType, Error>({
		queryKey: ['stores', 'available'],
		queryFn: async () => {
			const response = await fetch(new URL('/api/stores/status', PUBLIC_API_URL));

			try {
				return response.json() as Promise<GetStoresResponseType>;
			} catch {
				return { stores: [] };
			}
		}
	});

	return query;
}
