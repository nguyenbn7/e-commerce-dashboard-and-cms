import { z } from 'zod';

export const checkoutSchema = z.object({
	productIds: z.string().array().min(1)
});

export const storeIdSchema = z.object({
	storeId: z.string()
});
