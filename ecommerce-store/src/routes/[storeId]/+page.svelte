<script lang="ts">
	import type { PageData } from './$types';

	import { useCurrentStore } from '$features/stores/hooks/use-current-store';
	import { useCategories } from '$features/categories/hooks/use-categories';

	import { Billboard as BillboardComponent, ProductList } from '$lib/components';

	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();

	const { store, billboard, products, categories } = data;

	const { setCurrentStore } = useCurrentStore();
	const { setCategories } = useCategories();

	setCurrentStore(store);
	setCategories(categories);
</script>

<Metadata title={store.name} description={store.name} />

<Container>
	<div class="space-y-10 pb-10 min-h-screen">
		<BillboardComponent data={billboard} />

		<div class="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
			<ProductList title="Featured Products" items={products} />
		</div>
	</div>
</Container>
