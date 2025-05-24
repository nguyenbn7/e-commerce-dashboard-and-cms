<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { z } from 'zod';

	import { colorFormSchema } from '$features/colors/schema';

	import { Form } from '$lib/components/form';

	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';

	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		form: SuperValidated<z.infer<typeof colorFormSchema>, any>;
		action?: string | undefined | null;
		disabled?: boolean;
		createForm?: boolean;
		onSuccess?: () => void;
	}

	let {
		form: _form,
		action,
		disabled: _disabled = false,
		createForm = false,
		onSuccess
	}: Props = $props();

	const form = superForm(_form, {
		validators: zodClient(colorFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				if (createForm) toast.success('Color created');
				else {
					formData.set(form.data);
					toast.success('Color updated');
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
		<div class="grid grid-cols-3 gap-8">
			<FormField {form} name="name">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Name</FormLabel>

						<Input
							{...props}
							{disabled}
							placeholder="Color name"
							class="mt-2"
							bind:value={$formData.name}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField {form} name="value">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Value</FormLabel>

						<Input
							{...props}
							{disabled}
							placeholder="Color value"
							class="mt-2"
							bind:value={$formData.value}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>
		</div>
	{/snippet}
</Form>
