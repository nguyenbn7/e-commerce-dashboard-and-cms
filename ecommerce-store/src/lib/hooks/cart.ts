import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';
import { get, writable } from 'svelte/store';

const name = 'cart-storage';

function getCartFromStorage(name: string): Product[] {
	if (!browser) return [];

	const storedString = localStorage.getItem(name);

	if (storedString) {
		try {
			const parsedData = JSON.parse(storedString);
			if (!Array.isArray(parsedData)) return [];

			return parsedData;
		} catch (e) {
			return [];
		}
	}

	return [];
}

function saveCartToStorage(name: string, products: Product[]) {
	return localStorage.setItem(name, JSON.stringify(products));
}

function deleteCartFromStorage(name: string) {
	return localStorage.removeItem(name);
}

const cartStore = writable<Array<Product>>(getCartFromStorage(name));

export default function useCart() {
	return {
		items: { subscribe: cartStore.subscribe },
		addItem: (data: Product) => {
			const currentItems = get(cartStore);
			const existingItem = currentItems.find((item) => item.id === data.id);

			if (existingItem) {
				return toast.error('Item already in cart.');
			}

			cartStore.update((currentCart) => [...currentCart, data]);

			saveCartToStorage(name, get(cartStore));

			toast.success('Item added to cart.');
		},
		removeItem: (id: string) => {
			cartStore.update((currentCart) => [...currentCart.filter((item) => item.id !== id)]);

			saveCartToStorage(name, get(cartStore));

			toast.success('Item removed from the cart.');
		},
		removeAll: () => {
			cartStore.set([]);

			deleteCartFromStorage(name);
		}
	};
}
