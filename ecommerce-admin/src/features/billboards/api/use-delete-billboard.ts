import type { InferRequestType, InferResponseType } from 'hono';
import { createMutation } from '@tanstack/svelte-query';
import { client } from '$lib/rpc';

type Response = InferResponseType<
	(typeof client.api.stores)[':storeId']['billboards'][':billboardId']['$delete'],
	200
>;
type Request = InferRequestType<
	(typeof client.api.stores)[':storeId']['billboards'][':billboardId']['$delete']
>;
type ResponseError = { status: string; error: { code: number; message: string } };

export type UseDeleteBillboardOptions = {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
};

export function useDeleteBillboard({ onSuccess, onError }: UseDeleteBillboardOptions) {
	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async ({ param }) => {
			const response = await client.api.stores[':storeId']['billboards'][':billboardId']['$delete'](
				{ param }
			);

			if (!response.ok) {
				const { error } = (await response.json()) as unknown as ResponseError;

				throw new Error(error.message);
			}

			return response.json();
		},
		onSuccess,
		onError
	});

	return mutation;
}
