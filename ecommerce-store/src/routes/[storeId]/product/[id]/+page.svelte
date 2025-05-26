<script lang="ts">
	import type { PageData } from './$types';

	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';
	import { Gallery } from '$lib/components/gallery';
	import { Info } from '$lib/components/info';
	import { ProductList } from '$lib/components';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { product, suggestedProducts } = data;
</script>

<Metadata title={product?.name ?? 'Unknown Product'} />

<div class="bg-white">
	<Container>
		<div class="px-4 py-10 sm:px-6 lg:px-8">
			<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
				<Gallery images={product.images} />

				<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
					<Info data={product} />
				</div>
			</div>

			<hr class="my-10" />

			<ProductList title="Related Items" items={suggestedProducts} />
		</div>
	</Container>
</div>
