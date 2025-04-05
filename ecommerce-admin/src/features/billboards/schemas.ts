import { z } from 'zod';

export const billboardFormSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1, 'Required')
});

export type BillboardFormValues = z.infer<typeof billboardFormSchema>;

export const billboardIdSchema = z.object({
	id: z.coerce.number()
});

export const storeIdAndBillboardIdSchema = z.object({
	storeId: z.coerce.number(),
	billboardId: z.coerce.number()
});
