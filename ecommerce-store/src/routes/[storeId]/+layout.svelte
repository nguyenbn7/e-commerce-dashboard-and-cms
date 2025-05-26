<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { useCurrentStore } from '$features/stores/hooks/use-current-store';
	import { useCategories } from '$features/categories/hooks/use-categories';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const { store, categories } = data;

	const { setCurrentStore } = useCurrentStore();
	const { setCategories } = useCategories();

	setCurrentStore(store);
	setCategories(categories);
</script>

{@render children()}
