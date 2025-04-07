<script lang="ts">
	import type { CategoryColumn } from '$features/categories/columns';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { deleteCategoryMutation } from '$features/categories/api';
	import { CellAction } from '$lib/components/data-table';

	interface Props {
		data: CategoryColumn;
	}

	let { data }: Props = $props();

	const deleteClient = deleteCategoryMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/categories/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id.toString());
		toast.success('Category Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteClient.mutate({
			param: {
				storeId: page.params.storeId,
				categoryId: data.id.toString()
			}
		});
	}}
/>
