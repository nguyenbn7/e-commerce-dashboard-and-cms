<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	interface Props {
		data: Category[];
		storeId: string;
	}

	const { data, storeId }: Props = $props();

	const routes = $derived(
		data.map((route) => ({
			href: `/${storeId}/category/${route.id}`,
			label: route.name
		}))
	);
</script>

<nav class="mx-6 flex items-center space-x-4 lg:space-x-6">
	{#each routes as route (route.href)}
		<a
			href={route.href}
			class={cn(
				'text-sm font-medium transition-colors hover:text-black',
				page.url.pathname === route.href ? 'text-black' : 'text-neutral-500'
			)}>{route.label}</a
		>
	{/each}
</nav>
