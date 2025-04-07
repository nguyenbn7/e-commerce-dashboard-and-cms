<script lang="ts">
	import type { Store } from '$features/stores/api/get-stores-query';
	import { UserButton } from 'svelte-clerk';
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
			<UserButton afterSignOutUrl="/" />
		</div>
	</div>
</div>
