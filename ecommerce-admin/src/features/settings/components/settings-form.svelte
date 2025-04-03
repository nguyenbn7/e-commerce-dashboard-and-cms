<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { settingsFormSchema, type SettingsFormValues } from '../schemas';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		form: SuperValidated<SettingsFormValues>;
	}

	let { form: validatedForm }: Props = $props();

	const form = superForm(validatedForm, {
		validators: zodClient(settingsFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="post" class="space-y-8 w-full" use:enhance>
	<div class="grid grid-cols-3 gap-8">
		<FormField {form} name="name">
			<FormControl>
				{#snippet children({ props })}
					<FormLabel>Name</FormLabel>

					<Input
						{...props}
						disabled={false}
						placeholder="Store name"
						class="mt-2"
						bind:value={$formData.name}
					/>
				{/snippet}
			</FormControl>

			<FormFieldErrors />
		</FormField>
	</div>

	<FormButton disabled={false} class="ml-auto">Save Changes</FormButton>
</form>
