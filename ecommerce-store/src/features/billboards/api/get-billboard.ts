import { PUBLIC_API_URL } from '$env/static/public';
import { ClientError } from '$lib/error';
import { createQuery } from '@tanstack/svelte-query';

type Response = { billboard: Billboard };

interface Params {
	id: string;
}

export default function getBillboard(params: Params) {
	const { id } = params;

	const query = createQuery<Response, Error>({
		queryKey: ['billboards', id],
		queryFn: async () => {
			const response = await fetch(`${PUBLIC_API_URL}/billboards/${id}`);

			if (!response.ok) {
				const error = await response.json();

				const clientError = new ClientError(error.detail, response.status);

				throw clientError;
			}

			return response.json();
		}
	});

	return query;
}
