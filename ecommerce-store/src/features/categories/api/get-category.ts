import { PUBLIC_API_URL } from '$env/static/public';
import { throwHttpError } from '$lib';

interface Options {
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const URL = `${PUBLIC_API_URL}/categories`;

export default async function getCategory(
	id: number | string,
	options: Options = {}
): Promise<{ category: Category }> {
	const { fetch: ssrFetch } = options;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(`${URL}/${id}`);

	if (!response.ok) {
		await throwHttpError(response);
	}

	return response.json();
}
