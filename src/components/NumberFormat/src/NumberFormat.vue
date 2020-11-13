<template>
	<o-input
		ref="oinput"
		:allow-rerender="false"
		v-bind="inputProps"
		v-on="inputListeners"
	/>
</template>

<script>
import { assert } from '@square/orbit/utils/debug';
import { OInput } from '@square/orbit/components/Input';
import Cleave from 'cleave.js';
import locales from './locales.json';
import {
	supportedLocales,
	supportedCurrencies,
	formatNumber,
	createConfig,
} from './utils';

export default {
	name: 'NumberFormat',

	components: {
		OInput,
	},

	inheritAttrs: false,

	model: {
		event: 'input:update',
	},

	props: {
		/**
		 * Starting value
		 * @model
		*/
		value: {
			type: Number,
			default: undefined,
		},
		/**
		 * Locale to display number in
		 * @validValues ['da-DK', 'de-DE', 'en-AU', 'en-CA', 'en-GB', 'en-US',
		 * 'es-ES', 'fi-FI', 'fr-FR', 'it-IT', 'ja-JP', 'ko-KR', 'nl-NL', 'nb-NO',
		 * 'pl-PL', 'pt-PT', 'ru-RU', 'sv-SE', 'tr-TR', 'zh-TW', 'zh-CN']
		 */
		locale: {
			type: String,
			default: 'en-US',
			validator(locale) {
				const validLocale = !!locales[locale];
				assert.error(validLocale, 'NumberFormat', `${locale} locale is not supported.`);
				return validLocale;
			},
		},
		/**
		 * Type of currency
		 * @validValues ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'NZD',
		 * 'CHF', 'HKD', 'SGD', 'SEK', 'DKK', 'PLN', 'NOK', 'HUF', 'CZK',
		 * 'ILS', 'MXN', 'BRL', 'PHP', 'RUB', 'THB', 'TRY', 'TWD']
		 */
		currency: {
			type: String,
			default: undefined,
			validator(currency) {
				const validCurrency = !currency || !!locales['en-US'][currency];
				assert.error(validCurrency, 'NumberFormat', `${currency} currency is not supported.`);
				return validCurrency;
			},
		},
		/*
		 * Aligns text inside the input.
		 * @validValues [undefined, 'left', 'right']
		*/
		align: {
			type: String,
			default: undefined,
			validator: (align) => [undefined, 'left', 'right'].includes(align),
		},
	},

	data() {
		return {
			cleave: null,
			lastValue: null,
		};
	},

	computed: {
		config() {
			return createConfig(this.locale, this.currency);
		},
		inputProps() {
			return {
				...this.$attrs,
				type: 'tel',
				align: this.align || this.config.align || 'left',
				prefix: this.config.prefix,
				suffix: this.config.suffix,
			};
		},
		inputListeners() {
			const internalBlur = this.onBlur;
			const externalBlur = this.$listeners.blur;
			let blurListener = null;
			if (externalBlur) {
				blurListener = (...args) => {
					internalBlur(...args);
					externalBlur(...args);
				};
			} else {
				blurListener = internalBlur;
			}
			return {
				...this.$listeners,
				blur: blurListener,
			};
		},
		cleaveConfig() {
			const {
				numeralDecimalScale,
				delimiter,
			} = this.config;
			let {
				numeralDecimalMark,
			} = this.config;

			// bad API design in Cleave.js we have to work around:
			// if currency has no decimal scale set decimal mark to obscure
			// character which is unlikely to ever be typed
			numeralDecimalMark = numeralDecimalScale ? numeralDecimalMark : '龖';

			return {
				numeral: true,
				numeralDecimalScale,
				delimiter,
				numeralDecimalMark,
				onValueChanged: this.onCleaveChange,
			};
		},
	},

	watch: {
		value(updatedValue) {
			if (updatedValue !== this.lastValue) {
				this.setCleaveValue(updatedValue);
			}
		},
		cleaveConfig: 'initCleave',
	},

	mounted() {
		this.initCleave();
	},

	beforeDestroy() {
		this.cleanupCleave();
	},

	methods: {
		initCleave() {
			this.cleanupCleave();
			this.cleave = new Cleave(this.$refs.oinput.$refs.input, this.cleaveConfig);
			this.setCleaveValue(this.value);
		},
		setCleaveValue(value) {
			// if this is a non-undefined, non-null, non-NaN currency value
			if ((value || value === 0) && this.currency) {
				value = value.toFixed(this.cleaveConfig.numeralDecimalScale);
			}
			this.cleave.setRawValue(value);
		},
		cleanupCleave() {
			if (this.cleave) {
				this.cleave.destroy();
			}
		},
		onCleaveChange(event) {
			const { rawValue } = event.target;
			let rawFloat = parseFloat(rawValue, 10);
			rawFloat = Number.isNaN(rawFloat) ? undefined : rawFloat;
			this.lastValue = rawFloat;
			this.$emit('input:update', rawFloat);
		},
		onBlur() {
			this.setCleaveValue(this.value);
		},
		focus() {
			this.$refs.oinput.focus();
		},
		blur() {
			this.$refs.oinput.blur();
		},
	},

	supportedLocales,
	supportedCurrencies,
	formatNumber,
};
</script>
