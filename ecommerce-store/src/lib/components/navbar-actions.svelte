<script>
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';

	import { Button } from '$lib/components/ui/button';

	import useCart from '$lib/hooks/cart';

	const { items: cartItems } = useCart();
</script>

<div class="ml-auto flex items-center gap-x-4">
	<Button href="/cart" class="flex items-center rounded-full bg-black px-4 py-2">
		<ShoppingBag size={20} color="white" />
		<span class="ml-2 text-sm font-medium text-white"> {$cartItems.length} </span>
	</Button>
</div>
