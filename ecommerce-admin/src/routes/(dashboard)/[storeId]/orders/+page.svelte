<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { DataTable } from '$lib/components/data-table';
	import { columns } from '$features/orders/columns';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Orders" />

<Heading title={`Orders (${data.orders.length})`} description="Manage orders for your store" />

<Separator />

<DataTable data={data.orders} {columns} searchColumnId="products" />
