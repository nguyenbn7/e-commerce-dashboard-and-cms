<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { ClerkProvider } from 'svelte-clerk';
	import { Toaster } from '$lib/components/ui/sonner';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();
</script>

<Toaster richColors position="top-right" closeButton theme="light" />

<QueryClientProvider>
	<ClerkProvider>
		{@render children()}
	</ClerkProvider>
</QueryClientProvider>
