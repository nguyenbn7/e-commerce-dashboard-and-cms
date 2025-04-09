// place files you want to import through the `$lib` alias in this folder.

// function getOrigin() {
// 	return typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
// }

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
