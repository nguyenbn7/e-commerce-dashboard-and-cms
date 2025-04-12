<script lang="ts">
	import { cn } from '$lib/utils';
	import { Tabs } from 'bits-ui';

	interface Props {
		key: string;
		image: Image;
	}

	let { key, image }: Props = $props();
</script>

<Tabs.Trigger
	value={key}
	class="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
>
	<div>
		<span
			class="absolute size-full aspect-square inset-0 overflow-hidden rounded-md flex justify-center items-center"
		>
			<img
				decoding="async"
				loading="lazy"
				src={image.url}
				alt=""
				class="object-cover object-center shrink-0 min-w-full min-h-full"
				width="100%"
				height="100%"
			/>
		</span>

		<span class={cn('absolute inset-0 rounded-md ring-2 ring-offset-2')}></span>
	</div>
</Tabs.Trigger>
