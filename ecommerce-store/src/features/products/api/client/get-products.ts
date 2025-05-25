import type {
	GetProductsResponseType,
	Params as GetProductsParams
} from '$features/products/api/get-products';

import { getProducts as getProductsApi } from '$features/products/api/get-products';

import { createQuery } from '@tanstack/svelte-query';

import { derived, writable } from 'svelte/store';

type Params = Omit<GetProductsParams, 'fetch'>;

const productsParamsStore = writable<Params>({});

export function setProductsParams(params: Params) {
	productsParamsStore.set(params);
}

export function getProducts(params: Params | undefined = undefined) {
	if (params) setProductsParams(params);

	const query = createQuery<GetProductsResponseType, Error>(
		derived(productsParamsStore, ($params) => ({
			queryKey: ['products', $params],
			queryFn: async () => getProductsApi({ ...$params })
		}))
	);

	return query;
}
