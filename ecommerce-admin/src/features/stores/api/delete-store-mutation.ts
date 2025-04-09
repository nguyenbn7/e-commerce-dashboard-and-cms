import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'svelte-sonner';
import { createMutation } from '@tanstack/svelte-query';
import { client } from '$lib/rpc';

type Response = InferResponseType<(typeof client.api.stores)[':storeId']['$delete']>;
type Request = InferRequestType<(typeof client.api.stores)[':storeId']['$delete']>;
type ResponseError = { error: { code: number; message: string } };

type Options = {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
};

export default function deleteStoreMutation(
	options: Options = { onSuccess: undefined, onError: undefined }
) {
	const { onSuccess, onError } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async ({ param }) => {
			const response = await client.api.stores[':storeId'].$delete({ param });

			if (!response.ok) {
				const { error } = (await response.json()) as unknown as ResponseError;

				throw new Error(error.message);
			}

			return response.json();
		},
		onSuccess(data, variables, context) {
			toast.success('Store deleted');
			return onSuccess?.(data, variables, context);
		},
		onError(error, variables, context) {
			toast.error('Make sure you removed all billboards, categories, sizes, colors and products');
			return onError?.(error, variables, context);
		}
	});

	return mutation;
}
