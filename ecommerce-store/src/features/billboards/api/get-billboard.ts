import { PUBLIC_API_URL } from '$env/static/public';

export interface Params {
	id: string;
	storeId: string;
	fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export type GetBillboardResponseType = {
	billboard: {
		id: string;
		label: string;
		imageUrl: string;
	};
};

export async function getBillboard(params: Params): Promise<GetBillboardResponseType> {
	const { storeId, id } = params;

	const response = await fetch(new URL(`/api/stores/${storeId}/billboards/${id}`, PUBLIC_API_URL));

	return response.json();
}
