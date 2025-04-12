<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Dialog } from 'bits-ui';
	import { IconButton } from '$lib/components/ui';
	import { Filter } from '$features/categories/components';
	import Plus from '@lucide/svelte/icons/plus';
	import X from '@lucide/svelte/icons/x';

	interface Props {
		sizes: Size[];
		colors: Color[];
	}

	let { sizes, colors }: Props = $props();

	let open = $state(false);
</script>

<Button class="flex items-center gap-x-2 lg:hidden" onclick={() => (open = true)}>
	Filters
	<Plus size={20} />
</Button>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Content>
			<Dialog.Overlay class="fixed inset-0 bg-black opacity-25" />

			<Dialog.Content class="fixed inset-0 z-40 flex">
				<div
					class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
				>
					<div class="flex items-center justify-end px-4">
						<Dialog.Close>
							{#snippet child({ props })}
								<IconButton {...props}>
									<X size={15} />
								</IconButton>
							{/snippet}
						</Dialog.Close>
					</div>

					<div class="p-4">
						<Filter valueKey="sizeId" name="Sizes" data={sizes} />

						<Filter valueKey="colorId" name="Colors" data={colors} />
					</div>
				</div>
			</Dialog.Content>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
