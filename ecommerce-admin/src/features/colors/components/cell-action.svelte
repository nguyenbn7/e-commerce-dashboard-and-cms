<script lang="ts">
	import type { ColorColumn } from '$features/colors/columns';

	import { deleteColor as deleteColorApi } from '$features/colors/api/delete-color';

	import { CellAction } from '$lib/components/data-table';

	import { toast } from 'svelte-sonner';

	import { page } from '$app/state';

	interface Props {
		data: ColorColumn;
	}

	let { data }: Props = $props();

	const deleteColorClient = deleteColorApi({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<CellAction
	updateHref={`/${page.params.storeId}/colors/${data.id}`}
	onCopy={async () => {
		await navigator.clipboard.writeText(data.id);
		toast.success('Color Id copied to the clipboard');
	}}
	onDelete={() => {
		$deleteColorClient.mutate({
			param: {
				id: data.id,
				storeId: page.params.storeId
			}
		});
	}}
/>
