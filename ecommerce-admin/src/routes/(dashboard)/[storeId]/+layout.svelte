<script lang="ts">
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	import { getStores as getStoresApi } from '$features/stores/api/get-stores';
	import { StoreModal } from '$features/stores/components';

	import { Navbar } from '$lib/components';

	import { goto } from '$app/navigation';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: LayoutProps = $props();

	let open = $state(false);

	// TODO: get data from server
	const getStoresClient = getStoresApi();
</script>

<StoreModal
	bind:open
	onSuccess={async (storeId) => {
		await goto(`/${storeId}`, { invalidateAll: true });
		$getStoresClient.refetch();
	}}
/>

<Navbar
	handleClickCreateButton={() => (open = true)}
	stores={$getStoresClient.data?.stores ?? []}
/>

<div class="flex-col">
	<div class="flex-1 space-y-4 p-8 pt-6">
		{@render children()}
	</div>
</div>
