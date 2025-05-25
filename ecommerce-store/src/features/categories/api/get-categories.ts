import { PUBLIC_API_URL } from '$env/static/public';

interface Params {
	storeId: string;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetCategoriesResponseType = { categories: Category[] };

export async function getCategories(
	params: Params = { storeId: '' }
): Promise<GetCategoriesResponseType> {
	const { fetch: ssrFetch, storeId } = params;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(new URL(`/api/stores/${storeId}/categories`, PUBLIC_API_URL));

	return response.json();
}
