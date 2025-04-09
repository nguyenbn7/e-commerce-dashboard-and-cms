import { z } from 'zod';

export const productFormSchema = z.object({
	name: z.string().min(1),
	image: z.object({ url: z.string() }).array(),
	price: z.coerce.number().min(1),
	categoryId: z.coerce.number(),
	colorId: z.coerce.number(),
	sizeId: z.coerce.number(),
	isFeatured: z.boolean().default(false).optional(),
	isArchived: z.boolean().default(false).optional()
});

export const productIdSchema = z.object({
	productId: z.coerce.number()
});
