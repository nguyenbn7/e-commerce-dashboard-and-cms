<script lang="ts">
	import type { ProductColumn } from '$features/products/columns';

	import { deleteProduct as deleteProductApi } from '$features/products/api/delete-product';

	import { CellAction } from '$lib/components/data-table';

	import { toast } from 'svelte-sonner';

	import { page } from '$app/state';

	interface Props {
		data: ProductColumn;
	}

	let { data }: Props = $props();

	const deleteProductClient = deleteProductApi({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/products/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id);
		toast.success('Product Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteProductClient.mutate({
			param: {
				id: data.id,
				storeId: page.params.storeId
			}
		});
	}}
/>
