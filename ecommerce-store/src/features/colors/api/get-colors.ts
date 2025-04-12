import { PUBLIC_API_URL } from '$env/static/public';

interface Options {
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const URL = `${PUBLIC_API_URL}/colors`;

export default async function getColors(options: Options = {}): Promise<{ colors: Color[] }> {
	const { fetch: ssrFetch } = options;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	try {
		const response = await _fetch(URL);

		return response.json();
	} catch (error) {
		return { colors: [] };
	}
}
