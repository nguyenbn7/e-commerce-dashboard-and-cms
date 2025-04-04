<script lang="ts">
	import type { CloudinaryUploadWidgetResults } from '@cloudinary-util/types';
	import type { CloudinaryUploadEventCallbackWidget } from '../cloudinary/cloudinary-upload-widget';
	import { CloudinaryUploadWidget } from '../cloudinary';
	import { Button } from '../ui/button';
	import Trash from '@lucide/svelte/icons/trash';
	import ImagePlus from '@lucide/svelte/icons/image-plus';

	interface Props {
		class?: string;
		disabled?: boolean;
		onChange?: (value: string) => void;
		onRemove?: (value: string) => void;
		value: string[];
	}

	let {
		disabled = false,
		onChange,
		onRemove,
		value,
		class: className,
		...restProps
	}: Props & { [x: string]: unknown } = $props();

	function onSuccess(
		results: CloudinaryUploadWidgetResults,
		widget: CloudinaryUploadEventCallbackWidget
	) {
		const result = results.info as unknown as { secure_url: string };
		onChange?.(result.secure_url);
	}
</script>

<div class={className} {...restProps}>
	<div class="mb-4 flex items-center gap-4">
		{#each value as url}
			<div class="relative size-[200px] rounded-md overflow-hidden">
				<div class="z-10 absolute top-2 right-2">
					<Button
						type="button"
						onclick={() => onRemove?.(url)}
						variant="destructive"
						size="icon"
						class="cursor-pointer"
					>
						<Trash class="size-4" />
					</Button>
				</div>

				<img
					class="object-cover min-h-full min-w-full w-auto h-auto"
					alt="Background billboard"
					src={url}
				/>
			</div>
		{/each}
	</div>

	<CloudinaryUploadWidget {onSuccess}>
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
