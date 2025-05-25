import { PUBLIC_API_URL } from '$env/static/public';

import { ClientError } from '$lib/error';

import { createQuery } from '@tanstack/svelte-query';

import { derived, writable } from 'svelte/store';

interface Params {
	id: string;
}

const billboardParamsStore = writable<Params>({ id: '' });

export function setBillboardParams(params: Params) {
	billboardParamsStore.set(params);
}

interface Response {
	billboard: Billboard;
}

export function getBillboard(params: Params | undefined = undefined) {
	if (params) setBillboardParams(params);

	const query = createQuery<Response, Error>(
		derived(billboardParamsStore, ($params) => ({
			queryKey: ['billboards', $params.id],
			queryFn: async () => {
				const { id } = $params;

				const response = await fetch(
					new URL(
						`/api/stores/650ada53-900b-43b6-a97e-bd2a9277649b/billboards/${id}`,
						PUBLIC_API_URL
					)
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
