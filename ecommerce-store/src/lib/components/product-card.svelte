<script lang="ts">
	import Expand from '@lucide/svelte/icons/expand';
	import ShoppingCart from '@lucide/svelte/icons/shopping-cart';

	import { IconButton } from '$lib/components/ui';
	import { Currency } from '$lib/components';
	import { usePreviewModal } from '$lib/components/preview-modal';

	import useCart from '$lib/hooks/cart';

	interface Props {
		data: Product;
	}

	const { data: product }: Props = $props();

	const previewModal = usePreviewModal();
	const cart = useCart();
</script>

<a
	href={`/product/${product.id}`}
	class="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
>
	<div class="aspect-square rounded-xl bg-gray-100 relative">
		<img src={product.images[0].url} alt="Product" class="aspect-square object-cover rounded-md" />

		<div class="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
			<div class="flex gap-x-6 justify-center">
				<IconButton
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						previewModal.onOpen(product);
					}}
				>
					<Expand size={20} class="text-gray-600" />
				</IconButton>

				<IconButton
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						cart.addItem(product);
					}}
				>
					<ShoppingCart size={20} class="text-gray-600" />
				</IconButton>
			</div>
		</div>
	</div>

	<div>
		<p class="font-semibold text-lg">{product.name}</p>

		<p class="text-sm text-gray-500">{product.category.name}</p>
	</div>

	<div class="flex items-center justify-between">
		<Currency value={product.price} />
	</div>
</a>
