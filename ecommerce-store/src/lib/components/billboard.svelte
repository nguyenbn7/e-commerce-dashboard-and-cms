<script lang="ts">
	interface Props {
		data: Billboard | null | undefined;
	}

	let { data }: Props = $props();
</script>

<div class="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
	<div
		class="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
		style={`background-image: url(${data?.imageUrl ?? '/placeholder.png'});`}
	>
		<div class="size-full flex flex-col justify-center items-center text-center gap-y-8">
			<div class="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
				{data?.label ?? 'No available store'}
			</div>
		</div>
	</div>
</div>
