<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { confirm } from '$lib/components/confirm-dialog';
	import Edit from '@lucide/svelte/icons/edit';
	import Copy from '@lucide/svelte/icons/copy';
	import Trash from '@lucide/svelte/icons/trash';
	import MoreHorizontal from '@lucide/svelte/icons/more-horizontal';

	interface Props {
		updateHref: string;
		onCopy: () => MaybePromise<unknown | void>;
		onDelete: () => void;
	}

	let { updateHref, onCopy, onDelete }: Props = $props();
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

		<DropdownMenuItem onclick={() => onCopy()}>
			<Copy class="mr-2 size-4" />
			Copy Id
		</DropdownMenuItem>

		<DropdownMenuItem>
			{#snippet child({ props })}
				<a {...props} href={updateHref}>
					<Edit class="mr-2 size-4" />
					Update
				</a>
			{/snippet}
		</DropdownMenuItem>

		<DropdownMenuItem
			onclick={async () => {
				const ok = await confirm();

				if (ok) {
					onDelete();
				}
			}}
		>
			<Trash class="mr-2 size-4" />
			Delete
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
