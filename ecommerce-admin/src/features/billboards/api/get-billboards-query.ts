import type { InferResponseType } from 'hono';
import { createQuery } from '@tanstack/svelte-query';
import { client } from '$lib/rpc';

type Response = InferResponseType<
	(typeof client.api.stores)[':storeId']['billboards']['$get'],
	200
>;
type ResponseError = { status: string; error: { code: number; message: string } };

export default function getBillboardsQuery(param: { storeId: number }) {
	const { storeId } = param;

	const queryClient = createQuery({
		queryKey: ['stores', storeId, 'billboards'],
		queryFn: async () => {
			const response = await client.api.stores[':storeId']['billboards']['$get']({
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

export type Billboard = ArrayElement<Response['data']['billboards']>;
