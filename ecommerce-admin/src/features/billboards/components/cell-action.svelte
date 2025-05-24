<script lang="ts">
	import type { BillboardColumn } from '$features/billboards/columns';

	import { deleteBillboard as deleteBillboardApi } from '$features/billboards/api/delete-billboard';

	import { CellAction } from '$lib/components/data-table';

	import { toast } from 'svelte-sonner';

	import { page } from '$app/state';

	interface Props {
		data: BillboardColumn;
	}

	let { data }: Props = $props();

	const deleteBillboardClient = deleteBillboardApi({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/billboards/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id);
		toast.success('Billboard Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteBillboardClient.mutate({
			param: {
				id: data.id,
				storeId: page.params.storeId
			}
		});
	}}
/>
