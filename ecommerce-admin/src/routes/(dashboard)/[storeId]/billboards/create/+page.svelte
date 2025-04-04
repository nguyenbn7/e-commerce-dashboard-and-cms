<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Separator } from '$lib/components/ui/separator';
	import { Metadata } from '$lib/components/metadata';
	import { BillboardForm } from '$features/billboards/components';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Create billboard" />

<div class="flex items-center justify-between">
	<div>
		<h2 class="text-3xl font-bold tracking-tight">Create billboard</h2>
		<p class="text-sm text-muted-foreground">Add a new billboard</p>
	</div>
</div>

<Separator />

<BillboardForm
	form={data.form}
	onUpdated={async ({ form }) => {
		if (form.valid) {
			toast.success('Billboard created');
			window.location.reload();
		}
	}}
	onError={() => {
		toast.error('Something went wrong');
	}}
	submitBtnText="Create"
/>

<Separator />
