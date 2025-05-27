import { z } from 'zod';

export const sizeFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Name contains spaces or empty')
		.max(255, 'Name does not excceed 255 characters'),
	value: z
		.string()
		.trim()
		.min(1, 'Value contains spaces or empty')
		.max(255, 'Value does not excceed 255 characters')
});

export const sizeIdSchema = z.object({
	id: z.string()
});

export const storeIdSchema = z.object({
	storeId: z.string()
});
