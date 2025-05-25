import type { Params as GetProductsApiParams } from '$features/products/api/get-products';
import { getProducts as getProductsApi } from '$features/products/api/get-products';

type Params = Omit<GetProductsApiParams, 'fetch'> & {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

export async function getProducts(params: Params) {
	return getProductsApi(params);
}
