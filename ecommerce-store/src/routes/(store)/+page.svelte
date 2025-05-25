<script lang="ts">
	import type { PageData } from './$types';

	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	import {
		getBillboard as getBillboardApi,
		setBillboardParams
	} from '$features/billboards/api/get-billboard';
	import {
		getProducts as getProductsApi,
		setProductsParams
	} from '$features/products/api/client/get-products';
	import { getStores as getStoresApi } from '$features/stores/api/client/get-stores';
	import {
		getCurrentStoreFromStorage,
		useGetCurrentStore
	} from '$features/stores/hooks/use-get-current-store';

	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';
	import { Billboard as BillboardComponent, ProductList } from '$lib/components';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();

	let loading = $state(true);

	const getStoresClient = getStoresApi();
	const getBillboardClient = getBillboardApi();
	const getProductsClient = getProductsApi({ storeId: '', isFeatured: true });

	const { store } = useGetCurrentStore();

	const stores = $derived($getStoresClient.data?.stores ?? []);

	onMount(async () => {
		getCurrentStoreFromStorage(stores);

		if (!$store.id) return goto('/stores', { replaceState: true, invalidateAll: true });

		if ($store.billboards.length > 0) {
			setBillboardParams({ id: $store.billboards[0].id, storeId: $store.id });
		}

		setProductsParams({ storeId: $store.id, isFeatured: true });

		loading = false;
	});

	const isLoading = $derived(
		$getBillboardClient.isLoading || $getProductsClient.isLoading || loading
	);
</script>

<Metadata title={$store.name} description={$store.name} />

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
