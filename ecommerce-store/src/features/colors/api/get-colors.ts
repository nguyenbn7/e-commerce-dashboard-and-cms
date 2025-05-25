import { PUBLIC_API_URL } from '$env/static/public';

interface Params {
	storeId: string;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export async function getColors(params: Params): Promise<{ colors: Color[] }> {
	const { fetch: ssrFetch, storeId } = params;

	if (!storeId)
		return {
			colors: []
		};

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(new URL(`/api/stores/${storeId}/colors`, PUBLIC_API_URL));

	return response.json();
}
