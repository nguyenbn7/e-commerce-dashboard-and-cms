<script lang="ts">
	import type { PageData } from '../(root)/$types';

	import DollarSign from '@lucide/svelte/icons/dollar-sign';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import Package from '@lucide/svelte/icons/package';

	import { formatter } from '$lib/currency';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { Overview } from '$lib/components/overview';

	import { Separator } from '$lib/components/ui/separator';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();

	const { totalRevenue, salesCount, stockCount, graphRevenue } = data;

</script>

<Metadata title="Dashboard" />

<div class="flex-col">
	<div class="flex-1 space-y-4 p-8 pt-6">
		<Heading title="Dashboard" description="Overview of your store" />

		<Separator />

		<div class="grid gap-4 grid-cols-3">
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle>Total Revenue</CardTitle>

					<DollarSign class="h-4 w-4 text-muted-foreground" />
				</CardHeader>

				<CardContent>
					<div class="text-2xl font-bold">
						{formatter.format(totalRevenue)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle>Sales</CardTitle>

					<CreditCard class="h-4 w-4 text-muted-foreground" />
				</CardHeader>

				<CardContent>
					<div class="text-2xl font-bold">+{salesCount}</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle>Products In Stock</CardTitle>

					<Package class="h-4 w-4 text-muted-foreground" />
				</CardHeader>

				<CardContent>
					<div class="text-2xl font-bold">{stockCount}</div>
				</CardContent>
			</Card>
		</div>

		<Card class="col-span-4">
			<CardHeader>
				<CardTitle>Overview</CardTitle>
			</CardHeader>

			<CardContent class="pl-2">
				<Overview data={graphRevenue} />
			</CardContent>
		</Card>
	</div>
</div>
