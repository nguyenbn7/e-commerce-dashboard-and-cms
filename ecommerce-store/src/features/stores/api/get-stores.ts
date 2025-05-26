import { PUBLIC_API_URL } from '$env/static/public';

export interface Store {
	id: string;
	name: string;
	isOpen: boolean;
}

export interface Params {
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetStoresResponseType = { stores: Store[] };

export async function getStores(params: Params = {}): Promise<GetStoresResponseType> {
	const { fetch: ssrFetch } = params;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	const response = await _fetch(new URL('/api/stores/status', PUBLIC_API_URL));

	return response.json();
}
