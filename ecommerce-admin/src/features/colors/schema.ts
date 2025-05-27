import { z } from 'zod';

export const colorFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Name contains spaces or empty')
		.max(255, 'Name does not excceed 255 characters'),
	value: z.string().trim().min(4).regex(/^#/, {
		message: 'String must be a valid hex code (#xxx, #xxxxxx)'
	})
});

export const colorIdSchema = z.object({
	id: z.string()
});

export const storeIdSchema = z.object({
	storeId: z.string()
});
