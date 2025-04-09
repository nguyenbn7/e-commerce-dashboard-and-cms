<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Form } from '$lib/components/form';
	import { ImageUpload } from '$lib/components/image';
	import { billboardFormSchema } from '$features/billboards/schemas';

	interface Props {
		form: SuperValidated<z.infer<typeof billboardFormSchema>, any>;
		action?: string | undefined | null;
		disabled?: boolean;
		createForm?: boolean;
		onSuccess?: () => void;
	}

	let { form: _form, disabled: _disabled = false, action, createForm, onSuccess }: Props = $props();

	const form = superForm(_form, {
		validators: zodClient(billboardFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				if (createForm) toast.success('Billboard created');
				else {
					formData.set(form.data);
					toast.success('Billboard updated');
				}
				return onSuccess?.();
			}

			if (form.message) {
				toast.error(form.message);
			}
		},
		onError() {
			// TODO:
			toast.error('Something went wrong');
		}
	});

	const { form: formData } = form;
</script>

<Form {form} {action} disabled={_disabled} {createForm}>
	{#snippet content({ disabled })}
		<FormField {form} name="imageUrl">
			<FormControl>
				{#snippet children({ props })}
					<FormLabel>Background Image</FormLabel>

					<ImageUpload
						class="mt-2"
						value={$formData.imageUrl ? [$formData.imageUrl] : []}
						onChange={(url) => ($formData.imageUrl = url)}
						onRemove={() => ($formData.imageUrl = '')}
						{disabled}
					/>

					<Input {...props} {disabled} value={$formData.imageUrl} hidden />
				{/snippet}
			</FormControl>

			<FormFieldErrors />
		</FormField>

		<div class="grid grid-cols-3 gap-8">
			<FormField {form} name="label">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Label</FormLabel>

						<Input
							{...props}
							{disabled}
							placeholder="Billboard label"
							class="mt-2"
							bind:value={$formData.label}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>
		</div>
	{/snippet}
</Form>
