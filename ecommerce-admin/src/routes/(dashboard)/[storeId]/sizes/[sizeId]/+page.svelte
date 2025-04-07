<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { DeleteButton } from '$lib/components/button';
	import { SizeForm } from '$features/sizes/components';
	import { deleteSizeMutation } from '$features/sizes/api';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteMutation = deleteSizeMutation({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<Metadata title="Edit Size" />

<div class="flex items-center justify-between">
	<Heading title="Edit Size" description="Edit a billboard" />

	<DeleteButton
		onDelete={() => {
			$deleteMutation.mutate({
				param: {
					storeId: data.store.id.toString(),
					sizeId: data.size.id.toString()
				}
			});
		}}
	/>
</div>

<Separator />

<SizeForm form={data.form} disabled={$deleteMutation.isPending} />

<Separator />
