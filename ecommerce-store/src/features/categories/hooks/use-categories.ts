import { writable } from 'svelte/store';

const categoriesStore = writable<Category[]>([]);

export function useCategories() {
	return {
		categories: { subscribe: categoriesStore.subscribe },
		setCategories: (categories: Category[]) => categoriesStore.set(categories)
	};
}
