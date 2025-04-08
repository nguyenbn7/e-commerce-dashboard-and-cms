<script lang="ts">
	import type { ColorColumn } from '$features/colors/columns';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { CellAction } from '$lib/components/data-table';
	import { deleteColorMutation } from '$features/colors/api';

	interface Props {
		data: ColorColumn;
	}

	let { data }: Props = $props();

	const deleteClient = deleteColorMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/colors/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id.toString());
		toast.success('Color Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteClient.mutate({
			param: {
				storeId: page.params.storeId,
				colorId: data.id.toString()
			}
		});
	}}
/>
