<script lang="ts">
	import { Metadata } from '$lib/components/metadata';
	import type { PageData } from './$types';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Dashboard" />

<div>Dashboard here</div>
