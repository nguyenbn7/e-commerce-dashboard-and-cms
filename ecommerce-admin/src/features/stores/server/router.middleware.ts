import type { Input } from 'hono';
import type { MiddlewareHandler } from 'hono';
import type { AuthenticatedClerkEnv } from '$lib/server/router.middleware';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { RequestIdVariables } from 'hono/request-id';

interface StoreIdParam extends Input {
	in: {
		param: {
			id: string;
		};
	};
	out: {
		param: {
			id: string;
		};
	};
}

interface StoreCreatedByUserEnv {
	Variables: AuthenticatedClerkEnv['Variables'] & RequestIdVariables;
}

export const storeCreatedByUserValidator =
	(): MiddlewareHandler<StoreCreatedByUserEnv, string, StoreIdParam> => async (c, next) => {
		const { id } = c.req.valid('param');
		const { userId, requestId } = c.var;

		const store = await findStoreByUserIdAndStoreId({ id, userId });

		if (!store)
			return c.json(
				{
					id: requestId,
					title: ReasonPhrases.FORBIDDEN,
					status: StatusCodes.FORBIDDEN,
					detail: 'You do not own this store'
				},
				StatusCodes.FORBIDDEN
			);

		await next();
	};
