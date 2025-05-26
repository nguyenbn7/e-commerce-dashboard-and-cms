<script lang="ts">
	import type { PageData } from './$types';

	import { Billboard as BillboardComponent, ProductList } from '$lib/components';

	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();

	const { store, billboard, products } = data;
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
