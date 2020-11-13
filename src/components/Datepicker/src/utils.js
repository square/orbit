export const validateIsoDate = (str) => !str || /^\d{4}-\d{2}-\d{2}$/.test(str); // ISO format YYYY-MM-DD

export const date2Iso = (d) => (
	[
		d.getFullYear(),
		(d.getMonth() + 1),
		d.getDate(),
	]
	.map((n, i) => n.toString().padStart(i ? 2 : 4, '0'))
	.join('-')
);

export const iso2Date = (str) => {
	if (!str || !validateIsoDate(str)) {
		return undefined;
	}
	const [year, month, date] = str.split('-');
	const parsed = new Date();
	parsed.setFullYear(year, month - 1, date);

	if (Number.isNaN(parsed.getTime())) {
		return undefined;
	}
	return parsed;
};
