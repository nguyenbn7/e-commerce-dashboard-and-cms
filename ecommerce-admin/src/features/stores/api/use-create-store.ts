import type { InferRequestType, InferResponseType } from 'hono';
import { createMutation } from '@tanstack/svelte-query';
import { client } from '$lib/rpc';

type Response = InferResponseType<(typeof client.api.stores)['$post']>;
type Request = InferRequestType<(typeof client.api.stores)['$post']>['json'];
type ResponseError = { status: string; error: { code: number; message: string } };

export function useCreateStore() {
	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async (json) => {
			const response = await client.api.stores.$post({ json });

			if (!response.ok) {
				const { error } = (await response.json()) as unknown as ResponseError;

				throw new Error(error.message);
			}

			return response.json();
		}
	});

	return mutation;
}
