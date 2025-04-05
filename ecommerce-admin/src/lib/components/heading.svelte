<script lang="ts">
	interface Props {
		title: string;
		class?: string;
		description?: string;
	}

	let { class: className, title, description }: Props = $props();
</script>

<div class={className}>
	<h2 class="text-3xl font-bold tracking-tight">{title}</h2>
	{#if description}
		<p class="text-sm text-muted-foreground">{description}</p>
	{/if}
</div>
