# NumberFormat
NumberFormats allow users to input and edit localized numbers & currencies.

## Locales & Currencies

```vue
<template>
	<div class="demo">
		<o-select
			v-model="selectedLocale"
			:options="localeOptions"
			placeholder="Select a locale"
		/>
		<o-select
			v-model="selectedCurrency"
			:options="currencyOptions"
			placeholder="Select a currency"
		/>
		<o-number-format
			v-model="number"
			:locale="selectedLocale"
			:currency="selectedCurrency"
		/>
		<p>Raw number value: {{ number }}</p>
		<p>Formatted string value: {{ formattedNumber }}</p>
	</div>
</template>

<script>
import { ONumberFormat } from '@square/orbit/components/NumberFormat';
import { OSelect } from '@square/orbit/components/Select';

export default {
	components: {
		ONumberFormat,
		OSelect,
	},
	data() {
		const locales = ONumberFormat.supportedLocales();
		const localeOptions = locales.map((locale) => ({ value: locale, label: locale }));
		const currencies = ONumberFormat.supportedCurrencies();
		const currencyOptions = currencies.map((currency) => ({ value: currency, label: currency }));
		currencyOptions.unshift({ value: undefined, label: 'none' });
		return {
			number: 1234.56,
			localeOptions,
			currencyOptions,
			selectedLocale: 'en-US',
			selectedCurrency: undefined,
		};
	},
	computed: {
		formattedNumber() {
			return ONumberFormat.formatNumber(this.number, this.selectedLocale, this.selectedCurrency);
		},
	},
};
</script>

<style scoped>
.demo {
	width: 50%;
	min-width: 400px;
}
div > div {
	margin-bottom: 20px;
}
</style>
```


## Validation on Blur

```vue
<template>
	<div class="demo">
		<p>Positive only:</p>
		<o-number-format
			v-model="number1"
			currency="USD"
			@blur="positiveOnlyBlur"
		/>
		<p>Raw number value: {{ number1 }}</p>
		<p>Formatted string value: {{ formattedNumber1 }}</p>

		<br>

		<p>Less than 10,000:</p>
		<o-number-format
			v-model="number2"
			currency="USD"
			@blur="tenGrandMaxBlur"
		/>
		<p>Raw number value: {{ number2 }}</p>
		<p>Formatted string value: {{ formattedNumber2 }}</p>
	</div>
</template>

<script>
import { ONumberFormat } from '@square/orbit/components/NumberFormat';

export default {
	components: {
		ONumberFormat,
	},
	data() {
		return {
			number1: 1234.56,
			number2: 1234.56,
		};
	},
	computed: {
		formattedNumber1() {
			return ONumberFormat.formatNumber(this.number1, 'en-US', 'USD');
		},
		formattedNumber2() {
			return ONumberFormat.formatNumber(this.number2, 'en-US', 'USD');
		},
	},
	methods: {
		positiveOnlyBlur() {
			if (this.number1 < 0) {
				this.number1 = Math.abs(this.number1);
			}
		},
		tenGrandMaxBlur() {
			if (this.number2 > 10000) {
				this.number2 = 10000;
			}
		},
	},
};
</script>

<style scoped>
.demo {
	width: 50%;
	min-width: 400px;
}
div > div {
	margin-bottom: 20px;
}
</style>
```

## Validation and Errors
Use the `o-form-item` component for validation and errors. See the docs for that [here](/components/Form).

## Attributes

| Name          | Type                                                                                                                                                                                      | Default  | Description                                                                        |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------|
| `placeholder` | `String`                                                                                                                                                                                  | -        | Placeholder text for the input                                                    |
| `size`        | `String`<br>`small`, `medium`                                                                                                                                                             | `medium` | Size of the input text                                                            |
| `align`       | `String`<br>`left`, `right`                                                                                                                                                               | `left`   | Aligns text inside input                                                          |
| `value`<br>(v-model)       | `Number`                                                                                                                                                                                  | -        | Value of the input text                                                           |
| `locale`      | `String`              | `en-US`  | Locale to use for formatting number in input.<br>Supported locales: `da-DK`, `de-DE`, `en-AU`, `en-CA`, `en-GB`, `en-US`, `es-ES`, `fi-FI`, `fr-CA`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `nl-NL`, `nb-NO`, `pl-PL`, `pt-PT`, `ru-RU`, `sv-SE`, `tr-TR`, `zh-TW`, `zh-CN`                                      |
| `currency`    | `String` | -        | Three-letter currency code, which currency the number inside the input represents.<br>Supported currencies: `USD`, `EUR`, `GBP`, `JPY`, `AUD`, `CAD`, `NZD`, `CHF`, `HKD`, `SGD`, `SEK`, `DKK`, `PLN`, `NOK`, `HUF`, `CZK`, `ILS`, `MXN`, `MYR`, `BRL`, `PHP`, `RUB`, `THB`, `TRY`, `TWD` |

## Events

| Name           | Arguments  | Triggers when...                         |
|----------------|------------|------------------------------------------|
| `input:update` | `newValue` | User changes the value within the input |

## Methods

| Name | Description |
|------|-------------|
| `focus()` | Focuses input |
| `blur()` | Blurs input |

## Static Methods

| Name                                                                        | Returns                                                         |
|-----------------------------------------------------------------------------|-----------------------------------------------------------------|
| `supportedLocales()`                                                        | `String[]` - list of supported locales                          |
| `supportedCurrencies()`                                                     | `String[]` - list of supported currencies                       |
| `formatNumber(number: Number, locale: String = 'en-US', currency: String?)` | `String` - number as formatted string given locale (& currency) |
