export const formatPrice = (price) => {
	return Intl.NumberFormat("en-bd", {
		style: "currency",
		currency: "BDT",
		maximumFractionDigits: 0,
	}).format(price);
};
