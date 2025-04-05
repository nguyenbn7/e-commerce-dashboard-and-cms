<script lang="ts">
	import type { PageData } from '../(root)/$types';

	import { Metadata } from '$lib/components/metadata';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Dashboard" />

<div>Dashboard here</div>
