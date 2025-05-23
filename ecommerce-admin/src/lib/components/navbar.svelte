<script lang="ts">
	import type { Store } from '$features/stores/api/get-stores-query';
	import Loader from '@lucide/svelte/icons/loader';
	import { ThemeToggle } from './button';
	import { ClerkLoaded, ClerkLoading, UserButton } from 'svelte-clerk';
	import MainNav from './main-nav.svelte';
	import { StoreSwitcher } from '$features/stores/components';

	interface Props {
		handleClickCreateButton: () => void;
		stores: Store[];
	}

	let { handleClickCreateButton, stores }: Props = $props();
</script>

<div class="border-b">
	<div class="flex h-16 items-center px-4">
		<StoreSwitcher {stores} {handleClickCreateButton} />

		<MainNav class="mx-6" />

		<div class="ml-auto flex items-center space-x-4">
			<ThemeToggle />

			<ClerkLoading>
				<Loader size={16} class="animate-spin" />
			</ClerkLoading>

			<ClerkLoaded>
				<UserButton afterSignOutUrl="/" />
			</ClerkLoaded>
		</div>
	</div>
</div>
