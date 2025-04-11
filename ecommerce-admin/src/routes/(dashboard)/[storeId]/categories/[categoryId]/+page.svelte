<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { DeleteButton } from '$lib/components/button';
	import { getBillboardsQuery } from '$features/billboards/api';
	import { CategoryForm } from '$features/categories/components';
	import { deleteCategoryMutation } from '$features/categories/api';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const getBillboards = getBillboardsQuery({ storeId: data.store.id });

	const deleteMutation = deleteCategoryMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<Metadata title="Edit Category" />

<div class="flex items-center justify-between">
	<Heading title="Edit Category" description="Edit a category" />

	<DeleteButton
		onDelete={() => {
			$deleteMutation.mutate({
				param: {
					storeId: data.store.id.toString(),
					categoryId: data.category.id.toString()
				}
			});
		}}
	/>
</div>

<Separator />

<CategoryForm
	form={data.form}
	disabled={$getBillboards.isPending || $deleteMutation.isPending}
	billboards={$getBillboards.data?.billboards}
/>

<Separator />
