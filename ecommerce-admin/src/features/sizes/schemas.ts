import { z } from 'zod';

export const sizeFormSchema = z.object({
	name: z.string().min(1, 'Required'),
	value: z.string().min(1, 'Required')
});

export const sizeIdSchema = z.object({
	sizeId: z.coerce.number()
});
