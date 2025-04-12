<script lang="ts">
	import { Container } from '$lib/components/ui/container';
	import MainNav from '$lib/components/main-nav.svelte';
	import NavbarActions from '$lib/components/navbar-actions.svelte';
	import { createGetCategoriesQuery } from '$features/categories/api/query';

	const getCategories = createGetCategoriesQuery();
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
