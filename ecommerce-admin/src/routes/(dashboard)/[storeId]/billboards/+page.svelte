<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Metadata } from '$lib/components/metadata';
	import Plus from '@lucide/svelte/icons/plus';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Billboards" />

<div class="flex items-center justify-between">
	<div>
		<h2 class="text-3xl font-bold tracking-tight">Billboards (0)</h2>
		<p class="text-sm text-muted-foreground">Manage billboards for your store</p>
	</div>

	<Button href={`/${page.params.storeId}/billboards/create`}>
		<Plus class="mr-2 size-4" />
		Add new
	</Button>
</div>

<Separator />
