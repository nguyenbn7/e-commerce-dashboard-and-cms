import { PUBLIC_API_URL } from '$env/static/public';

interface Params {
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export async function getColors(params: Params = {}): Promise<{ colors: Color[] }> {
	const { fetch: ssrFetch } = params;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(
		new URL('/api/stores/650ada53-900b-43b6-a97e-bd2a9277649b/colors', PUBLIC_API_URL)
	);

	return response.json();
}
