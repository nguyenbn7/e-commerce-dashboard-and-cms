<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { ClerkProvider } from 'svelte-clerk';
	import { StoreModal } from '$lib/components/modal';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();
</script>

<ClerkProvider>
	<StoreModal />
	{@render children()}
</ClerkProvider>
