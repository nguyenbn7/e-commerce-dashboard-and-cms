import type { InferResponseType } from 'hono';
import { createQuery } from '@tanstack/svelte-query';
import { client } from '$lib/rpc';

type Response = InferResponseType<(typeof client.api.stores)[':storeId']['sizes']['$get'], 200>;
type ResponseError = { status: string; error: { code: number; message: string } };

export type UseGetSizes = ReturnType<typeof useGetSizes>;

export function useGetSizes(param: { storeId: number }) {
	const { storeId } = param;

	const queryClient = createQuery({
		queryKey: ['stores', storeId, 'sizes'],
		queryFn: async () => {
			const response = await client.api.stores[':storeId']['sizes']['$get']({
				param: {
					storeId: storeId.toString()
				}
			});

			if (!response.ok) {
				const { error } = (await response.json()) as unknown as ResponseError;

				throw new Error(error.message);
			}

			return response.json();
		}
	});

	return queryClient;
}

export type Size = ArrayElement<Response['data']['sizes']>;
