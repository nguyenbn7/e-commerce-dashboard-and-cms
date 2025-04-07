<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { confirmFromDialog } from '$lib/components/confirm-dialog';
	import { CategoryForm } from '$features/categories/components';
	import { useDeleteCategory } from '$features/categories/api/use-delete-category';
	import {
		useGetBillboards,
		type UseGetBillboards
	} from '$features/billboards/api/use-get-billboards';
	import Trash from '@lucide/svelte/icons/trash';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	let getBillboards: undefined | UseGetBillboards = $state();

	onMount(() => {
		getBillboards = useGetBillboards({ storeId: data.store.id });
	});

	const deleteCategory = useDeleteCategory({
		onSuccess: () => {
			toast.success('Category deleted');
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
			$deleteCategory.mutate({
				param: {
					storeId: data.store.id.toString(),
					categoryId: data.category.id.toString()
				}
			});
		}
	}
</script>

<Metadata title="Edit Category" />

<div class="flex items-center justify-between">
	<Heading title="Edit Category" description="Edit a category" />

	<Button variant="destructive" size="sm" onclick={onDelete}>
		<Trash size={16} />
	</Button>
</div>

<Separator />

<CategoryForm
	form={data.form}
	disabled={$getBillboards?.isPending}
	billboards={$getBillboards?.data?.data.billboards}
	onUpdated={({ form }) => {
		if (form.valid) {
			toast.success('Category updated');
			window.location.reload();
		}
	}}
	onError={() => {
		toast.error('Something went wrong');
	}}
/>

<Separator />
