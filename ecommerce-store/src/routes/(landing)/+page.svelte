<script lang="ts">
	import type { PageData } from './$types';

	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	import { getCurrentStoreIdFromStorage } from '$features/stores/hooks/use-current-store';

	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	onMount(() => {
		const storeId = getCurrentStoreIdFromStorage();

		if (!storeId) return goto('/stores', { invalidateAll: true, replaceState: true });

		return goto(`/${storeId}`, { invalidateAll: true, replaceState: true });
	});
</script>

<Metadata title="Loading..." />

<Container>
	<div class="min-h-screen flex flex-col items-center justify-center">
		<LoaderCircle size={16} class="size-32 animate-spin" />
	</div>
</Container>
