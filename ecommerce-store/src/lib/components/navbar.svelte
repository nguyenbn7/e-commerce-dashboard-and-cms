<script lang="ts">
	import { Container } from '$lib/components/ui/container';

	import { useCurrentStore } from '$features/stores/hooks/use-current-store';
	import { useCategories } from '$features/categories/hooks/use-categories';

	import MainNav from '$lib/components/main-nav.svelte';
	import NavbarActions from '$lib/components/navbar-actions.svelte';

	const { store } = useCurrentStore();
	const { categories } = useCategories();
</script>

<div class="border-b">
	<Container>
		<div class="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
			<a href="/{$store.id || ''}" class="ml-4 flex lg:ml-0 gap-x-2">
				<p class="font-bold text-xl uppercase">{$store.name || 'E-commerce'}</p>
			</a>

			<MainNav data={$categories} storeId={$store.id} />

			<NavbarActions />
		</div>
	</Container>
</div>
