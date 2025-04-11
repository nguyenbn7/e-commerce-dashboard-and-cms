<script>
	import { Button } from '$lib/components/ui/button';
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
</script>

<div class="ml-auto flex items-center gap-x-4">
	<Button class="flex items-center rounded-full bg-black px-4 py-2">
		<ShoppingBag size={20} color="white" />
		<span class="ml-2 text-sm font-medium text-white"> 0 </span>
	</Button>
</div>
