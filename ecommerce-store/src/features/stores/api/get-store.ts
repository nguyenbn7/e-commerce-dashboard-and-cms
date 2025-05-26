import { PUBLIC_API_URL } from '$env/static/public';

export interface Params {
	id: string;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetStoreResponseType = {
	store: {
		id: string;
		name: string;
		billboards: Billboard[];
	};
};

export async function getStore(params: Params): Promise<GetStoreResponseType> {
	const { id, fetch: customFetch } = params;

	const _fetch = customFetch ? customFetch : fetch;

	const response = await _fetch(new URL(`/api/stores/${id}`, PUBLIC_API_URL));

	return response.json();
}
