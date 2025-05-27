import { PUBLIC_API_URL } from '$env/static/public';
import { createMutation } from '@tanstack/svelte-query';

type Request = { json: { productIds: string[] }; param: { storeId: string } };

type Response = { url: string };

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
}
// TODO: make checkout to another features
export default function checkout(options: Options = {}) {
	const { onError, onSuccess } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationKey: ['checkout'],
		mutationFn: async ({ json, param }) => {
			const { storeId } = param;
			const response = await fetch(new URL(`/api/stores/${storeId}/checkout`, PUBLIC_API_URL), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(json)
			});

			return response.json();
		},
		onSuccess,
		onError
	});

	return mutation;
}
