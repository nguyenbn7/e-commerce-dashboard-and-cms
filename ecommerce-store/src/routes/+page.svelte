<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Billboard as BillboardComponent } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { Container } from '$lib/components/ui/container';
	import { createQuery } from '@tanstack/svelte-query';

	interface PageProps {}

	let {}: PageProps = $props();

	const billboardId = 6;

	const getBillboard = createQuery({
		queryKey: ['billboards', billboardId],
		queryFn: async () => {
			const url = `${PUBLIC_API_URL}/billboards/${billboardId}`;

			const response = await fetch(url);

			return response.json() as Promise<{ billboard: Billboard }>;
		}
	});
</script>

<Metadata title="Store" description="Store" />

<Container>
	<div class="space-y-10 pb-10">
		<BillboardComponent data={$getBillboard.data?.billboard} />
	</div>
</Container>
