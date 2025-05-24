import type { InferRequestType, InferResponseType } from 'hono';
import type { ResponseError } from '$lib/error';

import { client } from '$lib/rpc';
import { ClientError } from '$lib/error';

import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';

type Response = InferResponseType<
	(typeof client.api.stores)[':storeId']['billboards'][':id']['$delete']
>;

type Request = InferRequestType<
	(typeof client.api.stores)[':storeId']['billboards'][':id']['$delete']
>;

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
}

export function deleteBillboard(options: Options = {}) {
	const { onSuccess, onError } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async ({ param }) => {
			const response = await client.api.stores[':storeId']['billboards'][':id']['$delete']({
				param
			});

			if (!response.ok) {
				const error = (await response.json()) as ResponseError;

				throw new ClientError(error.detail, response.status);
			}

			return response.json();
		},
		onSuccess(data, variables, context) {
			toast.success('Billboard deleted');
			return onSuccess?.(data, variables, context);
		},
		onError(error, variables, context) {
			toast.error('Make sure you removed all categories using this billboard first');
			return onError?.(error, variables, context);
		}
	});

	return mutation;
}
