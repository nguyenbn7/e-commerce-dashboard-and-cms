import { z } from 'zod';

export const setupSchema = z.object({
	name: z.string().trim().min(1)
});
