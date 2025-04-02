<script lang="ts">
	import { Metadata } from '$lib/components/metadata';
	import type { PageData } from './$types';

	import { SignUp } from 'svelte-clerk';

	let { data }: { data: PageData } = $props();
</script>

<Metadata title="Sign Up" />

<SignUp />
