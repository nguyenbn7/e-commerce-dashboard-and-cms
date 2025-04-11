import { PUBLIC_API_URL } from '$env/static/public';
import { createQuery } from '@tanstack/svelte-query';

const URL = `${PUBLIC_API_URL}/billboards`;

export default function getBillboardQuery(billboardId: number) {
	const query = createQuery<{ billboard: Billboard }, Error>({
		queryKey: ['billboards', billboardId],
		queryFn: async () => {
			const response = await fetch(`${URL}/${billboardId}`);

			return response.json();
		}
	});

	return query;
}
