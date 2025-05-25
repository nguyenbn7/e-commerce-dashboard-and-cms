<script lang="ts">
	import { Container } from '$lib/components/ui/container';

	import MainNav from '$lib/components/main-nav.svelte';
	import NavbarActions from '$lib/components/navbar-actions.svelte';

	import { getCategories as getCategoriesApi } from '$features/categories/api/client/get-categories';

	interface Props {
		shopName: string;
	}

	let { shopName }: Props = $props();

	const getCategoriesClient = getCategoriesApi();
</script>

<div class="border-b">
	<Container>
		<div class="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
			<a href="/" class="ml-4 flex lg:ml-0 gap-x-2">
				<p class="font-bold text-xl uppercase">{shopName || 'Store'}</p>
			</a>

			<MainNav data={$getCategoriesClient.data?.categories ?? []} />

			<NavbarActions />
		</div>
	</Container>
</div>
