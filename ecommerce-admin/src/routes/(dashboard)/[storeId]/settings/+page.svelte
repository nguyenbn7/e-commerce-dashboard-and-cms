<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Metadata } from '$lib/components/metadata';
	import { SettingsForm } from '$features/settings/components';
	import Trash from '@lucide/svelte/icons/trash';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Settings" />

<div class="flex-col">
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-3xl font-bold tracking-tight">Settings</h2>
				<p class="text-sm text-muted-foreground">Manage store preferences</p>
			</div>

			<Button variant="destructive" size="sm" onclick={() => {}}>
				<Trash size={16} />
			</Button>
		</div>

		<Separator />

		<SettingsForm
			form={data.form}
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
