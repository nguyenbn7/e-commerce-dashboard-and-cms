<script lang="ts">
	import type { PageData } from './$types';

	import { Metadata } from '$lib/components/metadata';

	import { dark } from '@clerk/themes';
	import { mode } from 'mode-watcher';

	import { SignUp } from 'svelte-clerk';

	const { data }: { data: PageData } = $props();
</script>

<Metadata title="Sign Up" />

<SignUp appearance={{ baseTheme: mode.current === 'dark' ? dark : undefined }} />
