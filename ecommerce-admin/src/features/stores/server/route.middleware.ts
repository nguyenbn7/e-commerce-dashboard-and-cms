import type { ClerkClient } from '@clerk/backend';
import type { MiddlewareHandler } from 'hono';
import type { Input } from 'hono';

import { StatusCodes } from 'http-status-codes';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

type ClerkAuth = ReturnType<Awaited<ReturnType<ClerkClient['authenticateRequest']>>['toAuth']>;

interface AuthenticatedEnv {
	Variables: {
		clerk: ClerkClient;
		clerkAuth: ClerkAuth;
		userId: string;
	};
}

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

export const checkStoreBelongsToUser =
	(): MiddlewareHandler<AuthenticatedEnv, string, StoreIdParam> => async (c, next) => {
		const { userId } = c.var;
		const { storeId } = c.req.valid('param');

		if (!userId) throw new Error('Missing clerk authentication');

		if (!storeId) throw new Error('Missing ":storeId" param');

		const store = await findStoreByUserIdAndStoreId(userId, storeId);

		if (!store)
			return c.json(
				{
					error: {
						code: StatusCodes.FORBIDDEN,
						message: 'You do not own this store'
					}
				},
				StatusCodes.FORBIDDEN
			);

		await next();
	};
