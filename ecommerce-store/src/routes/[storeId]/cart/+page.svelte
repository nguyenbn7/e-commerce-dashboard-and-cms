<script lang="ts">
	import type { PageData } from './$types';

	import { useCart } from '$features/carts/hooks/use-cart';

	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';
	import { CartItem } from '$lib/components/cart-item';
	import { Summary } from '$lib/components/cart-summary';

	let { data }: { data: PageData } = $props();

	const { items: cartItems } = useCart();
</script>

<Metadata title="Cart" />

<div class="bg-white">
	<Container>
		<div class="px-4 sm:px-6 lg:px-8 py-16">
			<h1 class="text-3xl font-bold text-black">Shopping Cart</h1>

			<div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
				<div class="lg:col-span-7">
					{#if $cartItems.length == 0}
						<p class="text-neutral-500">No items added to cart</p>
					{:else}
						<ul>
							{#each $cartItems as item (item.id)}
								<CartItem data={item} />
							{/each}
						</ul>
					{/if}
				</div>

				<Summary />
			</div>
		</div>
	</Container>
</div>
