/* eslint-disable */

const path = require('path');
const fs = require('fs');

/*
 * Don't waste your time thinking about this script too hard, it's only purpose is to generate locales.json,
 * the code in here is not suppose to be pretty and it won't get packaged in Orbit's release in any way.
 * I expect we'll need to run it MAYBE 2-3 times a year, depending on:
 * 1) Adding new locales or currencies
 * 2) Updating data for existing locales & currency
 * 3) Removing existing locales or currencies
 * 4) Adding features to NumberFormat which requires changes to how the data in locales.json is laid out
 */

/*
 * CONSTANTS
 */

const LOCALES_FILE = 'locales.json';
const VERSON_FILE = '.nvmrc';
const NUMBER = 123456789.123456789;

const LOCALES = Object.freeze([
	'da-DK',
	'de-DE',
	'en-AU',
	'en-CA',
	'en-GB',
	'en-US',
	'es-ES',
	'fi-FI',
	'fr-FR',
	'it-IT',
	'ja-JP',
	'ko-KR',
	'nl-NL',
	'nb-NO',
	'pl-PL',
	'pt-PT',
	'ru-RU',
	'sv-SE',
	'tr-TR',
	'zh-TW',
	'zh-CN',
]);

const CURRENCIES = Object.freeze([
	'USD',
	'EUR',
	'GBP',
	'JPY',
	'AUD',
	'CAD',
	'NZD',
	'CHF',
	'HKD',
	'SGD',
	'SEK',
	'DKK',
	'PLN',
	'NOK',
	'HUF',
	'CZK',
	'ILS',
	'MXN',
	'MYR',
	'BRL',
	'PHP',
	'RUB',
	'THB',
	'TRY',
	'TWD',
]);

/*
 * MAIN SCRIPT LOGIC
 */

 // checks that node version is recent
checkMinimumVersion();
// checks that locale data is installed with node
checkLocalesDataPresent();
// deletes previous locales file
deleteLocalesFile();
// writes new updated locales file
writeLocalesFile(generateLocalesObj());

/*
 * HELPER FUNCTIONS
 */

function versionStringToArray(versionString) {
	return versionString.split(/[v\.]/g).filter(value => !!value).map(intString => parseInt(intString, 10));
}

// checks that the version of node running is _at least_ what is in the local .nvmrc file
function checkMinimumVersion() {
	let nodeVersion = versionStringToArray(process.version);
	let minimumVersion = versionStringToArray(fs.readFileSync(VERSON_FILE, 'utf8'));
	for (let i = 0; i < minimumVersion.length; i++) {
		if (minimumVersion[i] > nodeVersion[i]) {
			// https://github.com/creationix/nvm/issues/1719
			console.error(`Run \`nvm install -s $(cat .nvmrc) --with-intl=full-icu --download=all\` from ${__dirname} to build node with all locale data.`);
			console.error('The above command will compile node from source, it\'ll take a while, about ~10 minutes.');
			// https://github.com/ljharb/nvm/commit/3fc7b737f59b1c81a582f9006e5610bdc41d0ebe
			console.error('If the command fails for a strange reason and you\'re using zsh run `setopt shwordsplit` and then try again.');
			console.error(`If you have done all the above already just run \`nvm use\` from ${__dirname} to use the latest node with the latest locale data.`);
			process.exit(1);
		}
		if (nodeVersion[i] > minimumVersion[i]) {
			break;
		}
	}
}

// checks that the running node instance has locale data aside from en-US (which is all that comes packaged with node by default)
function checkLocalesDataPresent() {
	// should return "enero", i.e. "january" in spanish, if locale data is present
	// otherwise it returns "January" which is WRONG
	let enero = new Intl.DateTimeFormat('es', { month:'long' }).format(new Date(9E8));
	if (enero !== 'enero') {
		console.error('You\'re using a recent version of node but you do not have any locale data installed!');
		console.error(`Run \`nvm uninstall $(cat .nvmrc)\` from ${__dirname} to first uninstall the version of node.`);
		console.error(`Then run \`nvm install -s $(cat .nvmrc) --with-intl=full-icu --download=all\` from ${__dirname} to build the node version with all locale data.`);
		console.error('The above command will compile node from source, it\'ll take a while, about ~10 minutes.');
		console.error('If the command fails for a strange reason and you\'re using zsh run `setopt shwordsplit` and then try again.');
		console.error(`Once you've done all the above you'll be able to simply run \`nvm use\` from ${__dirname} to use the latest node with all locale data in the future.`);
		process.exit(1);
	}
}

// deletes locales file
function deleteLocalesFile() {
	if (fs.existsSync(LOCALES_FILE)) {
		fs.unlinkSync(LOCALES_FILE);
	}
}

// writes data to locales file
function writeLocalesFile(data) {
	fs.appendFileSync(LOCALES_FILE, JSON.stringify(data, null, 2));
	console.log(data);
	console.log(`data written to ${path.resolve(__dirname, LOCALES_FILE)}`);
}

// returns raw locale number data
function getLocaleNumberData(locale) {
	// console.log(locale);
	return new Intl.NumberFormat(locale).formatToParts(NUMBER);
}

// returns raw locale currency data
function getLocaleCurrencyData(locale, currency) {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		currencyDisplay: 'symbol',
	}).formatToParts(NUMBER);
}

// generates the "number" config part of the locales file
function generateLocaleNumberObj(localeNumberData) {
	let numberObj = {};
	numberObj.delimiter = localeNumberData.find(datum => datum.type === 'group').value;
	numberObj.numeralDecimalMark = localeNumberData.find(datum => datum.type === 'decimal').value;
	numberObj.numeralDecimalScale = 4; // by default allow up to 4 decimal places in numbers
	console.log('number data\n', localeNumberData, '\n', numberObj);
	return numberObj;
}

// generates the "currency" config part of the locales file
function generateLocaleCurrencyObj(localeCurrencyData) {
	let currencyObj = {};
	let symbolDatum = localeCurrencyData.find(datum => datum.type === 'currency');
	let symbolIndex = localeCurrencyData.indexOf(symbolDatum);
	let isPrefixSymbol = symbolIndex === 0;
	currencyObj.align = isPrefixSymbol ? 'left' : 'right';
	let fractionDatum = localeCurrencyData.find(datum => datum.type === 'fraction');
	if (fractionDatum) {
		currencyObj.numeralDecimalScale = fractionDatum.value.length;
	} else {
		currencyObj.numeralDecimalScale = 0;
	}
	if (isPrefixSymbol) {
		let afterSymbolDatum = localeCurrencyData[symbolIndex+1];
		let literalDatum = afterSymbolDatum.type === 'literal' ? afterSymbolDatum : null;
		currencyObj.symbolDelimiter = literalDatum ? literalDatum.value : '';
	} else {
		let beforeSymbolDatum = localeCurrencyData[symbolIndex-1];
		let literalDatum = beforeSymbolDatum.type === 'literal' ? beforeSymbolDatum : null;
		currencyObj.symbolDelimiter = literalDatum ? literalDatum.value : '';
	}
	// console.log('general currency data\n', localeCurrencyData, '\n', currencyObj);
	return currencyObj;
}

// generates the "USD", "EUR", "JPY", etc parts of the locales file
function generateLocaleSpecificCurrencyObj(generalLocaleCurrencyData, specificLocaleCurrencyData) {
	let currencyObj = {};
	let symbolDatum = specificLocaleCurrencyData.find(datum => datum.type === 'currency');
	let symbol = symbolDatum.value;
	let symbolIndex = specificLocaleCurrencyData.indexOf(symbolDatum);
	let isPrefixSymbol = symbolIndex === 0;
	currencyObj.align = isPrefixSymbol ? 'left' : 'right';
	let fractionDatum = specificLocaleCurrencyData.find(datum => datum.type === 'fraction');
	if (fractionDatum) {
		currencyObj.numeralDecimalScale = fractionDatum.value.length;
	} else {
		currencyObj.numeralDecimalScale = 0;
	}
	if (isPrefixSymbol) {
		let afterSymbolDatum = specificLocaleCurrencyData[symbolIndex+1];
		let literalDatum = afterSymbolDatum.type === 'literal' ? afterSymbolDatum : null;
		currencyObj.symbolDelimiter = literalDatum ? literalDatum.value : '';
	} else {
		let beforeSymbolDatum = specificLocaleCurrencyData[symbolIndex-1];
		let literalDatum = beforeSymbolDatum.type === 'literal' ? beforeSymbolDatum : null;
		currencyObj.symbolDelimiter = literalDatum ? literalDatum.value : '';
	}
	if (isPrefixSymbol) {
		currencyObj.prefix = symbol;
	} else {
		currencyObj.suffix = symbol;
	}
	for (let [key, value] of Object.entries(generalLocaleCurrencyData)) {
		if (currencyObj[key] === value) {
			delete currencyObj[key];
		}
	}
	// console.log('specific currency data\n', specificLocaleCurrencyData, '\n', currencyObj);
	return currencyObj;
}

// generates the "en-US", "de-DE", "es-ES", etc parts of the locales file
function generateLocaleObj(locale) {
	let localeObj = {};
	let localeNumberData = getLocaleNumberData(locale);
	let localeCurrencyData = getLocaleCurrencyData(locale, CURRENCIES[0]);
	localeObj.number = generateLocaleNumberObj(localeNumberData);
	localeObj.currency = generateLocaleCurrencyObj(localeCurrencyData);
	for (let currency of CURRENCIES) {
		localeObj[currency] = generateLocaleSpecificCurrencyObj(localeObj.currency, getLocaleCurrencyData(locale, currency));
	}
	return localeObj;
}

// generates the entire locales file
function generateLocalesObj() {
	let localesObj = {};
	for (let locale of LOCALES) {
		localesObj[locale] = generateLocaleObj(locale);
	}
	return localesObj;
}
