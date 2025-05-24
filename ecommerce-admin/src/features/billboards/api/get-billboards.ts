import type { InferResponseType } from 'hono';

import { client } from '$lib/rpc';

import { createQuery } from '@tanstack/svelte-query';

type Response = InferResponseType<(typeof client.api.stores)[':storeId']['billboards']['$get']>;

export function getBillboards(params: { storeId: string }) {
	const { storeId } = params;

	const queryClient = createQuery({
		queryKey: ['stores', storeId, 'billboards'],
		queryFn: async () => {
			const response = await client.api.stores[':storeId']['billboards']['$get']({
				param: {
					storeId
				}
			});

			return response.json();
		}
	});

	return queryClient;
}

export type Billboard = ArrayElement<Response['billboards']>;
