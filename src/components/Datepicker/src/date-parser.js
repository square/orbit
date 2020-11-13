import { getLocalDateParts } from './localize-date';

const wordPtrn = /[a-z]+/ig;
const numberPtrn = /\d+/g;
const isoPtrn = /^(\d{2}|\d{4})-(\d{0,2})-(\d{0,2})$/; // YY-MM-DD or YYYY-MM-DD
const shortYearPtrn = /^\d{2}$/;
const englishMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const canBeDate = (n) => n > 0 && n <= 31;
const canBeMonth = (n) => n > 0 && n <= 12;
const canBeYear = (n) => n >= 1900 && n <= 2120;
const canBeShortYear = (n) => shortYearPtrn.test(n);
const resolveShortYear = (yy) => +yy + (yy < 50 ? 2000 : 1900);

const isIso = (isoStr) => {
	const iso = isoPtrn.exec(isoStr);
	if (iso) {
		const [,, month, date] = iso;
		let [, year] = iso;

		if (year < 100) {
			year = resolveShortYear(year);
		}

		if (canBeYear(year) && canBeMonth(month) && canBeDate(date)) {
			return { year, month, date };
		}
	}
	return null;
};

const setDate = (state, date) => {
	if (!state.date && canBeDate(date)) {
		state.date = date;
		return true;
	}
	return false;
};

const setMonth = (state, month) => {
	if (!state.month && canBeMonth(month)) {
		state.month = month;
		return true;
	}
	return false;
};

const setYear = (state, year) => {
	if (!state.year) {
		if (year < 100) {
			year = resolveShortYear(year);
		}

		if (canBeYear(year)) {
			state.year = year;
			return true;
		}
	}
	return false;
};

const parseDate = (state, baseDate) => {
	const { year } = state;
	let { month, date } = state;

	if (!date && month) {
		date = 1;
	}

	if (!month && date) {
		month = 1;
	}

	const retDate = new Date(baseDate);

	if (month) {
		retDate.setMonth(month - 1);
	}
	if (date) {
		retDate.setDate(date);
	}
	if (year) {
		retDate.setFullYear(year);
	} else if (retDate < baseDate) {
		retDate.setFullYear(retDate.getFullYear() + 1);
	}

	return retDate;
};

const dateSetters = {
	day: setDate,
	month: setMonth,
	year: setYear,
};

function dateParser(dateStr, baseDate = new Date(), locale) {
	if (!dateStr) {
		return '';
	}

	const parseState = {
		year: undefined,
		month: undefined,
		date: undefined,
	};

	// If ISO, skip parsing
	const iso = isIso(dateStr);
	if (iso) {
		Object.assign(parseState, iso);
	} else {
		// Parse month
		const words = dateStr.match(wordPtrn);
		if (words) {
			words.some((w) => {
				const word = w.toLowerCase();
				const monthIdx = englishMonths.findIndex((m) => m.startsWith(word));
				if (monthIdx > -1) {
					return setMonth(parseState, monthIdx + 1);
				}
				return false;
			});
		}

		const numbers = dateStr.match(numberPtrn);
		if (numbers) {
			const hasYear = numbers.findIndex(canBeYear);
			if (hasYear > -1) {
				const [year] = numbers.splice(hasYear, 1);
				setYear(parseState, year);
			}

			const hasDate = numbers.filter((n) => (
				canBeDate(n)
				&& !canBeMonth(n)
				&& (parseState.year || !canBeShortYear(n))
			));

			if (hasDate.length === 1) {
				const [date] = hasDate;
				numbers.splice(numbers.indexOf(date), 1);
				setDate(parseState, date);
			}

			const { parts } = getLocalDateParts(locale);
			numbers.forEach((n) => {
				parts.some((part) => dateSetters[part](parseState, n));
			});
		}
	}

	return parseDate(parseState, baseDate);
}

export default dateParser;
