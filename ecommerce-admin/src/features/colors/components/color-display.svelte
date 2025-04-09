<script lang="ts">
	interface Props {
		colorValue: string;
		colorOnly?: boolean;
	}

	let { colorValue: value, colorOnly = false }: Props = $props();
</script>

{#if colorOnly}
	<div class="size-6 rounded-full border border-gray-400" style="background-color: {value};"></div>
{:else}
	<div class="flex items-center gap-x-2">
		{value}
		<div class="size-6 rounded-full border" style="background-color: {value};"></div>
	</div>
{/if}
