<script lang="ts">
	import type { PageData } from './$types';

	import { deleteBillboard as deleteBillboardApi } from '$features/billboards/api/delete-billboard';
	import { BillboardForm } from '$features/billboards/components';

	import { Metadata } from '$lib/components/metadata';
	import { Heading } from '$lib/components';
	import { DeleteButton } from '$lib/components/button';

	import { Separator } from '$lib/components/ui/separator';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteBillboardClient = deleteBillboardApi({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<Metadata title="Edit billboard" />

<div class="flex items-center justify-between">
	<Heading title="Edit billboard" description="Edit a billboard" />

	<DeleteButton
		onDelete={() => {
			$deleteBillboardClient.mutate({
				param: {
					id: data.billboard.id,
					storeId: data.store.id
				}
			});
		}}
	/>
</div>

<Separator />

<BillboardForm form={data.form} disabled={$deleteBillboardClient.isPending} />

<Separator />
