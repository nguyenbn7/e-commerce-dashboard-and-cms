<script lang="ts">
	import usePreviewModal from './hooks';
	import { Modal } from '$lib/components/ui';
	import { Gallery } from '$lib/components/gallery';
	import { Info } from '$lib/components/info';

	const { previewModalStore, onOpen: _, onClose } = usePreviewModal();
	const product = $derived($previewModalStore.data);
</script>

{#if product}
	<Modal open={$previewModalStore.isOpen} {onClose}>
		<div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
			<div class="sm:col-span-4 lg:col-span-5">
				<Gallery images={product.images} />
			</div>

			<div class="sm:col-span-8 lg:col-span-7">
				<Info data={product} />
			</div>
		</div>
	</Modal>
{/if}
