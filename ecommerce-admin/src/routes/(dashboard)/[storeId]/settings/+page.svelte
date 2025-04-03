<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Metadata } from '$lib/components/metadata';
	import { SettingsForm } from '$features/settings/components';
	import Trash from '@lucide/svelte/icons/trash';
	import { ConfirmDialog, getConfirmation } from '$lib/components/confirm-dialog';
	import { useDeleteStore } from '$features/stores/api/use-delete-store';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const deleteStore = useDeleteStore({
		onSuccess: async () => {
			toast.success('Store deleted');
			await goto('/', { invalidateAll: true });
			window.location.reload();
		},
		onError() {
			toast.error('Make sure you removed all products and categories first');
		}
	});

	let openDialog = $state(false);

	async function onDelete(
		$event:
			| (MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
			| (MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement })
	) {
		$event.preventDefault();

		openDialog = true;

		const ok = await getConfirmation();

		if (ok) {
			$deleteStore.mutate({ param: { id: data.store.id.toString() } });
		}

		openDialog = false;
	}
</script>

<Metadata title="Settings" />

<div class="flex-col">
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-3xl font-bold tracking-tight">Settings</h2>
				<p class="text-sm text-muted-foreground">Manage store preferences</p>
			</div>

			<Button variant="destructive" size="sm" onclick={onDelete}>
				<Trash size={16} />
			</Button>
		</div>

		<Separator />

		<SettingsForm
			form={data.form}
			disabled={$deleteStore.isPending}
			onUpdated={async ({ form }) => {
				if (form.valid) {
					toast.success('Store updated');
					window.location.reload();
				}
			}}
			onError={() => {
				toast.error('Something went wrong');
			}}
		/>
	</div>
</div>

<ConfirmDialog
	bind:open={openDialog}
	title="Are you sure?"
	description="This action cannot be undone."
/>
