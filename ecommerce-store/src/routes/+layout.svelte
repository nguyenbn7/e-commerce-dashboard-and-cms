<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { Footer, Navbar } from '$lib/components';

	import { PreviewModal } from '$lib/components/preview-modal';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { useGetCurrentStore } from '$features/stores/hooks/use-get-current-store';
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
				enabled: browser,
				refetchOnWindowFocus: false
			}
		}
	});

	const { store } = useGetCurrentStore();
</script>

<PreviewModal />

<Toaster closeButton position="top-center" />

<QueryClientProvider client={queryClient}>
	<Navbar shopName={$store.name} />

	{@render children()}

	<Footer shopName={$store.name} />
</QueryClientProvider>
