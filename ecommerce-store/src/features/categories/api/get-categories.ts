import { PUBLIC_API_URL } from '$env/static/public';

interface Options {
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const URL = `${PUBLIC_API_URL}/categories`;

export default async function getCategories(
	params: Options = {}
): Promise<{ categories: Category[] }> {
	const { fetch: ssrFetch } = params;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	try {
		const response = await _fetch(URL);

		return response.json();
	} catch (error) {
		return { categories: [] };
	}
}
