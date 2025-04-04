<script lang="ts">
	import { Button } from '../ui/button';
	import Trash from '@lucide/svelte/icons/trash';
	import ImagePlus from '@lucide/svelte/icons/image-plus';
	import { CloudinaryUploadWidget } from '../cloudinary';

	interface Props {
		disabled?: boolean;
		onChange?: (value: string) => void;
		onRemove?: (value: string) => void;
		value: string[];
	}

	let { disabled = false, onChange, onRemove, value }: Props = $props();
</script>

<div class="mb-4 flex items-center gap-4">
	{#each value as url}
		<div class="relative size-[200px] rounded-md overflow-hidden">
			<div class="z-10 absolute top-2 right-2">
				<Button type="button" onclick={() => {}} variant="destructive" size="icon">
					<Trash class="size-4" />
				</Button>

				<img class="object-cover" alt="Background billboard" src={url} />
			</div>
		</div>
	{/each}

	<CloudinaryUploadWidget uploadPreset="cens9rll">
		{#snippet children({ open })}
			<Button
				type="button"
				{disabled}
				variant="secondary"
				onclick={() => open()}
				class="cursor-pointer mt-2"
			>
				<ImagePlus class="size-4 mr-2" />
				Upload an image
			</Button>
		{/snippet}
	</CloudinaryUploadWidget>
</div>
