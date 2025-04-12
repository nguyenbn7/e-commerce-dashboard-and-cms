<script lang="ts">
	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';
	import { Billboard as BillboardComponent, ProductList } from '$lib/components';
	import { getBillboardQuery } from '$features/billboards/api';
	import { createGetProductsQuery } from '$features/products/api/query';

	interface PageProps {}

	let {}: PageProps = $props();

	const getBillboard = getBillboardQuery(6);
	const getProducts = createGetProductsQuery({ isFeatured: true });
</script>

<Metadata title="Store" description="Store" />

<Container>
	<div class="space-y-10 pb-10">
		{#if $getBillboard.data?.billboard}
			<BillboardComponent data={$getBillboard.data?.billboard} />
		{/if}

		<div class="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
			<ProductList title="Featured Products" items={$getProducts.data?.products ?? []} />
		</div>
	</div>
</Container>
