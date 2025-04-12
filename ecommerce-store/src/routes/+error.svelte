<script lang="ts">
	import { page } from '$app/state';
	import { Container } from '$lib/components/ui/container';
</script>

<svelte:head>
	<title>Error: {page.status}</title>
</svelte:head>

<Container>
	<div class="min-h-screen">
		<div class="space-y-10 pb-10">
			<h1 class="text-3xl font-semibold text-center mt-10">
				{page.status <= 499 ? page.error?.message : 'Something went wrong. Please try again.'}
			</h1>
		</div>
	</div>
</Container>
