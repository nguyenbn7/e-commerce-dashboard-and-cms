import { PUBLIC_API_URL } from '$env/static/public';

interface Options {
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const URL = `${PUBLIC_API_URL}/sizes`;

export default async function getSizes(options: Options = {}): Promise<{ sizes: Size[] }> {
	const { fetch: ssrFetch } = options;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	try {
		const response = await _fetch(URL);

		return response.json();
	} catch (error) {
		return { sizes: [] };
	}
}
