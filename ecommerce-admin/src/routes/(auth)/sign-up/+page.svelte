<script lang="ts">
	import type { PageData } from './$types';

	import Loader from '@lucide/svelte/icons/loader-circle';

	import { Metadata } from '$lib/components/metadata';

	import { ClerkLoaded, ClerkLoading, SignUp } from 'svelte-clerk';

	import { dark } from '@clerk/themes';
	import { mode } from 'mode-watcher';

	const { data }: { data: PageData } = $props();
</script>

<Metadata title="Sign Up" />

<ClerkLoading>
	<Loader size={16} class="size-28 animate-spin ml-1" />
</ClerkLoading>

<ClerkLoaded>
	<SignUp appearance={{ baseTheme: mode.current === 'dark' ? dark : undefined }} />
</ClerkLoaded>
