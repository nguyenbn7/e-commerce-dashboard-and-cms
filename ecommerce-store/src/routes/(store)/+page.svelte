<script lang="ts">
	import type { PageData } from './$types';

	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	import { getBillboard as getBillboardApi } from '$features/billboards/api/get-billboard';
	import { getProducts as getProductsApi } from '$features/products/api/client/get-products';

	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';
	import { Billboard as BillboardComponent, ProductList } from '$lib/components';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();

	const getBillboardClient = getBillboardApi({ id: '73783560-02ad-4cd3-917d-34097297e56e' });
	const getProductsClient = getProductsApi({ isFeatured: true });

	const isLoading = $derived($getBillboardClient.isLoading || $getProductsClient.isLoading);
</script>

<Metadata title={data.stores[0].name ?? 'Store'} description={data.stores[0].name ?? 'Store'} />

<Container>
	{#if isLoading}
		<div class="min-h-screen flex flex-col items-center justify-center">
			<LoaderCircle size={16} class="size-32 animate-spin" />
		</div>
	{:else}
		<div class="space-y-10 pb-10 min-h-screen">
			<BillboardComponent data={$getBillboardClient.data?.billboard} />

			<div class="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
				<ProductList title="Featured Products" items={$getProductsClient.data?.products ?? []} />
			</div>
		</div>
	{/if}
</Container>
