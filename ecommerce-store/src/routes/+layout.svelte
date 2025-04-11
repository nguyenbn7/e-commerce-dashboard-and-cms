<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { Footer, Navbar } from '$lib/components';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<Navbar />

	{@render children()}

	<Footer />
</QueryClientProvider>
