import { PUBLIC_API_URL } from '$env/static/public';
import { createQuery } from '@tanstack/svelte-query';

const URL = `${PUBLIC_API_URL}/categories`;

export default function getCategoriesQuery() {
	const query = createQuery<{ categories: Category[] }, Error>({
		queryKey: ['categories'],
		queryFn: async () => {
			const response = await fetch(URL);

			return response.json();
		}
	});

	return query;
}
