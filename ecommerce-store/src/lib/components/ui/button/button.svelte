<script lang="ts" module>
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	export interface Props {
		ref?: HTMLButtonElement | HTMLAnchorElement;
	}
</script>

<script lang="ts">
	let {
		ref = $bindable(),
		class: className,
		href,
		children,
		type = 'button',
		...restProps
	}: Props & HTMLButtonAttributes & HTMLAnchorAttributes = $props();
</script>

{#if href}
	<a
		{href}
		bind:this={ref}
		{type}
		class={cn(
			'w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		{type}
		class={cn(
			'w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
