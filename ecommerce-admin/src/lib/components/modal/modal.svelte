<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle
	} from '../ui/dialog';

	interface Props {
		title: string;
		description: string;
		open: boolean;
		children?: Snippet;
	}

	let { title, description, open = $bindable(), children }: Props = $props();
</script>

<Dialog bind:open>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
			<DialogDescription>{description}</DialogDescription>
		</DialogHeader>

		<div>{@render children?.()}</div>
	</DialogContent>
</Dialog>
