<script lang="ts">
	import type { PageData } from './$types';

	import { PUBLIC_DEMO_ACCOUNT, PUBLIC_DEMO_ACCOUNT_CODE } from '$env/static/public';

	import { Metadata } from '$lib/components/metadata';

	import { SignIn, useClerkContext } from 'svelte-clerk';
	import { page } from '$app/state';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';

	import { dark } from '@clerk/themes';
	import { mode } from 'mode-watcher';

	const { data }: { data: PageData } = $props();

	let demoAccountOTP: string | undefined = $state();

	$effect(() => {
		const { hash } = page.url;
		let oneTimeCode: string | undefined = hash;

		if (demoAccountOTP && !oneTimeCode) {
			demoAccountOTP = undefined;
			return;
		}

		if (PUBLIC_DEMO_ACCOUNT && oneTimeCode === '#/factor-one') {
			const clerkContext = useClerkContext();

			if (clerkContext.client?.signIn.identifier === PUBLIC_DEMO_ACCOUNT) {
				demoAccountOTP = PUBLIC_DEMO_ACCOUNT_CODE;
			}

			oneTimeCode = undefined;

			return;
		}
	});
</script>

<Metadata title="Sign In" />

{#if demoAccountOTP}
	<Alert variant="success" class="fixed top-0 left-0 w-full">
		<AlertTitle>Verification code: {demoAccountOTP}</AlertTitle>
	</Alert>
{/if}

<SignIn
	initialValues={{ emailAddress: PUBLIC_DEMO_ACCOUNT }}
	appearance={{ baseTheme: mode.current === 'dark' ? dark : undefined }}
/>
