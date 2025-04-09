<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { Separator } from '$lib/components/ui/separator';
	import { Heading } from '$lib/components';
	import { Metadata } from '$lib/components/metadata';
	import { DeleteButton } from '$lib/components/button';
	import { ApiAlert } from '$lib/components/api';
	import { SettingsForm } from '$features/stores/components';
	import { deleteStoreMutation } from '$features/stores/api';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteMutation = deleteStoreMutation();
</script>

<Metadata title="Settings" />

<div class="flex items-center justify-between">
	<Heading title="Settings" description="Manage store preferences" />

	<DeleteButton
		onDelete={() => {
			$deleteMutation.mutate({ param: { storeId: data.store.id.toString() } });
		}}
	/>
</div>

<Separator />

<SettingsForm
	form={data.form}
	disabled={$deleteMutation.isPending}
	onSuccess={() => {
		window.location.reload();
	}}
/>

<Separator />

<ApiAlert title="PUBLIC_API_URL" description={`${page.url.origin}/api/${page.params.storeId}`} />
