<script lang="ts">
	import type { PageData } from './$types';

	import { ColorForm } from '$features/colors/components';
	import { deleteColor as deleteColorApi } from '$features/colors/api/delete-color';

	import { Metadata } from '$lib/components/metadata';
	import { Heading } from '$lib/components';
	import { DeleteButton } from '$lib/components/button';

	import { Separator } from '$lib/components/ui/separator';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteColorClient = deleteColorApi({
		onSuccess: () => {
			window.location.reload();
		}
	});
</script>

<Metadata title="Edit Color" />

<div class="flex items-center justify-between">
	<Heading title="Edit Color" description="Edit a color" />

	<DeleteButton
		onDelete={() => {
			$deleteColorClient.mutate({
				param: {
					storeId: data.store.id,
					id: data.color.id
				}
			});
		}}
	/>
</div>

<Separator />

<ColorForm form={data.form} disabled={$deleteColorClient.isPending} />

<Separator />
