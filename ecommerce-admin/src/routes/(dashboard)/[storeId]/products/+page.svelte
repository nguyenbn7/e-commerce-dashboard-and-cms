<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { ApiList } from '$lib/components/api';
	import { DataTable } from '$lib/components/data-table';
	import { columns } from '$features/products/columns';
	import Plus from '@lucide/svelte/icons/plus';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Products" />

<div class="flex items-center justify-between">
	<Heading
		title={`Products (${data.products.length})`}
		description="Manage products for your store"
	/>

	<Button href={`/${page.params.storeId}/products/create`}>
		<Plus class="mr-2 size-4" />
		Add new
	</Button>
</div>

<Separator />

<DataTable data={data.products} {columns} searchColumnId="label" />

<Heading title="API" description="API calls for Products" class="mt-3" />

<ApiList entityName="products" entityIdName="productId" />
