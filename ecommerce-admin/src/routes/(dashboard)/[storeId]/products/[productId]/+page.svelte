<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { DeleteButton } from '$lib/components/button';
	import { ProductForm } from '$features/products/components';
	import { deleteProductMutation, updateProductMutation } from '$features/products/api';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteMutation = deleteProductMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});

	const updateMutation = updateProductMutation();
</script>

<Metadata title="Edit product" />

<div class="flex items-center justify-between">
	<Heading title="Edit product" description="Edit a product" />

	<DeleteButton
		onDelete={() => {
			$deleteMutation.mutate({
				param: {
					storeId: data.store.id.toString(),
					productId: data.product.id.toString()
				}
			});
		}}
	/>
</div>

<Separator />

<ProductForm
	initData={data.product}
	categories={data.categories}
	sizes={data.sizes}
	colors={data.colors}
	disabled={$deleteMutation.isPending || $updateMutation.isPending}
	onSubmit={(values) => {
		$updateMutation.mutate({
			param: {
				storeId: data.store.id.toString(),
				productId: data.product.id.toString()
			},
			json: values
		});
	}}
/>

<Separator />
