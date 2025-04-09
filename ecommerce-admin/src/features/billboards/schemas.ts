import { z } from 'zod';

export const billboardFormSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1, 'Required')
});

export const billboardIdSchema = z.object({
	billboardId: z.coerce.number()
});
