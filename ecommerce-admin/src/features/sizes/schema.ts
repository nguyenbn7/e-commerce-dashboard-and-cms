import { z } from 'zod';

export const sizeFormSchema = z.object({
	name: z.string().trim().min(1, 'name contains spaces or empty'),
	value: z.string().trim().min(1, 'value contains spaces or empty')
});

export const sizeIdSchema = z.object({
	id: z.string()
});
