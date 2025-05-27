<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import Loader from '@lucide/svelte/icons/loader-circle';

	import { ClerkLoaded, ClerkLoading } from 'svelte-clerk';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: LayoutProps = $props();
</script>

<div class="flex items-center justify-center w-full min-h-screen">
	<ClerkLoading>
		<Loader size={16} class="size-28 animate-spin ml-1" />
	</ClerkLoading>

	<ClerkLoaded>
		{@render children()}
	</ClerkLoaded>
</div>
