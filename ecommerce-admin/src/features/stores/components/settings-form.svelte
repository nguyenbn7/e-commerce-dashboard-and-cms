<script lang="ts">
	import type { z } from 'zod';
	import type { SuperValidated } from 'sveltekit-superforms';

	import { settingsFormSchema } from '$features/stores/schema';

	import { Form } from '$lib/components/form';

	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		FormControl,
		FormDescription,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';

	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		form: SuperValidated<z.infer<typeof settingsFormSchema>, any>;
		action?: string | undefined | null;
		disabled?: boolean;
		createForm?: boolean;
		onSuccess?: () => void;
	}

	const {
		form: _form,
		action,
		disabled: _disabled = false,
		createForm = false,
		onSuccess
	}: Props = $props();

	const form = superForm(_form, {
		validators: zodClient(settingsFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				if (!createForm) {
					toast.success('Store updated');
				}

				return onSuccess?.();
			}

			if (form.message) {
				toast.error(form.message);
			}
		},
		onError() {
			toast.error('Something went wrong');
		}
	});

	const { form: formData } = form;
</script>

<Form {form} {action} disabled={_disabled} {createForm}>
	{#snippet content({ disabled })}
		<div class="grid grid-cols-3 gap-8">
			<FormField {form} name="name">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Name</FormLabel>

						<Input
							{...props}
							{disabled}
							placeholder="Store name"
							class="mt-2"
							bind:value={$formData.name}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField
				{form}
				name="isOpen"
				class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
			>
				<FormControl>
					{#snippet children({ props })}
						<Checkbox {...props} bind:checked={$formData.isOpen} />
						<div class="space-y-1 leading-none">
							<FormLabel>Open</FormLabel>
							<FormDescription
								>Check this when you are ready to open your store (Display status on store list)</FormDescription
							>
						</div>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>
		</div>
	{/snippet}
</Form>
