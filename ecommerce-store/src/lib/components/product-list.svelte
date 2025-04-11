<script lang="ts">
	import { NoResults } from '$lib/components/ui';
	import { ProductCard } from '$lib/components';

	interface Props {
		title: string;
		items: Product[];
	}

	let { title, items }: Props = $props();
</script>

<div class="space-y-4">
	<h3 class="font-bold text-3xl">{title}</h3>

	{#if !items.length}
		<NoResults />
	{:else}
		<div class="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each items as item (item.id)}
				<ProductCard data={item} />
			{/each}
		</div>
	{/if}
</div>
