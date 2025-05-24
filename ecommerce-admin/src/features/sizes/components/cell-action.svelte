<script lang="ts">
	import type { SizeColumn } from '$features/sizes/columns';

	import { deleteSize as deleteSizeApi } from '$features/sizes/api/delete-size';

	import { CellAction } from '$lib/components/data-table';

	import { toast } from 'svelte-sonner';

	import { page } from '$app/state';

	interface Props {
		data: SizeColumn;
	}

	let { data }: Props = $props();

	const deleteSizeClient = deleteSizeApi({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/sizes/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id);
		toast.success('Size Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteSizeClient.mutate({
			param: {
				id: data.id,
				storeId: page.params.storeId
			}
		});
	}}
/>
