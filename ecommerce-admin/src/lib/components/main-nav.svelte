<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import { page } from '$app/state';

	let { class: className }: HTMLAttributes<HTMLElement> = $props();

	const routes = $derived([
		{
			href: `/${page.params.storeId}/settings`,
			label: 'Settings',
			active: page.url.pathname === `/${page.params.storeId}/settings`
		}
	]);
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	{#each routes as route (route.href)}
		<a
			href={route.href}
			class={cn(
				'text-sm font-medium transition-colors hover:text-primary',
				route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
			)}
		>
			{route.label}
		</a>
	{/each}
</nav>
