<script lang="ts">
	import { Metadata } from '$lib/components/metadata';
	import type { PageData } from './$types';

	import { SignIn } from 'svelte-clerk';

	let { data }: { data: PageData } = $props();
</script>

<Metadata title="Sign In" />

<SignIn />
