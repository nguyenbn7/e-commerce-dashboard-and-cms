import { z } from 'zod';

export const productIdSchema = z.object({
	id: z.string().trim()
});
