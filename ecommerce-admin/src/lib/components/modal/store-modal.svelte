<script lang="ts" module>
	let open = $state(false);

	export const isOpen = () => open;
	export const openStoreModal = () => (open = true);
	export const closeStoreModal = () => (open = false);
</script>

<script lang="ts">
	import Modal from './modal.svelte';
	import { Input } from '../ui/input';
	import { Button } from '../ui/button';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '../ui/form';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { setupSchema } from './schemas';
	import Loader from '@lucide/svelte/icons/loader';

	let isPending = $state(false);

	const form = superForm(defaults(zod(setupSchema)), {
		SPA: true,
		validators: zod(setupSchema),
		onUpdate({ form }) {
			if (form.valid) {
				// TODO: Call an external API with form.data, await the result and update form
				console.log(form.data);
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
							disabled={isPending}
							bind:value={$formData.name}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<div class="pt-6 space-x-2 flex items-center justify-end w-full">
				<Button type="button" variant="outline" onclick={closeStoreModal} disabled={isPending}>
					Cancel
				</Button>

				<Button type="submit" disabled={isPending}>
					Continue
					{#if isPending}
						<Loader size={16} class="animate-spin ml-1 text-primary-foreground" />
					{/if}
				</Button>
			</div>
		</form>
	</div>
</Modal>
