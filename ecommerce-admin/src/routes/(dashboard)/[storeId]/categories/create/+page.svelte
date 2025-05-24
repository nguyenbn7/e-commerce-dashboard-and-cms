<script lang="ts">
	import type { PageData } from './$types';

	import { CategoryForm } from '$features/categories/components';

	import { getBillboards as getBillboardsApi } from '$features/billboards/api/get-billboards';

	import { Metadata } from '$lib/components/metadata';
	import { Heading } from '$lib/components';

	import { Separator } from '$lib/components/ui/separator';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const getBillboardsClient = getBillboardsApi({ storeId: data.store.id });
</script>

<Metadata title="Create Category" />

<Heading title="Create category" description="Add a new category" />

<Separator />

<CategoryForm
	createForm
	form={data.form}
	disabled={$getBillboardsClient.isPending}
	billboards={$getBillboardsClient.data?.billboards}
/>

<Separator />
