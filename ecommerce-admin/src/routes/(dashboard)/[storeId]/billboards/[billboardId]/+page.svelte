<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Metadata } from '$lib/components/metadata';
	import { BillboardForm } from '$features/billboards/components';
	import Trash from '@lucide/svelte/icons/trash';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Edit billboard" />

<div class="flex items-center justify-between">
	<div>
		<h2 class="text-3xl font-bold tracking-tight">Edit billboard</h2>
		<p class="text-sm text-muted-foreground">Edit a billboard</p>
	</div>

	<Button variant="destructive" size="sm" onclick={() => {}}>
		<Trash size={16} />
	</Button>
</div>

<Separator />

<BillboardForm
	form={data.form}
	onUpdated={async ({ form }) => {
		if (form.valid) {
			toast.success('Billboard updated');
			window.location.reload();
		}
	}}
	onError={() => {
		toast.error('Something went wrong');
	}}
/>

<Separator />
