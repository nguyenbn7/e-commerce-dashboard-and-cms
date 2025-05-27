import { z } from 'zod';

export const setupSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'name contains spaces or empty')
		.max(255, 'Name does not excceed 255 characters')
});

export const storeIdSchema = z.object({
	id: z.string()
});

export const settingsFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'name contains spaces or empty')
		.max(255, 'Name does not excceed 255 characters'),
	isOpen: z.boolean().default(false)
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
