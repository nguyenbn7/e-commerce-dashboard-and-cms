<script>
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import StoreIcon from '@lucide/svelte/icons/store';

	import { useCurrentStore } from '$features/stores/hooks/use-current-store';
	import { useCart } from '$features/carts/hooks/use-cart';

	import { Button } from '$lib/components/ui/button';

	const { items: cartItems } = useCart();

	const { store } = useCurrentStore();
</script>

<div class="ml-auto flex items-center gap-x-4">
	<Button
		href={`/${$store.id}/cart`}
		class="flex items-center rounded-full bg-black px-4 py-2"
		title="Your cart"
	>
		<ShoppingBag size={20} color="white" />
		<span class="ml-2 text-sm font-medium text-white"> {$cartItems.length} </span>
	</Button>

	<Button
		href="/stores"
		class="flex items-center rounded-full bg-slate-200 px-4 py-2"
		title="Show all stores"
	>
		<StoreIcon size={20} color="gray" />
	</Button>
</div>
