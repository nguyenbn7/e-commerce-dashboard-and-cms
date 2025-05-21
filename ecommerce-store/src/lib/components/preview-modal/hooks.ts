import { writable } from 'svelte/store';

const previewModalStore = writable<{
	isOpen: boolean;
	data: undefined | Product;
}>({
	isOpen: false,
	data: undefined
});

export default function usePreviewModal() {
	return {
		previewModalStore: { subscribe: previewModalStore.subscribe },
		onOpen: (data: Product) => previewModalStore.set({ data, isOpen: true }),
		onClose: () => previewModalStore.set({ data: undefined, isOpen: false })
	};
}
