<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import queryString from 'query-string';

	interface Props {
		data: (Size | Color)[];
		name: string;
		valueKey: string;
	}

	let { data, name, valueKey }: Props = $props();

	const selectedValue = $derived(page.url.searchParams.get(valueKey));

	async function onClick(id: string) {
		const current = queryString.parse(page.url.searchParams.toString());

		const query = {
			...current,
			[valueKey]: id
		};

		if (current[valueKey] === id) {
			query[valueKey] = null;
		}

		const url = queryString.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipNull: true }
		);

		console.log(url);

		await goto(url, { noScroll: true });
	}
</script>

<div class="mb-8">
	<h3 class="text-lg font-semibold">
		{name}
	</h3>

	<hr class="my-4" />

	<div class="flex flex-wrap gap-2">
		{#each data as filter (filter.id)}
			<div class="flex items-center">
				<Button
					class={cn(
						'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
						selectedValue === filter.id.toString() && 'bg-black text-white'
					)}
					onclick={() => onClick(filter.id.toString())}
				>
					{filter.name}
				</Button>
			</div>
		{/each}
	</div>
</div>
