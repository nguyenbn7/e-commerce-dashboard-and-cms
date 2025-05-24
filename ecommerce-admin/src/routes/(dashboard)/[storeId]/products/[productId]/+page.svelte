<script lang="ts">
	import type { PageData } from './$types';

	import { deleteProduct as deleteProductApi } from '$features/products/api/delete-product';
	import { updateProduct as updateProductApi } from '$features/products/api/update-product';
	import { ProductForm } from '$features/products/components';

	import { Metadata } from '$lib/components/metadata';
	import { Heading } from '$lib/components';
	import { DeleteButton } from '$lib/components/button';

	import { Separator } from '$lib/components/ui/separator';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteProductClient = deleteProductApi({
		onSuccess: () => {
			window.location.reload();
		}
	});

	let initData = $state(data.product);

	const updateProductClient = updateProductApi({
		onSuccess: (data) => {
			const { product } = data;
			initData = {
				...product,
				size: {
					...product.size,
					createdAt: new Date(product.size.createdAt),
					updatedAt: new Date(product.size.updatedAt)
				},
				category: {
					...product.category,
					createdAt: new Date(product.category.createdAt),
					updatedAt: new Date(product.category.updatedAt)
				},
				color: {
					...product.color,
					createdAt: new Date(product.color.createdAt),
					updatedAt: new Date(product.color.updatedAt)
				},
				images: product.images.map((img) => ({
					...img,
					createdAt: new Date(img.createdAt),
					updatedAt: new Date(img.updatedAt)
				})),
				createdAt: new Date(product.createdAt),
				updatedAt: new Date(product.updatedAt)
			};
		}
	});
</script>

<Metadata title="Edit product" />

<div class="flex items-center justify-between">
	<Heading title="Edit product" description="Edit a product" />

	<DeleteButton
		onDelete={() => {
			$deleteProductClient.mutate({
				param: {
					id: data.product.id,
					storeId: data.store.id
				}
			});
		}}
	/>
</div>

<Separator />

<ProductForm
	{initData}
	categories={data.categories}
	sizes={data.sizes}
	colors={data.colors}
	disabled={$deleteProductClient.isPending || $updateProductClient.isPending}
	onSubmit={(values) => {
		$updateProductClient.mutate({
			param: {
				storeId: data.store.id,
				id: data.product.id
			},
			json: values
		});
	}}
/>

<Separator />
