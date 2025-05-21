<script lang="ts">
	import type { Snippet } from 'svelte';

	import X from '@lucide/svelte/icons/x';

	import { IconButton } from '$lib/components/ui';

	import { Dialog } from 'bits-ui';

	interface Props {
		open: boolean;
		onClose: () => void;
		children: Snippet;
		to?: string | DocumentFragment | HTMLElement | undefined;
	}

	let { open, onClose, children, to = undefined }: Props = $props();
</script>

<Dialog.Root {open} onOpenChange={onClose}>
	<Dialog.Portal {to}>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
		/>

		<Dialog.Content
			class="fixed inset-0 flex items-center p-5 text-center justify-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%]"
		>
			<div class="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
				<div
					class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:pt-6 lg:p-8"
				>
					<div class="absolute right-4 top-4">
						<IconButton onclick={onClose}>
							<X size={15} />
						</IconButton>
					</div>

					{@render children()}
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
