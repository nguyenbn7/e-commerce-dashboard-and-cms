import { PUBLIC_API_URL } from '$env/static/public';

import { ClientError } from '$lib/error';

import queryString from 'query-string';

export interface Params {
	categoryId?: string;
	colorId?: string;
	sizeId?: string;
	isFeatured?: boolean;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetProductsResponseType = { products: Product[] };

export async function getProducts(params: Params): Promise<GetProductsResponseType> {
	const { categoryId, colorId, sizeId, isFeatured, fetch: ssrFetch } = params;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const url = queryString.stringifyUrl(
		{
			url: new URL(
				'/api/stores/650ada53-900b-43b6-a97e-bd2a9277649b/products',
				PUBLIC_API_URL
			).toString(),
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
