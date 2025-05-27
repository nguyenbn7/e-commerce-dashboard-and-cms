import { z } from 'zod';

export const productFormSchema = z.object({
	name: z.string().min(1, 'Required').max(255, 'Name does not excceed 255 characters'),
	images: z.object({ url: z.string() }).array().min(1, 'Required'),
	price: z.coerce.number().min(1, 'Must greater than 0'),
	categoryId: z.string().min(1, 'Required'),
	colorId: z.string().min(1, 'Required'),
	sizeId: z.string().min(1, 'Required'),
	isFeatured: z.boolean().default(false),
	isArchived: z.boolean().default(false)
});

export const productIdSchema = z.object({
	id: z.string()
});

export const storeIdSchema = z.object({
	storeId: z.string()
});

export const productsSearchParamsSchema = z.object({
	categoryId: z.string().optional(),
	colorId: z.string().optional(),
	sizeId: z.string().optional(),
	isFeatured: z
		.string()
		.toLowerCase()
		.transform((v) => JSON.parse(v))
		.pipe(z.boolean())
		.optional()
});
