<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { createQuery } from '@tanstack/svelte-query';
	import { Container } from '$lib/components/ui/container';
	import MainNav from '$lib/components/main-nav.svelte';
	import NavbarActions from '$lib/components/navbar-actions.svelte';

	const getCategories = createQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const url = `${PUBLIC_API_URL}/categories`;

			const response = await fetch(url);

			return response.json() as Promise<{ categories: Category[] }>;
		}
	});
</script>

<div class="border-b">
	<Container>
		<div class="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
			<a href="/" class="ml-4 flex lg:ml-0 gap-x-2">
				<p class="font-bold text-xl">STORE</p>
			</a>

			<MainNav data={$getCategories.data?.categories ?? []} />

			<NavbarActions />
		</div>
	</Container>
</div>
