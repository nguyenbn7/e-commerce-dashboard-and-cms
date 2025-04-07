<script lang="ts">
	import type { SizeColumn } from '$features/sizes/columns';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { CellAction } from '$lib/components/data-table';
	import { deleteSizeMutation } from '$features/sizes/api';

	interface Props {
		data: SizeColumn;
	}

	let { data }: Props = $props();

	const deleteClient = deleteSizeMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/sizes/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id.toString());
		toast.success('Size Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteClient.mutate({
			param: {
				storeId: page.params.storeId,
				sizeId: data.id.toString()
			}
		});
	}}
/>
