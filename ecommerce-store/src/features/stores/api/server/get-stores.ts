import { getStores as getStoresApi } from '$features/stores/api/get-stores';

type Params = {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

export async function getStores(params: Params) {
	return getStoresApi(params);
}
