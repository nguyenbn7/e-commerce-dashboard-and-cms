import { PUBLIC_API_URL } from '$env/static/public';

import { ClientError } from '$lib/error';

import queryString from 'query-string';

export interface Params {
	storeId: string;
	categoryId?: string;
	colorId?: string;
	sizeId?: string;
	isFeatured?: boolean;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetProductsResponseType = { products: Product[] };

export async function getProducts(params: Params): Promise<GetProductsResponseType> {
	const { categoryId, colorId, sizeId, isFeatured, fetch: ssrFetch, storeId } = params;

	if (!storeId)
		return {
			products: []
		};

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const url = queryString.stringifyUrl(
		{
			url: new URL(`/api/stores/${storeId}/products`, PUBLIC_API_URL).toString(),
			query: {
				categoryId,
				colorId,
				sizeId,
				isFeatured
			}
		},
		{
			skipEmptyString: true,
			skipNull: true
		}
	);

	const response = await _fetch(url);

	if (!ssrFetch) {
		if (!response.ok) {
			const error = await response.json();

			const clientError = new ClientError(error.detail, response.status);

			throw clientError;
		}
	}

	return response.json();
}
