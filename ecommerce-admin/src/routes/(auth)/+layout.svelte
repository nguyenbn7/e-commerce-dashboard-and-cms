<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex items-center justify-center w-full min-h-screen">
	{@render children()}
</div>
