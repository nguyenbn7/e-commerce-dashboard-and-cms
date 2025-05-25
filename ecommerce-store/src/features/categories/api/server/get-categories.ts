import { getCategories as getCategoriesApi } from '$features/categories/api/get-categories';

interface Params {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export async function getCategories(params: Params) {
	return getCategoriesApi(params);
}
