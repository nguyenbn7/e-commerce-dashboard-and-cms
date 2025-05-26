import { browser } from '$app/environment';
import { writable } from 'svelte/store';

interface CurrentStoreData {
	id: string;
	name: string;
}

const currentStoreStore = writable<CurrentStoreData>({
	id: '',
	name: ''
});

export function getCurrentStoreIdFromStorage() {
	if (!browser) throw new Error('getStoreIdFromStorage() should not be called in ssr');

	return localStorage.getItem('store');
}

export function useCurrentStore() {
	return {
		store: { subscribe: currentStoreStore.subscribe },
		setCurrentStore: (store: CurrentStoreData) => currentStoreStore.set(store),
		saveStoreId: (id: string) => localStorage.setItem('store', id)
	};
}
