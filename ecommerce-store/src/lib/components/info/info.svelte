<script lang="ts">
	import { useCart } from '$features/carts/hooks/use-cart';
	import { Currency } from '$lib/components';
	import { Button } from '$lib/components/ui/button';
	import ShoppingCart from '@lucide/svelte/icons/shopping-cart';

	interface Props {
		data: Product;
	}

	let { data: product }: Props = $props();

	const { addItem } = useCart();
</script>

<h1 class="text-3xl font-bold text-gray-900">{product.name}</h1>

<div class="mt-3 flex items-end justify-between">
	<p class="text-2xl text-gray-900">
		<Currency value={product.price} />
	</p>
</div>

<hr class="my-4" />

<div class="flex flex-col gap-y-6">
	<div class="flex items-center gap-x-4">
		<h3 class="font-semibold text-black">Size:</h3>

		<div>
			{product.size.name}
		</div>
	</div>

	<div class="flex items-center gap-x-4">
		<h3 class="font-semibold text-black">Color:</h3>

		<div
			class="size-6 rounded-full border border-gray-600"
			style={`background-color: ${product.color.value};`}
		></div>
	</div>
</div>

<div class="mt-10 flex items-center gap-x-3">
	<Button class="flex items-center gap-x-2" onclick={() => addItem(product)}
		>Add To Cart <ShoppingCart /></Button
	>
</div>
