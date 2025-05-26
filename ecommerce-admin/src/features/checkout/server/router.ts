import type Stripe from 'stripe';
import { zValidator } from '@hono/zod-validator';
import { checkoutSchema } from '$features/checkout/schema';
import { validateStore } from '$features/checkout/server/middleware';
import { getProducts } from '$features/checkout/server/internal/repository';
import { createOrder } from '$features/checkout/server/repository';
import { stripe } from '$lib/server/stripe';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { FRONTEND_STORE_URL } from '$env/static/private';
import { preventActionsWhenStoreClosed } from '$lib/server/router.middleware';

const app = new Hono()
	.use(
		cors({
			origin: '*',
			allowHeaders: ['Content-Type', 'Authorization'],
			allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
		})
	)
	.use(preventActionsWhenStoreClosed())
	.options('/', async (c) => {
		return c.json({});
	})
	.post('/', validateStore(), zValidator('json', checkoutSchema), async (c) => {
		const { storeId } = c.req.valid('param');
		const { productIds } = c.req.valid('json');

		const products = await getProducts(productIds.map((v) => v, productIds));

		const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

		products.forEach((product) => {
			line_items.push({
				quantity: 1,
				price_data: {
					currency: 'USD',
					product_data: {
						name: product.name
					},
					unit_amount: product.price
				}
			});
		});

		const order = await createOrder({ storeId }, { productIds });

		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: 'payment',
			billing_address_collection: 'required',
			phone_number_collection: {
				enabled: true
			},
			success_url: `${FRONTEND_STORE_URL}/cart?success=1`,
			cancel_url: `${FRONTEND_STORE_URL}/cart?canceled=1`,
			metadata: {
				orderId: order.id
			}
		});

		return c.json({
			url: session.url
		});
	});

export default app;
