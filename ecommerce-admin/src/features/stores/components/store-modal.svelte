<script lang="ts">
	import Loader from '@lucide/svelte/icons/loader';

	import { setupSchema } from '$features/stores/schema';
	import { createStore as createStoreApi } from '$features/stores/api/create-store';

	import { Modal } from '$lib/components/modal';
	
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';

	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	interface Props {
		open?: boolean;
		onSuccess?: (storeId: string) => MaybePromise<unknown | void>;
	}

	let { open = $bindable(false), onSuccess }: Props = $props();

	const createStoreClient = createStoreApi({
		onSuccess: async (data) => {
			const { id } = data.store;
			await onSuccess?.(id);
			open = false;
		}
	});

	const form = superForm(defaults(zod(setupSchema)), {
		id: `stores_${Math.floor(Math.random() * Date.now()).toString(16)}`,
		SPA: true,
		validators: zod(setupSchema),
		onUpdate({ form }) {
			if (form.valid) {
				$createStoreClient.mutate(form.data);
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
							disabled={$createStoreClient.isPending}
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
					disabled={$createStoreClient.isPending}
				>
					Cancel
				</Button>

				<Button type="submit" disabled={$createStoreClient.isPending}>
					Continue
					{#if $createStoreClient.isPending}
						<Loader size={16} class="animate-spin ml-1 text-primary-foreground" />
					{/if}
				</Button>
			</div>
		</form>
	</div>
</Modal>
