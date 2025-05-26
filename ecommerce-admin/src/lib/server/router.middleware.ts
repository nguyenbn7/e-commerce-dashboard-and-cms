import type { RequestIdVariables } from 'hono/request-id';
import type { ClerkClient } from '@clerk/backend';
import type { MiddlewareHandler } from 'hono';

import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

import { getStoreContext } from '$features/stores/server/repository';

import { getAuth, clerkMiddleware as _clerkMiddleware } from '@hono/clerk-auth';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

type ClerkAuth = ReturnType<Awaited<ReturnType<ClerkClient['authenticateRequest']>>['toAuth']>;

export interface AuthenticatedClerkEnv {
	Variables: {
		clerk: ClerkClient;
		clerkAuth: ClerkAuth;
		userId: string;
	} & RequestIdVariables;
}

export const clerkMiddleware = () =>
	_clerkMiddleware({
		secretKey: CLERK_SECRET_KEY,
		publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY
	});

export const clerkMiddlewareAuthenticated =
	(): MiddlewareHandler<AuthenticatedClerkEnv> => async (c, next) => {
		const { requestId } = c.var;
		const auth = getAuth(c);

		if (!auth?.userId) {
			return c.json(
				{
					id: requestId,
					status: StatusCodes.UNAUTHORIZED,
					title: ReasonPhrases.UNAUTHORIZED,
					detail: 'Login required'
				},
				StatusCodes.UNAUTHORIZED
			);
		}

		c.set('userId', auth.userId);

		await next();
	};

export const authorizeStoreByUser =
	(): MiddlewareHandler<
		{ Variables: AuthenticatedClerkEnv['Variables'] & StoreContextEnv['Variables'] },
		string
	> =>
	async (c, next) => {
		const { userId, store } = c.var;

		if (store.userId !== userId)
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

interface StoreContextEnv {
	Variables: RequestIdVariables & {
		store: NonNullable<Awaited<ReturnType<typeof getStoreContext>>>;
	};
}

export const validateStoreInDatabase =
	(storeIdPathname: string = 'storeId'): MiddlewareHandler<StoreContextEnv, string> =>
	async (c, next) => {
		const { requestId } = c.var;
		const storeId = c.req.param(storeIdPathname);

		if (!storeId)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.BAD_REQUEST,
					title: ReasonPhrases.BAD_REQUEST,
					detail: 'Missing "storeId" param'
				},
				StatusCodes.BAD_REQUEST
			);

		const store = await getStoreContext({ id: storeId });

		if (!store)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: 'Store not found'
				},
				StatusCodes.NOT_FOUND
			);

		c.set('store', store);

		await next();
	};

export const notAllowWhenStoreClosed =
	(): MiddlewareHandler<StoreContextEnv, string> => async (c, next) => {
		const { store, requestId } = c.var;

		if (!store) throw new Error('Missing c.get("store") or validateStoreInDatabase() middleware');

		if (!store.isOpen)
			return c.json(
				{
					id: requestId,
					status: StatusCodes.CONFLICT,
					title: ReasonPhrases.CONFLICT,
					detail: 'Store is closed'
				},
				StatusCodes.CONFLICT
			);

		await next();
	};
