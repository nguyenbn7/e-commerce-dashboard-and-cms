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
	import Loader from '@lucide/svelte/icons/loader';

	let isPending = $state(false);
</script>

<Modal
	bind:open
	title="Create store"
	description="Add a new store to manage products and categories"
>
	<div class="py-2 pb-4">
		TODO:
		<!-- <form method="post" action="/?">
			<FormField {form} name="name">
				<FormLabel>Name</FormLabel>
				<FormControl>
					{#snippet children({ props })}
						<Input placeholder="E-commerce" {...props} disabled={isPending} />
					{/snippet}
				</FormControl>
				<FormFieldErrors />
			</FormField>
			<div class="pt-6 space-x-2 flex items-center justify-end w-full">
				<Button type="button" variant="outline" onclick={() => (open = false)} disabled={isPending}>
					Cancel
				</Button>

				<Button type="submit" disabled={isPending}>
					Continue
					{#if isPending}
						<Loader size={16} class="animate-spin ml-1 text-primary-foreground" />
					{/if}
				</Button>
			</div>
		</form> -->
	</div>
</Modal>
