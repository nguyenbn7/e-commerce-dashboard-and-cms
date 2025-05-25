import { PUBLIC_API_URL } from '$env/static/public';

import { ClientError } from '$lib/error';

import { createQuery } from '@tanstack/svelte-query';

import { derived, writable } from 'svelte/store';

interface Params {
	id: string;
	storeId: string;
}

const billboardParamsStore = writable<Params>({ id: '', storeId: '' });

export function setBillboardParams(params: Params) {
	billboardParamsStore.set(params);
}

interface Response {
	billboard: Billboard | undefined;
}

export function getBillboard(params: Params | undefined = undefined) {
	if (params) setBillboardParams(params);

	const query = createQuery<Response, Error>(
		derived(billboardParamsStore, ($params) => ({
			queryKey: ['stores', $params.storeId, 'billboards', $params.id],
			queryFn: async () => {
				const { id, storeId } = $params;

				if (!id || !storeId)
					return {
						billboard: undefined
					};

				const response = await fetch(
					new URL(`/api/stores/${storeId}/billboards/${id}`, PUBLIC_API_URL)
				);

				if (!response.ok) {
					const error = await response.json();

					const clientError = new ClientError(error.detail, response.status);

					throw clientError;
				}

				return response.json();
			}
		}))
	);

	return query;
}
