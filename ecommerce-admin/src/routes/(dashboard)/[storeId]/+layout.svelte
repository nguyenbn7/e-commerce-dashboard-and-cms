<script lang="ts">
	import type { LayoutData } from './$types';
	import { onMount, type Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import { Navbar } from '$lib/components';
	import { getStoresQuery } from '$features/stores/api';
	import { StoreModal } from '$features/stores/components';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();

	let open = $state(false);

	let getStores: undefined | ReturnType<typeof getStoresQuery> = $state();

	onMount(() => {
		getStores = getStoresQuery();
	});

	let stores = $derived($getStores?.data?.stores ?? []);
</script>

<StoreModal
	bind:open
	onSuccess={async (storeId) => {
		await goto(`/${storeId}`, { invalidateAll: true });
		$getStores?.refetch();
	}}
/>

<Navbar handleClickCreateButton={() => (open = true)} {stores} />

<div class="flex-col">
	<div class="flex-1 space-y-4 p-8 pt-6">
		{@render children()}
	</div>
</div>
