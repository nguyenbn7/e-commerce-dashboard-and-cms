<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';

	import XIcon from '@lucide/svelte/icons/x';

	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

	import { ConfirmDialog } from '$lib/components/confirm-dialog';

	import { Toaster } from '$lib/components/ui/sonner';

	import { ClerkProvider } from 'svelte-clerk';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
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

<Toaster richColors position="top-right" closeButton>
	{#snippet closeIcon()}
		<XIcon size={16} class="dark:text-white/80 size-3" />
	{/snippet}
</Toaster>

<ConfirmDialog title="Are you sure?" description="This action cannot be undone." />

<QueryClientProvider client={queryClient}>
	<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
		{@render children()}
	</ClerkProvider>
</QueryClientProvider>
