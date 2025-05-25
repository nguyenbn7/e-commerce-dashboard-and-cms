import { PUBLIC_API_URL } from '$env/static/public';
import { ClientError } from '$lib/error';

export interface Params {
	id: string;
	storeId: string;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetProductResponseType = { product: Product | undefined };

export async function getProduct(params: Params): Promise<GetProductResponseType> {
	const { fetch: ssrFetch, id, storeId } = params;

	if (!storeId || !id)
		return {
			product: undefined
		};

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(new URL(`/api/stores/${storeId}/products/${id}`, PUBLIC_API_URL));

	if (!ssrFetch) {
		if (!response.ok) {
			const error = await response.json();

			const clientError = new ClientError(error.detail, response.status);

			throw clientError;
		}
	}

	return response.json();
}
