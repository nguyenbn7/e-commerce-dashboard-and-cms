<script lang="ts">
	import { UserButton } from 'svelte-clerk';
	import { onMount } from 'svelte';
	import MainNav from './main-nav.svelte';
	import StoreSwicher from './store-swicher.svelte';
	import { useGetStores } from '$features/stores/api/use-get-stores';

	let getStoresQuery: undefined | ReturnType<typeof useGetStores> = $state();

	onMount(() => {
		getStoresQuery = useGetStores();
	});

	let stores = $derived($getStoresQuery?.data?.data.stores ?? []);
</script>

<div class="border-b">
	<div class="flex h-16 items-center px-4">
		<StoreSwicher {stores} />

		<MainNav class="mx-6" />

		<div class="ml-auto flex items-center space-x-4">
			<UserButton afterSignOutUrl="/" />
		</div>
	</div>
</div>
