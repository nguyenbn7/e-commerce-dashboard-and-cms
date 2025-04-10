<script lang="ts" generics="TForm extends Record<string, unknown>, TFormMessage = unknown">
	import type { Snippet } from 'svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import { cn } from '$lib/utils';
	import { FormButton } from '$lib/components/ui/form';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	interface Props {
		form: SuperForm<TForm, TFormMessage>;
		action?: string | undefined | null;
		disabled?: boolean;
		class?: string;
		createForm?: boolean;
		content: Snippet<[{ disabled: boolean }]>;
	}

	let {
		form,
		action,
		class: className,
		createForm = false,
		disabled: _disabled = false,
		content
	}: Props = $props();

	const { enhance, delayed } = form;

	let disabled = $derived($delayed || _disabled);
</script>

<form method="post" {action} class={cn('space-y-8 w-full', className)} use:enhance>
	{@render content({ disabled })}

	<FormButton {disabled} class="ml-auto">
		{#if !disabled}
			{createForm ? 'Create' : 'Save Changes'}
		{:else}
			{createForm ? 'Creating...' : 'Saving Changes...'}
			<LoaderCircle class="animate-spin ml-2" />
		{/if}
	</FormButton>
</form>
