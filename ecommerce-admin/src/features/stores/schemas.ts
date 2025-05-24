import { z } from 'zod';

export const setupSchema = z.object({
	name: z.string().trim().min(1, 'Required')
});

export const storeIdSchema = z.object({
	storeId: z.string().trim().min(1, 'Required')
});

export const settingsFormSchema = z.object({
	name: z.string().trim().min(1, 'Required')
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
