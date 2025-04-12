<script lang="ts">
	import { currencyFormatter } from '$lib';

	interface Props {
		value?: number | string;
	}

	let { value }: Props = $props();
</script>

<div class="font-semibold">
	{currencyFormatter.format(Number(value) / 100)}
</div>
