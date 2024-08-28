// Currency formatter

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
	currency: "USD",
	style: "currency",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export function formatCurrency(amount: number) {
	return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
	return NUMBER_FORMATTER.format(number);
}
