<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { billboardFormSchema, type BillboardFormValues } from '../schemas';
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

	type FormValues = SuperValidated<BillboardFormValues, any, BillboardFormValues>;

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
		validators: zodClient(billboardFormSchema),
		onUpdated,
		onUpdate,
		onError
	});

	const { form: formData, enhance, delayed } = form;

	let disabled = $derived($delayed || externalDisabled);
</script>

<form method="post" {action} class="space-y-8 w-full" use:enhance>
	<FormField {form} name="imageUrl">
		<FormControl>
			{#snippet children({ props })}
				<FormLabel>Background Image</FormLabel>

				<ImageUpload value={$formData.imageUrl ? [$formData.imageUrl] : []} />
			{/snippet}
		</FormControl>

		<!-- <FormFieldErrors /> -->
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

	<FormButton {disabled} class="ml-auto">
		{submitBtnText}
	</FormButton>
</form>
