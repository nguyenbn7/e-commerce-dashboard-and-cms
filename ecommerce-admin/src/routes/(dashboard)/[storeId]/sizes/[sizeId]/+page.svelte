<script lang="ts">
	import type { PageData } from './$types';

	import { deleteSize as deleteSizeApi } from '$features/sizes/api/delete-size';
	import { SizeForm } from '$features/sizes/components';

	import { Metadata } from '$lib/components/metadata';
	import { Heading } from '$lib/components';
	import { DeleteButton } from '$lib/components/button';

	import { Separator } from '$lib/components/ui/separator';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteSizeClient = deleteSizeApi({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<Metadata title="Edit Size" />

<div class="flex items-center justify-between">
	<Heading title="Edit Size" description="Edit a size" />

	<DeleteButton
		onDelete={() => {
			$deleteSizeClient.mutate({
				param: {
					id: data.size.id,
					storeId: data.store.id
				}
			});
		}}
	/>
</div>

<Separator />

<SizeForm form={data.form} disabled={$deleteSizeClient.isPending} />

<Separator />
