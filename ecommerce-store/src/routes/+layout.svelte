<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { browser } from '$app/environment';
	import { Footer, Navbar } from '$lib/components';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { PreviewModal } from '$lib/components/preview-modal';
	import { Toaster } from 'svelte-sonner';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<PreviewModal />

<Toaster closeButton position="top-center" />

<QueryClientProvider client={queryClient}>
	<Navbar />

	{@render children()}

	<Footer />
</QueryClientProvider>
