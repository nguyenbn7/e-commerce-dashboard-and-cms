<script lang="ts">
	import type { CategoryColumn } from '$features/categories/columns';

	import { deleteCategory as deleteCategoryApi } from '$features/categories/api/delete-category';

	import { CellAction } from '$lib/components/data-table';

	import { toast } from 'svelte-sonner';

	import { page } from '$app/state';

	interface Props {
		data: CategoryColumn;
	}

	let { data }: Props = $props();

	const deleteCategoryClient = deleteCategoryApi({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/categories/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id);
		toast.success('Category Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteCategoryClient.mutate({
			param: {
				id: data.id,
				storeId: page.params.storeId
			}
		});
	}}
/>
