import { getProduct as getProductApi } from '$features/products/api/client/get-product';

interface Params {
	id: string;
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export async function getProduct(params: Params) {
	return getProductApi(params);
}
