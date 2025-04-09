import type { InferRequestType, InferResponseType } from 'hono';
import { createMutation } from '@tanstack/svelte-query';
import { client } from '$lib/rpc';
import { toast } from 'svelte-sonner';

type Response = InferResponseType<
	(typeof client.api.stores)[':storeId']['products'][':productId']['$put'],
	200
>;
type Request = InferRequestType<
	(typeof client.api.stores)[':storeId']['products'][':productId']['$put']
>;
type ResponseError = { error: { code: number; message: string } };

type Options = {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
};

export default function updateProductMutation(
	options: Options = { onSuccess: undefined, onError: undefined }
) {
	const { onSuccess, onError } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async ({ param, json }) => {
			const response = await client.api.stores[':storeId']['products'][':productId']['$put']({
				param,
				json
			});

			if (!response.ok) {
				const { error } = (await response.json()) as unknown as ResponseError;

				throw new Error(error.message);
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
