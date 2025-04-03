import { z } from 'zod';

export const setupSchema = z.object({
	name: z.string().trim().min(1)
});

export const storeIdSchema = z.object({
	id: z.coerce.number()
});
