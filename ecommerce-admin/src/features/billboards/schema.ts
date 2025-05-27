import { z } from 'zod';

export const billboardFormSchema = z.object({
	label: z
		.string()
		.trim()
		.min(1, 'Label contains spaces or empty')
		.max(255, 'Label does not excceed 255 characters'),
	imageUrl: z.string().trim().min(1, 'Required'),
	isFeatured: z.boolean().default(false)
});

export const billboardIdSchema = z.object({
	id: z.string()
});

export const storeIdSchema = z.object({
	storeId: z.string()
});
