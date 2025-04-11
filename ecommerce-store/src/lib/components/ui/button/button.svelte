<script lang="ts" module>
	import { cn } from '$lib/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export interface Props extends HTMLButtonAttributes {
		ref?: HTMLButtonElement;
	}
</script>

<script lang="ts">
	let {
		ref = $bindable(),
		class: className,
		children,
		type = 'button',
		...restProps
	}: Props = $props();
</script>

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
