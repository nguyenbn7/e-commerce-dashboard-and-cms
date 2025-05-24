<script lang="ts">
	import type { PageData } from './$types';

	import { StoreModal } from '$features/stores/components';

	import { Metadata } from '$lib/components/metadata';

	import { goto } from '$app/navigation';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	let open = $state(false);

	$effect(() => {
		if (!open) {
			open = true;
		}
	});
</script>

<Metadata title="Setup" />

<StoreModal
	bind:open
	onSuccess={async (storeId) => {
		await goto(`${storeId}`, { invalidate: ['/'] });
	}}
/>
