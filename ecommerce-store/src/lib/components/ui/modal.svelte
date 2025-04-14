<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { IconButton } from '$lib/components/ui';
	import X from '@lucide/svelte/icons/x';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let open = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Overlay class="fixed inset-0 z-50 bg-black opacity-50" />

	<div class="fixed inset-0 overflow-y-auto">
		<div class="flex min-h-full items-center justify-center p-4 text-center ease-out">
			<Dialog.Content
				class="data-[state=open]:ease-out data-[state=open]:duration-300 data-[state=closed]:ease-in data-[state=closed]:duration-200 opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100"
			>
				<div class="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
					<div
						class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:pt-6 lg:p-8"
					>
						<div class="absolute right-4 top-4">
							<IconButton onclick={() => (open = false)}>
								<X size={15} />
							</IconButton>
						</div>

						{@render children()}
					</div>
				</div>
			</Dialog.Content>
		</div>
	</div>
</Dialog.Root>
