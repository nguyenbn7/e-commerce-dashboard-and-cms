<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { confirmFromDialog } from '$lib/components/confirm-dialog';
	import { SizeForm } from '$features/sizes/components';
	import { useDeleteSize } from '$features/sizes/api/use-delete-size';
	import Trash from '@lucide/svelte/icons/trash';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteSize = useDeleteSize({
		onSuccess: () => {
			toast.success('Size deleted');
			window.location.reload();
		},
		onError() {
			toast.error('Make sure you removed all products using this category first');
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
			$deleteSize.mutate({
				param: {
					storeId: data.store.id.toString(),
					sizeId: data.size.id.toString()
				}
			});
		}
	}
</script>

<Metadata title="Edit size" />

<div class="flex items-center justify-between">
	<Heading title="Edit size" description="Edit a billboard" />

	<Button variant="destructive" size="sm" onclick={onDelete}>
		<Trash size={16} />
	</Button>
</div>

<Separator />

<SizeForm
	form={data.form}
	onUpdated={({ form }) => {
		if (form.valid) {
			toast.success('Size updated');
			window.location.reload();
		}
	}}
	onError={() => {
		toast.error('Something went wrong');
	}}
/>

<Separator />
