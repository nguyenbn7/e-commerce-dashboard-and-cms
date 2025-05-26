import { z } from 'zod';

export const billboardFormSchema = z.object({
	label: z.string().trim().min(1, 'label contains spaces or empty'),
	imageUrl: z.string().trim().min(1, 'imageUrl contains spaces or empty'),
	isFeatured: z.boolean().default(false)
});

export const billboardIdSchema = z.object({
	id: z.string()
});
