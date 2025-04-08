<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { DeleteButton } from '$lib/components/button';
	import { ColorForm } from '$features/colors/components';
	import { deleteColorMutation } from '$features/colors/api';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteMutation = deleteColorMutation({
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
			$deleteMutation.mutate({
				param: {
					storeId: data.store.id.toString(),
					colorId: data.color.id.toString()
				}
			});
		}}
	/>
</div>

<Separator />

<ColorForm form={data.form} disabled={$deleteMutation.isPending} />

<Separator />
