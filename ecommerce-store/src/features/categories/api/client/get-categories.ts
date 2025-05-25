import type { GetCategoriesResponseType } from '$features/categories/api/get-categories';
import type { ClientError } from '$lib/error';

import { getCategories as getCategoriesApi } from '$features/categories/api/get-categories';
import { createQuery } from '@tanstack/svelte-query';

export function getCategories() {
	const query = createQuery<GetCategoriesResponseType, ClientError>({
		queryKey: ['categories'],
		queryFn: async () => getCategoriesApi()
	});

	return query;
}
