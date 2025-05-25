import { PUBLIC_API_URL } from '$env/static/public';

interface Params {
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetCategoriesResponseType = { categories: Category[] };

export async function getCategories(params: Params = {}): Promise<GetCategoriesResponseType> {
	const { fetch: ssrFetch } = params;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(
		new URL('/api/stores/650ada53-900b-43b6-a97e-bd2a9277649b/categories', PUBLIC_API_URL)
	);

	return response.json();
}
