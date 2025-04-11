<script lang="ts">
	function createCurrencyFormatter(
		locales: Intl.LocalesArgument = 'en-US',
		options: Intl.NumberFormatOptions = {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 2,
			minimumFractionDigits: 2
		}
	) {
		return new Intl.NumberFormat(locales, options);
	}

	export const currencyFormatter = createCurrencyFormatter();

	interface Props {
		value?: number | string;
	}

	let { value }: Props = $props();
</script>

<div class="font-semibold">
	{currencyFormatter.format(Number(value) / 100)}
</div>
