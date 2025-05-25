import { z } from 'zod';

export const setupSchema = z.object({
	name: z.string().trim().min(1, 'name contains spaces or empty')
});

export const storeIdSchema = z.object({
	id: z.string().trim()
});

export const settingsFormSchema = z.object({
	name: z.string().trim().min(1, 'name contains spaces or empty'),
	isOpen: z.boolean().default(false)
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
