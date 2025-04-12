import { createQuery } from '@tanstack/svelte-query';
import getCategories from '../get-categories';

export default function createGetCategoriesQuery() {
	const query = createQuery<{ categories: Category[] }, Error>({
		queryKey: ['categories'],
		queryFn: async () => getCategories()
	});

	return query;
}
