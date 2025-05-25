import { PUBLIC_API_URL } from '$env/static/public';

interface Params {
	storeId: string;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

type GetSizesResponseType = Promise<{ sizes: Size[] }>;

export async function getSizes(params: Params): GetSizesResponseType {
	const { fetch: ssrFetch, storeId } = params;

	if (!storeId)
		return {
			sizes: []
		};

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(new URL(`/api/stores/${storeId}/sizes`, PUBLIC_API_URL));

	return response.json();
}
