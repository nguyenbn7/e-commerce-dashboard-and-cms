<script lang="ts">
	import type { Category } from '../columns';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { confirmFromDialog } from '$lib/components/confirm-dialog';
	import { useDeleteCategory, type UseDeleteCategoryOptions } from '../api/use-delete-category';
	import Edit from '@lucide/svelte/icons/edit';
	import Copy from '@lucide/svelte/icons/copy';
	import Trash from '@lucide/svelte/icons/trash';
	import MoreHorizontal from '@lucide/svelte/icons/more-horizontal';

	interface Props {
		data: Category;
	}

	let { data, onSuccess, onError }: Props & UseDeleteCategoryOptions = $props();

	const deleteCategory = useDeleteCategory({ onSuccess, onError });

	async function onCopy(id: number) {
		await navigator.clipboard.writeText(id.toString());
		toast.success('Category Id copied to the clipboard');
	}
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" class="size-8 p-0">
				<span class="sr-only">Open menu</span>
				<MoreHorizontal class="size-4" />
			</Button>
		{/snippet}
	</DropdownMenuTrigger>

	<DropdownMenuContent align="end">
		<DropdownMenuLabel>Actions</DropdownMenuLabel>

		<DropdownMenuItem onclick={() => onCopy(data.id)}>
			<Copy class="mr-2 size-4" />
			Copy Id
		</DropdownMenuItem>

		<DropdownMenuItem>
			{#snippet child({ props })}
				<a {...props} href={`/${page.params.storeId}/categories/${data.id}`}>
					<Edit class="mr-2 size-4" />
					Update
				</a>
			{/snippet}
		</DropdownMenuItem>

		<DropdownMenuItem
			onclick={async () => {
				const ok = await confirmFromDialog({
					title: 'Are you sure?',
					description: 'This action cannot be undone.'
				});

				if (ok) {
					$deleteCategory.mutate({
						param: {
							storeId: page.params.storeId,
							categoryId: data.id.toString()
						}
					});
				}
			}}
		>
			<Trash class="mr-2 size-4" />
			Delete
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
