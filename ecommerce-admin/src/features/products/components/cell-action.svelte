<script lang="ts">
	import type { ProductColumn } from '$features/products/columns';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { CellAction } from '$lib/components/data-table';
	import { deleteProductMutation } from '$features/products/api';

	interface Props {
		data: ProductColumn;
	}

	let { data }: Props = $props();

	const deleteClient = deleteProductMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/products/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id.toString());
		toast.success('Product Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteClient.mutate({
			param: {
				storeId: page.params.storeId,
				productId: data.id.toString()
			}
		});
	}}
/>
