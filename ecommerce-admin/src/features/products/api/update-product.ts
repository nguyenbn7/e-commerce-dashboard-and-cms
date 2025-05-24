import type { InferRequestType, InferResponseType } from 'hono';
import type { ResponseError } from '$lib/error';

import { client } from '$lib/rpc';
import { ClientError } from '$lib/error';

import { createMutation } from '@tanstack/svelte-query';

import { toast } from 'svelte-sonner';

type Response = InferResponseType<
	(typeof client.api.stores)[':storeId']['products'][':id']['$put'],
	200
>;
type Request = InferRequestType<(typeof client.api.stores)[':storeId']['products'][':id']['$put']>;

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
}

export function updateProduct(options: Options = {}) {
	const { onSuccess, onError } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async ({ param, json }) => {
			const response = await client.api.stores[':storeId']['products'][':id']['$put']({
				param,
				json
			});

			if (!response.ok) {
				const error = (await response.json()) as ResponseError;

				throw new ClientError(error.detail, response.status);
			}

			return response.json();
		},
		onSuccess(data, variables, context) {
			toast.success('Product updated');
			return onSuccess?.(data, variables, context);
		},
		onError(error, variables, context) {
			toast.error('Something went wrong');
			return onError?.(error, variables, context);
		}
	});

	return mutation;
}
