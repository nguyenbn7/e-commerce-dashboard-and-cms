<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { ProductForm } from '$features/products/components';
	import { createProductMutation } from '$features/products/api';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const createMutation = createProductMutation();
</script>

<Metadata title="Create product" />

<Heading title="Create product" description="Add a new product" />

<Separator />

<ProductForm
	createForm
	categories={data.categories}
	sizes={data.sizes}
	colors={data.colors}
	disabled={$createMutation.isPending}
	onSubmit={(values) => {
		$createMutation.mutate({
			param: {
				storeId: data.store.id.toString()
			},
			json: values
		});
	}}
/>

<Separator />
