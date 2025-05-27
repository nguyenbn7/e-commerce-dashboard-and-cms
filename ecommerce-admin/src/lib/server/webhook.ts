import type Stripe from 'stripe';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { Hono } from 'hono';
import { stripe } from './stripe';
import { StatusCodes } from 'http-status-codes';
import prisma from './prisma';

const app = new Hono().post('/', async (c) => {
	const body = await c.req.text();
	const signature = c.req.header('Stripe-Signature') as string;

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (error: any) {
		return c.text(`Webhook Error: ${error.message}`, StatusCodes.BAD_REQUEST);
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const address = session.customer_details?.address;

	const addressComponents = [
		address?.line1,
		address?.line2,
		address?.city,
		address?.state,
		address?.postal_code,
		address?.country
	];

	const addressString = addressComponents.filter((c) => c !== null && c !== undefined).join(', ');

	if (event.type === 'checkout.session.completed') {
		const order = await prisma.order.update({
			where: {
				id: session?.metadata?.orderId
			},
			data: {
				isPaid: true,
				buyer: session.customer_details?.name || '',
				email: session.customer_details?.email || '',
				address: addressString,
				phone: session?.customer_details?.phone || ''
			},
			include: {
				orderItems: true
			}
		});

		const productIds = order.orderItems.map((orderItem) => orderItem.productId);

		await prisma.product.updateMany({
			where: {
				id: {
					in: [...productIds]
				}
			},
			data: {
				isArchived: true
			}
		});
	}

	return c.body(null);
});

export default app;
