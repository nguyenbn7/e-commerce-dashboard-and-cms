import { STRIPE_API_KEY } from '$env/static/private';
import Stripe from 'stripe';

export const stripe = new Stripe(STRIPE_API_KEY, {
	apiVersion: '2025-04-30.basil',
	typescript: true
});

