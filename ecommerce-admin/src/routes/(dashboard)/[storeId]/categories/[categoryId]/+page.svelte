<script lang="ts">
	import type { PageData } from './$types';

	import { deleteCategory as deleteCategoryApi } from '$features/categories/api/delete-category';
	import { CategoryForm } from '$features/categories/components';

	import { getBillboards as getBillboardsApi } from '$features/billboards/api/get-billboards';

	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { DeleteButton } from '$lib/components/button';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const getBillboardsClient = getBillboardsApi({ storeId: data.store.id });

	const deleteCategoryClient = deleteCategoryApi({
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
			$deleteCategoryClient.mutate({
				param: {
					storeId: data.store.id,
					id: data.category.id
				}
			});
		}}
	/>
</div>

<Separator />

<CategoryForm
	form={data.form}
	disabled={$getBillboardsClient.isPending || $deleteCategoryClient.isPending}
	billboards={$getBillboardsClient.data?.billboards}
/>

<Separator />
