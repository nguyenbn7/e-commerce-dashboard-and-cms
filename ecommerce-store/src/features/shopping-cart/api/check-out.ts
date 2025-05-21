import { PUBLIC_API_URL } from '$env/static/public';
import { createMutation } from '@tanstack/svelte-query';

const URL = `${PUBLIC_API_URL}/checkout`;

type Request = { json: { productIds: string[] } };

type Response = any;

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
}

export default function checkout(options: Options = {}) {
	const { onError, onSuccess } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationKey: ['checkout'],
		mutationFn: async ({ json }) => {
			const response = await fetch(`${URL}`, {
				method: 'POST',
				body: JSON.stringify(json)
			});

			return response.json();
		},
		onSuccess,
		onError
	});

	return mutation;
}
