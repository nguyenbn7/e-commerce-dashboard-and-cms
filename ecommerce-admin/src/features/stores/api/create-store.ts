import type { InferRequestType, InferResponseType } from 'hono';

import { client } from '$lib/rpc';

import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';

type Response = InferResponseType<(typeof client.api.stores)['$post']>;
type Request = InferRequestType<(typeof client.api.stores)['$post']>['json'];

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
}

export function createStore(options: Options = {}) {
	const { onSuccess, onError } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async (json) => {
			const response = await client.api.stores.$post({ json });

			return response.json();
		},
		onSuccess(data, variables, context) {
			toast.success('Store created');
			return onSuccess?.(data, variables, context);
		},
		onError(error, variables, context) {
			toast.error('Something went wrong');
			return onError?.(error, variables, context);
		}
	});

	return mutation;
}
