<script lang="ts">
	import { page } from '$app/state';
	import { checkout as checkoutClient } from '$features/shopping-cart/api';
	import { Currency } from '$lib/components';
	import { Button } from '$lib/components/ui/button';
	import useCart from '$lib/hooks/cart';
	import { toast } from 'svelte-sonner';

	const { items: cartItems, removeAll } = useCart();
	const searchParams = $derived(page.url.searchParams);
	const totalPrice = $derived($cartItems.reduce((total, item) => total + Number(item.price), 0));
	const checkout = checkoutClient({
		onSuccess(data, variables, context) {
			window.location = data.url;
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
		$checkout.mutate({ json: { productIds: $cartItems.map((item) => item.id.toString()) } });
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

	<Button class="w-full mt-6" onclick={onCheckout}>Checkout</Button>
</div>
