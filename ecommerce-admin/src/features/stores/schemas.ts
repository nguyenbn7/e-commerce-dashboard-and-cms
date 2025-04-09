import { z } from 'zod';

export const setupSchema = z.object({
	name: z.string().trim().min(1)
});

export const storeIdSchema = z.object({
	storeId: z.coerce.number()
});

export const settingsFormSchema = z.object({
	name: z.string().min(1, 'Required')
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
