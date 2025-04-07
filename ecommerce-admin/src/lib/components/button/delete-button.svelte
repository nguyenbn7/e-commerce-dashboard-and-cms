<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { confirmFromDialog } from '$lib/components/confirm-dialog';
	import Trash from '@lucide/svelte/icons/trash';

	interface Props {
		onDelete: () => void;
	}

	let { onDelete }: Props = $props();

	async function onClick(
		$event:
			| (MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
			| (MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement })
	) {
		$event.preventDefault();

		const ok = await confirmFromDialog();

		if (ok) {
			return onDelete();
		}
	}
</script>

<Button variant="destructive" size="sm" onclick={onClick}>
	<Trash size={16} />
</Button>
