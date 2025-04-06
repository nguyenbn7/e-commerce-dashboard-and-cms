<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { CategoryForm } from '$features/categories/components';
	import {
		useGetBillboards,
		type UseGetBillboards
	} from '$features/billboards/api/use-get-billboards';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	let getBillboards: undefined | UseGetBillboards = $state();

	onMount(() => {
		getBillboards = useGetBillboards({ storeId: data.store.id });
	});
</script>

<Metadata title="Create Category" />

<Heading title="Create category" description="Add a new category" />

<Separator />

<CategoryForm
	form={data.form}
	disabled={$getBillboards?.isPending}
	billboards={$getBillboards?.data?.data.billboards}
	onUpdated={({ form }) => {
		if (form.valid) {
			toast.success('Category created');
			window.location.reload();
		}
	}}
	onError={() => {
		toast.error('Something went wrong');
	}}
	submitBtnText="Create"
/>

<Separator />
