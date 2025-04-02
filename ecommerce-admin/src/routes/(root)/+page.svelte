<script lang="ts">
	import { Metadata } from '$lib/components/metadata';
	import { isStoreModalOpen, openStoreModal } from '$features/stores/components';

	interface PageProps {}

	let {}: PageProps = $props();

	$effect(() => {
		if (!isStoreModalOpen()) {
			openStoreModal();
		}
	});
</script>

<Metadata title="Setup" />
