import type { InferResponseType } from 'hono';
import { client } from '$lib/rpc';
import { createQuery } from '@tanstack/svelte-query';

export default function getStoresQuery() {
	const query = createQuery({
		queryKey: ['stores'],
		queryFn: async () => {
			const response = await client.api.stores.$get();

			return response.json();
		}
	});

	return query;
}

export type Store = ArrayElement<InferResponseType<typeof client.api.stores.$get>['stores']>;
