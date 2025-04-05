<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { confirmFromDialog } from '$lib/components/confirm-dialog';
	import { BillboardForm } from '$features/billboards/components';
	import { useDeleteBillboard } from '$features/billboards/api/use-delete-billboard';
	import Trash from '@lucide/svelte/icons/trash';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteStore = useDeleteBillboard({
		onSuccess: () => {
			toast.success('Billboard deleted');
			window.location.reload();
		},
		onError() {
			toast.error('Something went wrong');
		}
	});

	async function onDelete(
		$event:
			| (MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
			| (MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement })
	) {
		$event.preventDefault();

		const ok = await confirmFromDialog({
			title: 'Are you sure?',
			description: 'This action cannot be undone.'
		});

		if (ok) {
			$deleteStore.mutate({
				param: {
					storeId: data.store.id.toString(),
					billboardId: data.billboard.id.toString()
				}
			});
		}
	}
</script>

<Metadata title="Edit billboard" />

<div class="flex items-center justify-between">
	<Heading title="Edit billboard" description="Edit a billboard" />

	<Button variant="destructive" size="sm" onclick={onDelete}>
		<Trash size={16} />
	</Button>
</div>

<Separator />

<BillboardForm
	form={data.form}
	onUpdated={({ form }) => {
		if (form.valid) {
			toast.success('Billboard updated');
			window.location.reload();
		}
	}}
	onError={() => {
		toast.error('Something went wrong');
	}}
/>

<Separator />
