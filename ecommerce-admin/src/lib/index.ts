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

function _delay(minSeconds: number, maxSeconds: number) {
	const min = Math.ceil(minSeconds * 1000);
	const max = Math.floor(maxSeconds * 1000);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function delay(minSeconds: number, maxSeconds: number): Promise<void> {
	return new Promise((fullfill) => setTimeout(fullfill, _delay(minSeconds, maxSeconds)));
}
