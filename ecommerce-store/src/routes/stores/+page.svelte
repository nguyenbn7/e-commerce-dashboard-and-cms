<script lang="ts">
	import type { PageData } from './$types';

	import StoreIcon from '@lucide/svelte/icons/store';

	import { useCurrentStore } from '$features/stores/hooks/use-current-store';
	import { useCart } from '$features/carts/hooks/use-cart';

	import { Metadata } from '$lib/components/metadata';
	import { cn } from '$lib/utils';

	import { Separator } from 'bits-ui';
	import { goto } from '$app/navigation';

	const { data }: { data: PageData } = $props();

	const { stores } = data;

	// const getStoresClient = getStoresApi();
	const { store: currentStore, saveStoreId } = useCurrentStore();
	const { items: cartItems, removeAll } = useCart();

	async function onChangeCurrentStore(storeId: string) {
		if ($cartItems.length > 0) {
			const ok = confirm(
				'Your cart is not empty. Are you sure that you want to switch to new store?'
			);

			if (!ok) return;

			removeAll();
		}

		saveStoreId(storeId);
		return goto(`/${storeId}`, { invalidateAll: true, replaceState: true });
	}
</script>

<Metadata title="Stores" />

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
					onclick={() => onChangeCurrentStore(store.id)}
					disabled={!store.isOpen}
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
