import { z } from 'zod';

export const sizeFormSchema = z.object({
	name: z.string().min(1, 'Required'),
	value: z.string().min(1, 'Required')
});

export type SizeFormValues = z.infer<typeof sizeFormSchema>;

export const sizeIdSchema = z.object({
	id: z.coerce.number()
});

export const storeIdAndSizeIdSchema = z.object({
	storeId: z.coerce.number(),
	sizeId: z.coerce.number()
});
