<script lang="ts">
	import { Metadata } from '$lib/components/metadata';
	import { isStoreModalOpen, openStoreModal } from '$features/stores/components';
	import { UserButton } from 'svelte-clerk';

	interface PageProps {}

	let {}: PageProps = $props();

	$effect(() => {
		if (!isStoreModalOpen()) {
			openStoreModal();
		}
	});
</script>

<Metadata title="Setup" />

<div class="p-4">
	<UserButton />
</div>
