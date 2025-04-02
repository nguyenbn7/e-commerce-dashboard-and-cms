<script lang="ts">
	import { Metadata } from '$lib/components/metadata';
import { UserButton } from 'svelte-clerk';

	interface PageProps {}

	let {}: PageProps = $props();
</script>

<Metadata title="Setup"/>

<div class="p-4">
	<UserButton />
</div>
