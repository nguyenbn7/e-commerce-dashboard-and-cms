import type { Params as GetCategoryParams } from '$features/categories/api/get-category';

import { getCategory as getCategoryApi } from '$features/categories/api/get-category';

type Params = Omit<GetCategoryParams, 'fetch'> & {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

export async function getCategory(params: Params) {
	return getCategoryApi(params);
}
