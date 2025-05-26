import type { Params as GetBillboardApiParams } from '$features/billboards/api/get-billboard';

import { getBillboard as getBillboardApi } from '$features/billboards/api/get-billboard';

type Params = Omit<GetBillboardApiParams, 'fetch'> & {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

export type GetBillboardResponseType = {
	billboard: Billboard;
};

export async function getBillboard(params: Params) {
	try {
		return getBillboardApi(params);
	} catch {
		return {
			billboard: undefined
		};
	}
}
