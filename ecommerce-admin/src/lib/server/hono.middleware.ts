import type { ClerkClient } from '@clerk/backend';
import type { MiddlewareHandler } from 'hono';
import { getAuth } from '@hono/clerk-auth';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

type ClerkAuth = ReturnType<Awaited<ReturnType<ClerkClient['authenticateRequest']>>['toAuth']>;

type ClerkEnv = {
	Variables: {
		clerk: ClerkClient;
		clerkAuth: ClerkAuth;
		userId: string;
	};
};

export const clerkMiddlewareAuthenticated = (): MiddlewareHandler<ClerkEnv> => async (c, next) => {
	const auth = getAuth(c);

	if (!auth?.userId) {
		return c.json(
			{
				status: 'error',
				error: {
					code: StatusCodes.UNAUTHORIZED,
					message: ReasonPhrases.UNAUTHORIZED
				}
			},
			StatusCodes.UNAUTHORIZED
		);
	}

	c.set('userId', auth.userId);

	await next();
};
