<script lang="ts">
	import { useCurrentStore } from '$features/stores/hooks/use-current-store';

	const { store } = useCurrentStore();
</script>

<footer class="bg-white border-t">
	<div class="mx-auto py-10">
		<p class="text-center text-xs text-black">
			&copy; {new Date(Date.now()).getFullYear()}
			{$store.name || 'FakeStoreNameA'}, Inc. All rights reserved.
		</p>
	</div>
</footer>
