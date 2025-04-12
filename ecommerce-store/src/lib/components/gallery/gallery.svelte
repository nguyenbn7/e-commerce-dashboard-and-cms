<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { GalleryTab } from '$lib/components/gallery';

	interface Props {
		images: Image[];
	}

	let { images }: Props = $props();
</script>

<Tabs.Root class="flex flex-col-reverse" value={images.at(0)?.id}>
	<div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
		<Tabs.List class="grid grid-cols-4 gap-6">
			{#each images as image (image.id)}
				<GalleryTab key={image.id} {image} />
			{/each}
		</Tabs.List>
	</div>

	{#each images as image}
		<Tabs.Content value={image.id}>
			<!-- https://stackoverflow.com/questions/14142378/how-can-i-fill-a-div-with-an-image-while-keeping-it-proportional -->
			<div
				class="aspect-square relative size-full sm:rounded-lg overflow-hidden flex items-center justify-center"
			>
				<img
					src={image.url}
					decoding="async"
					loading="lazy"
					width="100%"
					height="100%"
					alt="Product"
					class="object-cover object-center shrink-0 min-w-full min-h-full"
				/>
			</div>
		</Tabs.Content>
	{/each}
</Tabs.Root>
