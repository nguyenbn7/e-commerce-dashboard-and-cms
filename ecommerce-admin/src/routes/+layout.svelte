<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';

	import { browser } from '$app/environment';

	import { ClerkProvider } from 'svelte-clerk';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	import { Toaster } from '$lib/components/ui/sonner';
	import { ConfirmDialog } from '$lib/components/confirm-dialog';
	import { ModeWatcher } from 'mode-watcher';

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

<ModeWatcher />

<Toaster richColors position="top-right" closeButton />

<ConfirmDialog title="Are you sure?" description="This action cannot be undone." />

<QueryClientProvider client={queryClient}>
	<ClerkProvider>
		{@render children()}
	</ClerkProvider>
</QueryClientProvider>
