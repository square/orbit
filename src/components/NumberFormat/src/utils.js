import { assert } from '@square/orbit/utils/debug';
import Cleave from 'cleave.js';
import locales from './locales.json';

function supportedLocales() {
	return Object.keys(locales);
}

function supportedCurrencies() {
	const currencies = Object.keys(locales['en-US']);
	currencies.splice(currencies.indexOf('number'), 1);
	currencies.splice(currencies.indexOf('currency'), 1);
	return currencies;
}

function createConfig(locale, currency) {
	const localeData = locales[locale];
	const config = {
		prefix: '',
		suffix: '',
		...localeData.number,
	};

	if (currency) {
		Object.assign(config, localeData.currency);
		Object.assign(config, localeData[currency]);
	}

	return config;
}

function formatterFromConfig(config) {
	return new Cleave.NumeralFormatter(
		config.numeralDecimalMark, // decimal mark
		0, // integer scale
		config.numeralDecimalScale, // decimal scale
		'thousand', // grouping style
		false, // positive only?
		true, // strip leading zeros
		config.delimiter, // group delimiter
	);
}

function formatValue(value, formatter, config) {
	let modifiedValue = value;
	let stringValue = '';

	// truncate fractional portion of number if locale
	// or currency has no fractional units
	if (!config.numeralDecimalScale) {
		modifiedValue = Math.trunc(modifiedValue);
	}

	// fill fractional units if this is a currency value
	if (config.prefix || config.suffix) {
		stringValue = modifiedValue.toFixed(config.numeralDecimalScale);
	} else {
		stringValue = modifiedValue.toString();
	}

	// change decimal mark if there is one, workaround for Cleave's bad API
	if (config.numeralDecimalScale) {
		stringValue = stringValue.replace(/\./g, config.numeralDecimalMark);
	} else {
		[stringValue] = stringValue.split('.');
	}

	let prefix = '';
	let suffix = '';
	if (config.prefix) {
		prefix = config.prefix + config.symbolDelimiter;
	}
	if (config.suffix) {
		suffix = config.symbolDelimiter + config.suffix;
	}

	return prefix + formatter.format(stringValue) + suffix;
}

function formatNumber(value, locale = 'en-US', currency) {
	// it's expected that the value could possibly be: undefined, null, or NaN
	if (value === undefined || value === null || Number.isNaN(value)) {
		return '';
	}

	// however the value should never be Infinity, -Infinity, or a non-Number
	const validValue = typeof value === 'number' && Number.isFinite(value);
	assert.error(
		validValue,
		'NumberFormat',
		`Values passed to NumberFormat.formatNumber must be finite numbers. You passed: ${value}.`,
	);

	const validLocale = !!locales[locale];
	assert.error(validLocale, 'NumberFormat', `${locale} locale is not supported.`);

	const validCurrency = !currency || !!locales['en-US'][currency];
	assert.error(validCurrency, 'NumberFormat', `${currency} currency is not supported.`);

	if (!validValue || !validLocale || !validCurrency) {
		return '';
	}

	const config = createConfig(locale, currency);
	const formatter = formatterFromConfig(config);
	const formattedValue = formatValue(value, formatter, config);
	return formattedValue;
}

export {
	supportedLocales,
	supportedCurrencies,
	createConfig,
	formatNumber,
};
