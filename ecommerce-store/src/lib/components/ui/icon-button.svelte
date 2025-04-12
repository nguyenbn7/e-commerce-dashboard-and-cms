<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		onclick?: MouseEventHandler<HTMLButtonElement> | null;
		class?: string;
		children: Snippet;
	}

	let { onclick, class: className, children, ...restProps }: Props = $props();
</script>

<button
	{onclick}
	class={cn(
		'rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition',
		className
	)}
	{...restProps}
	>{@render children()}
</button>
