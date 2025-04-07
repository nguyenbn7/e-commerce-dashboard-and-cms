<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { sizeFormSchema, type SizeFormValues } from '../schemas';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { ImageUpload } from '$lib/components/image';

	type FormValues = SuperValidated<SizeFormValues, any, SizeFormValues>;

	interface Props {
		form: FormValues;
		action?: string | undefined | null;
		disabled?: boolean;
		submitBtnText?: string;
		onUpdated?: (event: { form: Readonly<FormValues> }) => MaybePromise<unknown | void>;
		onUpdate?: (event: {
			form: FormValues;
			formElement: HTMLFormElement;
			cancel: () => void;
			result: Required<
				Extract<
					ActionResult,
					{
						type: 'success' | 'failure';
					}
				>
			>;
		}) => MaybePromise<unknown | void>;
		onError?:
			| 'apply'
			| ((event: {
					result: {
						type: 'error';
						status?: number;
						error:
							| App.Error
							| Error
							| {
									message: string;
							  };
					};
			  }) => MaybePromise<unknown | void>);
	}

	let {
		form: sForm,
		action,
		onUpdated,
		onError,
		onUpdate,
		disabled: externalDisabled = false,
		submitBtnText = 'Save Changes'
	}: Props = $props();

	const form = superForm(sForm, {
		validators: zodClient(sizeFormSchema),
		onUpdated,
		onUpdate,
		onError
	});

	const { form: formData, enhance, delayed } = form;

	let disabled = $derived($delayed || externalDisabled);
</script>

<form method="post" {action} class="space-y-8 w-full" use:enhance>
	<div class="grid grid-cols-3 gap-8">
		<FormField {form} name="name">
			<FormControl>
				{#snippet children({ props })}
					<FormLabel>Name</FormLabel>

					<Input
						{...props}
						{disabled}
						placeholder="Size name"
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
						placeholder="Size value"
						class="mt-2"
						bind:value={$formData.value}
					/>
				{/snippet}
			</FormControl>

			<FormFieldErrors />
		</FormField>
	</div>

	<FormButton {disabled} class="ml-auto">
		{submitBtnText}
	</FormButton>
</form>
