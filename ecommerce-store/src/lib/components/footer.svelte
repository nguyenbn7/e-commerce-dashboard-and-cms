<script lang="ts">
	interface Props {
		shopName: string;
	}

	let { shopName }: Props = $props();
</script>

<footer class="bg-white border-t">
	<div class="mx-auto py-10">
		<p class="text-center text-xs text-black">
			&copy; {new Date(Date.now()).getFullYear()}
			{shopName || 'FakeStoreNameA'}, Inc. All rights reserved.
		</p>
	</div>
</footer>
