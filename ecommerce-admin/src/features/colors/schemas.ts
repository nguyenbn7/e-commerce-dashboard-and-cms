import { z } from 'zod';

export const colorFormSchema = z.object({
	name: z.string().min(1, 'Required'),
	value: z.string().min(4).regex(/^#/, {
		message: "String must be a valid hex code"
	})
});

export const colorIdSchema = z.object({
	id: z.coerce.number()
});

export const storeIdAndColorIdSchema = z.object({
	storeId: z.coerce.number(),
	colorId: z.coerce.number()
});
