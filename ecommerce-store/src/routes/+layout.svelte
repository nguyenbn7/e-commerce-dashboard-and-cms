<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { Footer, Navbar } from '$lib/components';

	import { PreviewModal } from '$lib/components/preview-modal';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { Toaster } from 'svelte-sonner';
	import { browser } from '$app/environment';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: LayoutProps = $props();

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
	<Navbar shopName={data.stores[0].name} />

	{@render children()}

	<Footer shopName={data.stores[0].name} />
</QueryClientProvider>
