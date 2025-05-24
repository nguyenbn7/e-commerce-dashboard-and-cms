<script lang="ts">
	import type { PageData } from './$types';

	import { createProduct as createProductApi } from '$features/products/api/create-product';
	import { ProductForm } from '$features/products/components';

	import { Metadata } from '$lib/components/metadata';
	import { Heading } from '$lib/components';

	import { Separator } from '$lib/components/ui/separator';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const createProductClient = createProductApi();
</script>

<Metadata title="Create product" />

<Heading title="Create product" description="Add a new product" />

<Separator />

<ProductForm
	createForm
	categories={data.categories}
	sizes={data.sizes}
	colors={data.colors}
	disabled={$createProductClient.isPending}
	onSubmit={(values) => {
		$createProductClient.mutate({
			param: {
				storeId: data.store.id.toString()
			},
			json: values
		});
	}}
/>

<Separator />
