<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { getBillboardsQuery } from '$features/billboards/api';
	import { CategoryForm } from '$features/categories/components';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	let getBillboards: undefined | ReturnType<typeof getBillboardsQuery> = $state();

	onMount(() => {
		getBillboards = getBillboardsQuery({ storeId: data.store.id });
	});
</script>

<Metadata title="Create Category" />

<Heading title="Create category" description="Add a new category" />

<Separator />

<CategoryForm
	createForm
	form={data.form}
	disabled={$getBillboards?.isPending}
	billboards={$getBillboards?.data?.billboards}
/>

<Separator />
