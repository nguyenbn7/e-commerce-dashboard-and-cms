import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const storeStore = writable<AvailableStore>({
	id: '',
	name: '',
	isOpen: false,
	billboards: []
});

export function getCurrentStoreFromStorage(stores: AvailableStore[]) {
	if (!browser) return;

	const storeId = localStorage.getItem('store');

	if (storeId) {
		const store = stores.find((s) => s.id === storeId);

		if (store) {
			storeStore.set(store);
			localStorage.setItem('store', store.id);
			return;
		}
	}
}

export function useGetCurrentStore() {
	return {
		store: { subscribe: storeStore.subscribe },
		saveStoreIdToLocalStorage: (id: string) => localStorage.setItem('store', id)
	};
}
