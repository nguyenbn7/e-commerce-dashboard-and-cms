import { z } from 'zod';

export const categoryFormSchema = z.object({
	name: z.string().trim().min(1, 'name contains spaces or empty'),
	billboardId: z.string().trim().min(1, 'billboard id contains spaces or empty')
});

export const categoryIdSchema = z.object({
	id: z.string()
});
