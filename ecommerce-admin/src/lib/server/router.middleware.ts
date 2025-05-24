import type { ClerkClient } from '@clerk/backend';
import type { Input, MiddlewareHandler } from 'hono';

import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { findStoreByUserIdAndStoreId } from '$features/stores/server/repository';

import { getAuth, clerkMiddleware as _clerkMiddleware } from '@hono/clerk-auth';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

type ClerkAuth = ReturnType<Awaited<ReturnType<ClerkClient['authenticateRequest']>>['toAuth']>;

export interface AuthenticatedClerkEnv {
	Variables: {
		clerk: ClerkClient;
		clerkAuth: ClerkAuth;
		userId: string;
	};
}

export const clerkMiddleware = () =>
	_clerkMiddleware({
		secretKey: CLERK_SECRET_KEY,
		publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY
	});

export const clerkMiddlewareAuthenticated =
	(): MiddlewareHandler<AuthenticatedClerkEnv> => async (c, next) => {
		const auth = getAuth(c);

		if (!auth?.userId) {
			return c.json(
				{
					title: ReasonPhrases.UNAUTHORIZED,
					status: StatusCodes.UNAUTHORIZED,
					detail: 'Login required'
				},
				StatusCodes.UNAUTHORIZED
			);
		}

		c.set('userId', auth.userId);

		await next();
	};

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

export const storeCreatedByUserValidator =
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
