<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Modal } from '$lib/components/modal';
	import { setupSchema } from '../schemas';
	import { useCreateStore, type UseCreateStoreOptions } from '../api/use-create-store';
	import Loader from '@lucide/svelte/icons/loader';

	interface Props {
		open?: boolean;
	}

	let { open = $bindable(false), onSuccess, onError }: Props & UseCreateStoreOptions = $props();

	const createStoreMutation = useCreateStore({ onSuccess, onError });

	const form = superForm(defaults(zod(setupSchema)), {
		SPA: true,
		validators: zod(setupSchema),
		onUpdate({ form }) {
			if (form.valid) {
				$createStoreMutation.mutate(form.data);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Modal
	bind:open
	title="Create store"
	description="Add a new store to manage products and categories"
>
	<div class="py-2 pb-4">
		<form method="post" use:enhance>
			<FormField {form} name="name">
				<FormControl>
					{#snippet children({ props })}
						<FormLabel>Name</FormLabel>
						<Input
							{...props}
							class="mt-5"
							placeholder="E-commerce"
							disabled={$createStoreMutation.isPending}
							bind:value={$formData.name}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<div class="pt-6 space-x-2 flex items-center justify-end w-full">
				<Button
					type="button"
					variant="outline"
					onclick={() => (open = false)}
					disabled={$createStoreMutation.isPending}
				>
					Cancel
				</Button>

				<Button type="submit" disabled={$createStoreMutation.isPending}>
					Continue
					{#if $createStoreMutation.isPending}
						<Loader size={16} class="animate-spin ml-1 text-primary-foreground" />
					{/if}
				</Button>
			</div>
		</form>
	</div>
</Modal>
