// place files you want to import through the `$lib` alias in this folder.
export function createCurrencyFormatter(
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
