import type { Params as GetStoreApiParams } from '$features/stores/api/get-store';
import { getStore as getStoreApi } from '$features/stores/api/get-store';

type Params = Omit<GetStoreApiParams, 'fetch'> & {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

export async function getStore(params: Params) {
	try {
		return getStoreApi(params);
	} catch {
		return {
			store: undefined
		};
	}
}
