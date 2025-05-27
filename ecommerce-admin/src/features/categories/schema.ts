import { z } from 'zod';

export const categoryFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Name contains spaces or empty')
		.max(255, 'Name does not excceed 255 characters'),
	billboardId: z.string().trim().min(1, 'Required')
});

export const categoryIdSchema = z.object({
	id: z.string()
});

export const storeIdSchema = z.object({
	storeId: z.string()
});
