import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { clerkMiddlewareAuthenticated } from '$lib/server/hono.middleware';
import { zValidator } from '@hono/zod-validator';
import { setupSchema } from '../schemas';
import prisma from '$lib/server/prisma';

const app = new Hono()
	.use(
		clerkMiddleware({ secretKey: CLERK_SECRET_KEY, publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY })
	)
	.get('/', clerkMiddlewareAuthenticated(), async (c) => {
		const userId = c.get('userId');

		const stores = await prisma.store.findMany({
			where: {
				userId
			}
		});

		return c.json({
			status: 'success',
			data: {
				stores
			}
		});
	})
	.post('/', clerkMiddlewareAuthenticated(), zValidator('json', setupSchema), async (c) => {
		const userId = c.get('userId');

		const { name } = c.req.valid('json');

		const store = await prisma.store.create({
			data: {
				name,
				userId
			}
		});

		return c.json({
			status: 'success',
			data: {
				store
			}
		});
	});

export default app;
