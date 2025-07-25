import { getProduct as getProductApi } from '$features/products/api/get-product';

interface Params {
	id: string;
	storeId: string;
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export async function getProduct(params: Params) {
	return getProductApi(params);
}
