import { PUBLIC_API_URL } from '$env/static/public';

import { ClientError } from '$lib/error';

export interface Params {
	id: string;
	storeId: string;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetCategoryResponseType = { category: Category | undefined };

export async function getCategory(params: Params): Promise<GetCategoryResponseType> {
	const { fetch: ssrFetch, id, storeId } = params;

	if (!id || !storeId)
		return {
			category: undefined
		};

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(new URL(`/api/stores/${storeId}/categories/${id}`, PUBLIC_API_URL));

	if (!response.ok) {
		const error = await response.json();

		const clientError = new ClientError(error.detail, response.status);

		throw clientError;
	}

	return response.json();
}
