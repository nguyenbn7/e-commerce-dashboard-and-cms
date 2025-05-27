<script lang="ts">
	import { page } from '$app/state';

	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	import { checkout as checkoutApi } from '$features/carts/api';
	import { useCart } from '$features/carts/hooks/use-cart';
	import { useCurrentStore } from '$features/stores/hooks/use-current-store';

	import { Currency } from '$lib/components';
	import { Button } from '$lib/components/ui/button';

	import { toast } from 'svelte-sonner';

	const { items: cartItems, removeAll } = useCart();
	const { store } = useCurrentStore();
	const searchParams = $derived(page.url.searchParams);
	const totalPrice = $derived($cartItems.reduce((total, item) => total + Number(item.price), 0));
	const checkoutClient = checkoutApi({
		onSuccess(data, variables, context) {
			(window as Window).location = data.url;
		}
	});

	$effect(() => {
		if (searchParams.get('success')) {
			toast.success('Payment completed.');
			removeAll();
			searchParams.delete('success');
			return;
		}

		if (searchParams.get('canceled')) {
			toast.error('Something went wrong.');
			searchParams.delete('canceled');
			return;
		}
	});

	function onCheckout() {
		$checkoutClient.mutate({
			json: { productIds: $cartItems.map((item) => item.id.toString()) },
			param: { storeId: $store.id }
		});
	}
</script>

<div class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
	<h2 class="text-lg font-medium text-gray-900">Order Summary</h2>

	<div class="mt-6 space-y-4">
		<div class="flex items-center justify-between border-t border-gray-200 pt-4">
			<div class="text-base font-medium text-gray-900">Order total</div>

			<Currency value={totalPrice} />
		</div>
	</div>

	<Button
		class="w-full mt-6 flex justify-center items-center"
		onclick={onCheckout}
		disabled={$cartItems.length === 0 || $checkoutClient.isPending}
		>Checkout {#if $checkoutClient.isPending}
			<LoaderCircle size={16} class="size-4 ml-2 text-white animate-spin text-center" />
		{/if}</Button
	>
</div>
