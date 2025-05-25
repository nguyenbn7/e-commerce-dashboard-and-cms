<script lang="ts">
	import type { PageData } from './$types';
	import { Billboard, ProductCard } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';
	import { Filter, MobileFilters } from '$features/categories/components';
	import { NoResults } from '$lib/components/ui';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<Metadata title={`Category: ${data.category.name}`} />

<div class="bg-white">
	<Container>
		<Billboard data={data.category.billboard} />

		<div class="px-4 sm:px-6 lg:px-8 pb-24">
			<div class="lg:grid lg:grid-cols-5 lg:gap-x-8">
				<MobileFilters sizes={data.sizes} colors={data.colors} />

				<div class="hidden lg:block">
					<Filter valueKey="sizeId" name="Sizes" data={data.sizes} />

					<Filter valueKey="colorId" name="Colors" data={data.colors} />
				</div>

				<div class="mt-6 lg:col-span-4 lg:mt-0">
					{#if data.products.length === 0}
						<NoResults />
					{:else}
						<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{#each data.products as item}
								<ProductCard data={item} />
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</Container>
</div>
