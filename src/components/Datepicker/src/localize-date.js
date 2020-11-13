import uniq from 'lodash/uniq';
import memoize from 'lodash/memoize';

export const getLocalDateParts = memoize((locale) => {
	let parts;
	let delimiter;

	try {
		const dateParts = (new Intl.DateTimeFormat(locale, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})).formatToParts(new Date());

		parts = dateParts.map((p) => p.type).filter((t) => ['year', 'month', 'day'].includes(t));

		const delimiters = dateParts.filter((p) => p.type === 'literal').map((p) => p.value);
		const hasIllegalChar = delimiters.some((d) => Array.from(d).some((c) => c.charCodeAt(0) > 50));
		delimiter = (hasIllegalChar || uniq(delimiters).length > 1) ? '/' : delimiters[0];
	} catch (e) {} // eslint-disable-line no-empty

	return { parts, delimiter };
});

export function localizeDate(date, locale) {
	const {
		parts = ['month', 'day', 'year'],
		delimiter = '/',
	} = getLocalDateParts(locale);

	const dateData = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	};

	return parts.map((t) => dateData[t]).join(delimiter);
}
