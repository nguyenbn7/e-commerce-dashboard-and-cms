import type { InferRequestType, InferResponseType } from 'hono';

import { client } from '$lib/rpc';

import { createMutation } from '@tanstack/svelte-query';

import { toast } from 'svelte-sonner';

type Response = InferResponseType<(typeof client.api.stores)[':storeId']['products']['$post']>;
type Request = InferRequestType<(typeof client.api.stores)[':storeId']['products']['$post']>;

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
}

export function createProduct(options: Options = {}) {
	const { onSuccess, onError } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async ({ param, json }) => {
			const response = await client.api.stores[':storeId']['products']['$post']({
				param,
				json
			});

			return response.json();
		},
		onSuccess(data, variables, context) {
			toast.success('Product created');
			return onSuccess?.(data, variables, context);
		},
		onError(error, variables, context) {
			toast.error('Something went wrong');
			return onError?.(error, variables, context);
		}
	});

	return mutation;
}
