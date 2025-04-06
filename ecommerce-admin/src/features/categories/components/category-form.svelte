<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import type { Billboard } from '$features/billboards/api/use-get-billboards';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { categoryFormSchema, type CategoryFormValues } from '../schemas';
	import { Input } from '$lib/components/ui/input';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type FormValues = SuperValidated<CategoryFormValues, any, CategoryFormValues>;

	interface Props {
		form: FormValues;
		action?: string | undefined | null;
		disabled?: boolean;
		submitBtnText?: string;
		billboards?: Billboard[];
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
		billboards = [],
		disabled: externalDisabled = false,
		submitBtnText = 'Save Changes'
	}: Props = $props();

	const form = superForm(sForm, {
		validators: zodClient(categoryFormSchema),
		onUpdated,
		onUpdate,
		onError
	});

	const { form: formData, enhance, delayed } = form;

	let disabled = $derived($delayed || externalDisabled);

	let selectedBillboardLabel = $derived(
		billboards.find((b) => b.id === $formData.billboardId)?.label ?? ''
	);
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
						placeholder="Category name"
						class="mt-2"
						bind:value={$formData.name}
					/>
				{/snippet}
			</FormControl>

			<FormFieldErrors />
		</FormField>

		<FormField {form} name="billboardId">
			<FormControl>
				{#snippet children({ props })}
					<FormLabel>Billboard</FormLabel>

					<Select
						type="single"
						{disabled}
						name={props.name}
						bind:value={
							() => ($formData.billboardId <= 0 ? '' : $formData.billboardId.toString()),
							(newValue) => ($formData.billboardId = Number(newValue))
						}
					>
						<SelectTrigger {...props} class="mt-2">
							{selectedBillboardLabel}
						</SelectTrigger>

						<SelectContent>
							{#each billboards as billboard (billboard.id)}
								<SelectItem value={billboard.id.toString()}>
									{billboard.label}
								</SelectItem>
							{/each}
						</SelectContent>
					</Select>
				{/snippet}
			</FormControl>

			<FormFieldErrors />
		</FormField>
	</div>

	<FormButton {disabled} class="ml-auto">
		{submitBtnText}
	</FormButton>
</form>
