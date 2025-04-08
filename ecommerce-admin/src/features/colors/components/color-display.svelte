<script lang="ts">
	interface Props {
		colorValue: string;
	}

	let { colorValue: value }: Props = $props();
</script>

<div class="flex items-center gap-x-2">
	{value}
	<div class="size-6 rounded-full border" style="background-color: {value};"></div>
</div>
