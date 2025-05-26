<script lang="ts">
	import X from '@lucide/svelte/icons/x';

	import { useCart } from '$features/carts/hooks/use-cart';

	import { IconButton } from '$lib/components/ui';
	import { Currency } from '$lib/components';

	interface Props {
		data: Product;
	}

	const { data }: Props = $props();

	const { removeItem } = useCart();
</script>

<li class="flex py-6 border-b">
	<div class="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
		<img src={data.images[0].url} alt="" class="object-cover object-center aspect-square" />
	</div>

	<div class="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
		<div class="absolute z-10 right-0 top-0">
			<IconButton onclick={() => removeItem(data.id)}>
				<X size={15} />
			</IconButton>
		</div>

		<div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
			<div class="flex justify-between">
				<p class="text-lg font-semibold text-black">{data.name}</p>
			</div>

			<div class="mt-1 flex text-sm">
				<p class="text-gray-500">{data.color.name}</p>
				<p class="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data.size.name}</p>
			</div>

			<Currency value={data.price} />
		</div>
	</div>
</li>
