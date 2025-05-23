<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { confirm } from '$lib/components/confirm-dialog';
	import Trash from '@lucide/svelte/icons/trash';

	interface Props {
		onDelete: () => void;
		disabled?: boolean | null | undefined;
	}

	let { onDelete, disabled = undefined }: Props = $props();

	async function onClick(
		$event:
			| (MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
			| (MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement })
	) {
		$event.preventDefault();

		const ok = await confirm();

		if (ok) {
			return onDelete();
		}
	}
</script>

<Button variant="destructive" size="sm" onclick={onClick} {disabled}>
	<Trash size={16} />
</Button>
