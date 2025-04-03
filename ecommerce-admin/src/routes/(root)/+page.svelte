<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Metadata } from '$lib/components/metadata';
	import { StoreModal } from '$features/stores/components';
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
	onSuccess={async (data) => {
		toast.success('Store created');
		const { data: responseData } = data;
		const { id } = responseData.store;
		await goto(`${id}`, { invalidate: ['/'] });
		open = false;
	}}
/>
