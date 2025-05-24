<script lang="ts">
	import type { PageData } from './$types';

	import { deleteStore as deleteStoreApi } from '$features/stores/api/delete-store';
	import { SettingsForm } from '$features/stores/components';

	import { Metadata } from '$lib/components/metadata';
	import { Heading } from '$lib/components';
	import { DeleteButton } from '$lib/components/button';
	import { ApiAlert } from '$lib/components/api';

	import { Separator } from '$lib/components/ui/separator';

	import { page } from '$app/state';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();

	const deleteStoreClient = deleteStoreApi();
</script>

<Metadata title="Settings" />

<div class="flex items-center justify-between">
	<Heading title="Settings" description="Manage store preferences" />

	<DeleteButton
		disabled={$deleteStoreClient.isPending}
		onDelete={() => {
			$deleteStoreClient.mutate({ param: { id: data.store.id } });
		}}
	/>
</div>

<Separator />

<SettingsForm
	form={data.form}
	disabled={$deleteStoreClient.isPending}
	onSuccess={() => {
		window.location.reload();
	}}
/>

<Separator />

<ApiAlert
	title="PUBLIC_API_URL"
	description={`${page.url.origin}/api/stores/${page.params.storeId}`}
/>
