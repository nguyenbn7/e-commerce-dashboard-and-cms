import { z } from 'zod';

export const categoryFormSchema = z.object({
	name: z.string().min(1),
	billboardId: z.coerce.number().min(1, 'Required')
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const categoryIdSchema = z.object({
	id: z.coerce.number()
});

export const storeIdAndCategoryIdSchema = z.object({
	storeId: z.coerce.number(),
	categoryId: z.coerce.number()
});
