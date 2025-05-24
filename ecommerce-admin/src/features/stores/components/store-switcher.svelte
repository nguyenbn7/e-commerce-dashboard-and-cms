<script lang="ts">
	import type { Store } from '$features/stores/api';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
		CommandSeparator
	} from '$lib/components/ui/command';
	import Check from '@lucide/svelte/icons/check';
	import StoreIcon from '@lucide/svelte/icons/store';
	import PlusCircle from '@lucide/svelte/icons/plus-circle';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';

	interface Props {
		class?: string | null;
		stores: Store[];
		handleClickCreateButton: () => void;
	}

	let { class: className, stores, handleClickCreateButton }: Props = $props();

	let storeOptions = $derived(
		stores.map((item) => ({
			label: item.name,
			value: item.id
		}))
	);

	let open = $state(false);

	let currentStore = $derived(
		storeOptions.find((items) => items.value === page.params.storeId)
	);

	const onStoreSelect = async (store: ArrayElement<typeof storeOptions>) => {
		open = false;
		await goto(`/${store.value}`, { invalidateAll: true });
	};
</script>

<Popover bind:open>
	<PopoverTrigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				size="sm"
				role="combobox"
				aria-expanded={open}
				aria-label="Select a store"
				class={cn('w-[200px] justify-between', className)}
			>
				<StoreIcon size={16} class="mr-2" />
				{currentStore?.label}
				<ChevronsUpDown size={16} class="ml-auto shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</PopoverTrigger>

	<PopoverContent class="w-[200px] p-0">
		<Command>
			<CommandList>
				<CommandInput placeholder="Search store..." />

				<CommandEmpty>No store found.</CommandEmpty>

				<CommandGroup heading="Stores">
					{#each storeOptions as store (store.value)}
						<CommandItem onSelect={() => onStoreSelect(store)} class="text-sm">
							<StoreIcon size={16} class="mr-2" />
							{store.label}
							<Check
								size={16}
								class={cn(
									'ml-auto',
									currentStore?.value === store.value ? 'opacity-100' : 'opacity-0'
								)}
							/>
						</CommandItem>
					{/each}
				</CommandGroup>
			</CommandList>

			<CommandSeparator />

			<CommandList>
				<CommandGroup>
					<CommandItem
						onSelect={() => {
							open = false;
							handleClickCreateButton();
						}}
					>
						<PlusCircle size={20} class="mr-2" />
						Create Store
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	</PopoverContent>
</Popover>
