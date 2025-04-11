import { PUBLIC_API_URL } from '$env/static/public';
import { createQuery } from '@tanstack/svelte-query';
import queryString from 'query-string';

interface SearchParams {
	categoryId?: string;
	colorId?: string;
	sizeId?: string;
	isFeatured?: boolean;
}

const URL = `${PUBLIC_API_URL}/products`;

export default function getProductsQuery(seachParams: SearchParams) {
	const { categoryId, colorId, isFeatured, sizeId } = seachParams;
	const query = createQuery<{ products: Product[] }, Error>({
		queryKey: ['products'],
		queryFn: async () => {
			const url = queryString.stringifyUrl({
				url: URL,
				query: {
					categoryId,
					colorId,
					sizeId,
					isFeatured
				}
			});

			const response = await fetch(url);

			return response.json();
		}
	});

	return query;
}
