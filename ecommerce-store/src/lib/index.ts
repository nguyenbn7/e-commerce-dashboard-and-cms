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

export const throwHttpError = async (response: Response) => {
	const data = (await response.json()) as ResponseError;
	const error = new Error(data.error.message) as HttpError;
	error.status = response.status;
	throw error;
};
