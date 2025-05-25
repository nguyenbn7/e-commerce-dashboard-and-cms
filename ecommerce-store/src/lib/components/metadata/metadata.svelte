<script lang="ts">
	interface Props {
		title: string;
		description?: string;
	}

	let { title, description = '' }: Props = $props();
</script>

<svelte:head>
	<title>{title || 'Store'}</title>
	<meta name="description" content={description || 'Store'} />
</svelte:head>
