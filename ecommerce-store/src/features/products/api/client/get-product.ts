import type {
	GetProductResponseType,
	Params as GetProductParams
} from '$features/products/api/get-product';
import type { ClientError } from '$lib/error';

import { getProduct as getProductApi } from '$features/products/api/get-product';

import { createQuery } from '@tanstack/svelte-query';

import { derived, writable } from 'svelte/store';

type Params = Omit<GetProductParams, 'fetch'>;

const productParamsStore = writable<Params>({ id: '' });

export function setProductParams(params: Params) {
	productParamsStore.set(params);
}

export function getProduct(params: Params | undefined = undefined) {
	if (params) setProductParams(params);

	const query = createQuery<GetProductResponseType, ClientError>(
		derived(productParamsStore, ($params) => ({
			queryKey: ['products', $params.id],
			queryFn: async () => getProductApi({ ...$params })
		}))
	);

	return query;
}
