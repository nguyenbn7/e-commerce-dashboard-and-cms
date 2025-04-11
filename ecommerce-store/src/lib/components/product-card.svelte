<script lang="ts">
	import { IconButton } from '$lib/components/ui';
	import { Currency } from '$lib/components';
	import Expand from '@lucide/svelte/icons/expand';
	import ShoppingCart from '@lucide/svelte/icons/shopping-cart';

	interface Props {
		data: Product;
	}

	let { data }: Props = $props();
</script>

<div class="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
	<div class="aspect-square rounded-xl bg-gray-100 relative">
		<img src={data.images[0].url} alt="Product" class="aspect-square object-cover rounded-md" />

		<div class="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
			<div class="flex gap-x-6 justify-center">
				<IconButton onclick={() => {}}>
					<Expand size={20} class="text-gray-600" />
				</IconButton>

				<IconButton onclick={() => {}}>
					<ShoppingCart size={20} class="text-gray-600" />
				</IconButton>
			</div>
		</div>
	</div>

	<div>
		<p class="font-semibold text-lg">{data.name}</p>

		<p class="text-sm text-gray-500">{data.category.name}</p>
	</div>

	<div class="flex items-center justify-between">
		<Currency value={data.price} />
	</div>
</div>
