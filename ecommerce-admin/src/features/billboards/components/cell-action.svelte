<script lang="ts">
	import type { BillboardColumn } from '$features/billboards/columns';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { CellAction } from '$lib/components/data-table';
	import { deleteBillboardMutation } from '$features/billboards/api';

	interface Props {
		data: BillboardColumn;
	}

	let { data }: Props = $props();

	const deleteClient = deleteBillboardMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/billboards/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id.toString());
		toast.success('Billboard Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteClient.mutate({
			param: {
				storeId: page.params.storeId,
				billboardId: data.id.toString()
			}
		});
	}}
/>
