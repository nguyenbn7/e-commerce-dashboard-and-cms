<script lang="ts">
	import { Metadata } from '$lib/components/metadata';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<Metadata title={`Category: ${data.category.name}`} />
