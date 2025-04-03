<script lang="ts">
	import type { LayoutData } from './$types';
	import { onMount, type Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { Navbar } from '$lib/components';
	import { StoreModal } from '$features/stores/components';
	import { useGetStores } from '$features/stores/api/use-get-stores';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();

	let open = $state(false);

	let getStoresQuery: undefined | ReturnType<typeof useGetStores> = $state();

	onMount(() => {
		getStoresQuery = useGetStores();
	});

	let stores = $derived($getStoresQuery?.data?.data.stores ?? []);
</script>

<StoreModal
	bind:open
	onSuccess={async (data) => {
		toast.success('Store created');
		const { data: responseData } = data;
		const { id } = responseData.store;
		await goto(`${id}`, { invalidateAll: true });
		open = false;
		$getStoresQuery?.refetch();
	}}
/>

<Navbar handleClickCreateButton={() => (open = true)} {stores} />

{@render children()}
