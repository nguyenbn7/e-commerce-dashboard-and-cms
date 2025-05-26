import type Stripe from 'stripe';

import { FRONTEND_STORE_URL } from '$env/static/private';

import { checkoutSchema } from '$features/checkout/schema';
import { createOrder } from '$features/checkout/server/repository';
import { getProducts } from '$features/checkout/server/internal/repository';

import { notAllowWhenStoreClosed, validateStoreInDatabase } from '$lib/server/router.middleware';
import { stripe } from '$lib/server/stripe';

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';

const app = new Hono()
	.use(
		cors({
			origin: '*',
			allowHeaders: ['Content-Type', 'Authorization'],
			allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
		})
	)
	.use(validateStoreInDatabase())
	.options('/', async (c) => {
		return c.json({});
	})
	.post('/', notAllowWhenStoreClosed(), zValidator('json', checkoutSchema), async (c) => {
		const { store } = c.var;
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

		const order = await createOrder({ storeId: store.id }, { productIds });

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
