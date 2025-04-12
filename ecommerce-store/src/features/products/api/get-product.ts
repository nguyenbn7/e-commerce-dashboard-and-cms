import { PUBLIC_API_URL } from '$env/static/public';

interface Options {
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const URL = `${PUBLIC_API_URL}/products`;

export default async function getProduct(
	id: number,
	options: Options = {}
): Promise<{ product: Product }> {
	const { fetch: ssrFetch } = options;

	const _fetch = ssrFetch ? ssrFetch : fetch;

	try {
		const response = await _fetch(`${URL}/${id}`);

		if (!response.ok) {
			const data = (await response.json()) as ResponseError;
			throw new Error(data.error.message);
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}
