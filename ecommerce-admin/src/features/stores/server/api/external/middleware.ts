import type { Input } from 'hono';
import type { MiddlewareHandler } from 'hono';
import type { AuthenticatedClerkEnv } from '$features/stores/server/api/internal/middleware';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

interface StoreIdParam extends Input {
	in: {
		param: {
			storeId: string;
		};
	};
	out: {
		param: {
			storeId: string;
		};
	};
}

export const validateUserHaveRightWithStore =
	(): MiddlewareHandler<AuthenticatedClerkEnv, string, StoreIdParam> => async (c, next) => {
		const { storeId } = c.req.valid('param');
		const { userId } = c.var;

		const store = await findStoreByUserIdAndStoreId({ id: storeId, userId });

		if (!store)
			return c.json(
				{
					title: ReasonPhrases.FORBIDDEN,
					status: StatusCodes.FORBIDDEN,
					detail: 'You do not own this store'
				},
				StatusCodes.FORBIDDEN
			);

		await next();
	};
