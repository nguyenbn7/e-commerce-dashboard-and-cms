import type { InferRequestType, InferResponseType } from 'hono';

import { client } from '$lib/rpc';

import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';

type Response = InferResponseType<(typeof client.api.stores)[':id']['$delete']>;
type Request = InferRequestType<(typeof client.api.stores)[':id']['$delete']>;

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
}

export function deleteStore(options: Options = {}) {
	const { onSuccess, onError } = options;

	const queryClient = useQueryClient();

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async ({ param }) => {
			const response = await client.api.stores[':id'].$delete({ param });

			return response.json();
		},
		async onSuccess(data, variables, context) {
			toast.success('Store deleted');
			
			await queryClient.invalidateQueries({ queryKey: ['stores'] });

			window.location.reload();

			return onSuccess?.(data, variables, context);
		},
		onError(error, variables, context) {
			toast.error('Make sure you removed all billboards, categories, sizes, colors and products');

			return onError?.(error, variables, context);
		}
	});

	return mutation;
}
