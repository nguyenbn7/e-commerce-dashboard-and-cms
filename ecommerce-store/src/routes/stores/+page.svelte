<script lang="ts">
	import type { PageData } from './$types';

	import StoreIcon from '@lucide/svelte/icons/store';

	import { getStores as getStoresApi } from '$features/stores/api/client/get-stores';

	import { Metadata } from '$lib/components/metadata';
	import { Separator } from 'bits-ui';
	import {
		getCurrentStoreFromStorage,
		useGetCurrentStore
	} from '$features/stores/hooks/use-get-current-store';
	import { goto } from '$app/navigation';
	import useCart from '$lib/hooks/cart';
	import { cn } from '$lib/utils';

	let { data }: { data: PageData } = $props();

	const getStoresClient = getStoresApi();
	const { store: currentStore, saveStoreIdToLocalStorage } = useGetCurrentStore();
	const { items: cartItems, removeAll } = useCart();

	const stores = $derived($getStoresClient.data?.stores ?? []);

	async function onSetCurrentStore(storeId: string) {
		if ($cartItems.length > 0) {
			const ok = confirm(
				'Your cart is not empty. Are you sure that you want to switch to new store?'
			);

			if (!ok) return;

			removeAll();
		}

		saveStoreIdToLocalStorage(storeId);
		return goto('/', { invalidateAll: true, replaceState: true });
	}

	$effect(() => {
		getCurrentStoreFromStorage(stores);
	});
</script>

<Metadata title="Select Stores" />

<div class="w-full max-w-2xl mx-auto overflow-hidden">
	<div
		class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:pt-6 lg:p-8 flex-col border rounded-2xl h-96 my-5"
	>
		<h1 class="flex w-full items-center justify-start text-lg font-semibold tracking-tight">
			<StoreIcon size={24} class="mr-2" />
			Stores
		</h1>

		<Separator.Root class="bg-gray-300 -mx-5 mb-6 mt-5 block h-px w-full" />

		<ul class="flex flex-col items-start gap-1 pb-11 pt-7 max-h-96 overflow-y-auto w-full">
			{#each stores as store}
				{@const isActive = $currentStore.id === store.id}
				<button
					class={cn(
						'px-3 py-5 border border-black/35 w-full rounded-2xl hover:cursor-pointer hover:bg-sky-300/40 disabled:hover:bg-transparent disabled:hover:cursor-default flex items-center justify-between',
						isActive && 'bg-sky-300/40 disabled:hover:bg-sky-300/40'
					)}
					onclick={() => onSetCurrentStore(store.id)}
					disabled={isActive || !store.isOpen}
				>
					{store.name}
					<div class="flex items-center gap-x-3">
						<span class="relative flex size-3">
							<span
								class={cn(
									'absolute inline-flex h-full w-full rounded-full opacity-75 bg-gray-400/30',
									store.isOpen && 'animate-ping bg-emerald-400'
								)}
							></span>
							<span
								class={cn(
									'relative inline-flex size-3 rounded-full bg-gray-500/30',
									store.isOpen && 'bg-emerald-500'
								)}
							></span>
						</span>
						({store.isOpen ? 'Open' : 'Close'})
					</div>
				</button>
			{/each}
		</ul>
	</div>
</div>
