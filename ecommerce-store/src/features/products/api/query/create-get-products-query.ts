import { createQuery } from '@tanstack/svelte-query';
import { getProducts } from '$features/products/api';

interface ProductsQuery {
	categoryId?: number;
	colorId?: number;
	sizeId?: number;
	isFeatured?: boolean;
}

export default function createGetProductsQuery(params: ProductsQuery) {
	const query = createQuery({
		queryKey: ['products'],
		queryFn: async () => getProducts({ ...params, fetch: undefined })
	});

	return query;
}
