<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { SizeForm } from '$features/sizes/components';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Create size" />

<Heading title="Create size" description="Add a new size" />

<Separator />

<SizeForm
	form={data.form}
	onUpdated={({ form }) => {
		if (form.valid) {
			toast.success('Size created');
			window.location.reload();
		}
	}}
	onError={() => {
		toast.error('Something went wrong');
	}}
	submitBtnText="Create"
/>

<Separator />
