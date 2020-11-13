<template>
	<o-input
		ref="dateInput"
		:value="isEditing ? editVal : formattedVal"
		v-bind="$attrs"
		v-on="$listeners"
		@input:update="onInput"
		@focus="onFocus"
		@blur="onBlur"
		@keydown.enter.prevent="blur"
	>
		<template slot="suffix">
			<o-icon
				v-if="value"
				name="circle-x"
				@mousedown.prevent
				@click.stop.prevent="clearVal"
			/>
			<o-icon
				v-else
				key="calendar-icon"
				name="calendar"
			/>
		</template>
	</o-input>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import { OInput } from '@square/orbit/components/Input';
import { localizeDate } from './localize-date';
import dateParser from './date-parser';
import { date2Iso, iso2Date } from './utils';

export default {
	name: 'DateInput',

	components: {
		OInput,
		OIcon,
	},

	inheritAttrs: false,

	model: {
		event: 'date-input:update',
	},

	props: {
		value: {
			type: String,
			default: '',
			validator: (str) => !str || !Number.isNaN(iso2Date(str)),
		},
		locale: {
			type: String,
			default: undefined,
		},
		minDate: {
			type: Date,
			default: undefined,
		},
		maxDate: {
			type: Date,
			default: undefined,
		},
	},

	data() {
		return {
			isEditing: false,
			editVal: '',
		};
	},

	computed: {
		valDate() {
			const { value } = this;
			if (!value) {
				return undefined;
			}
			return iso2Date(value);
		},
		formattedVal() {
			const { valDate, locale } = this;
			if (!valDate) {
				return '';
			}

			return localizeDate(valDate, locale);
		},
	},

	watch: {
		isEditing() {
			if (this.isEditing) {
				this.editVal = this.formattedVal;
			}
		},
	},

	created() {
		this.$watch(this.validateInput);
	},

	methods: {
		parseEditingDate(editingDate) {
			if (!editingDate) {
				return '';
			}
			let parsed = dateParser(editingDate, new Date(), this.locale);

			parsed = this.enforceRange(parsed);

			return date2Iso(parsed);
		},

		validateInput() {
			const { valDate } = this;
			if (valDate) {
				const newDate = this.enforceRange(valDate);
				if (valDate.getTime() !== newDate.getTime()) {
					this.onInput(date2Iso(newDate));
				}
			}
		},

		enforceRange(date) {
			if (this.minDate && this.minDate > date) {
				return this.minDate;
			}

			if (this.maxDate && this.maxDate < date) {
				return this.maxDate;
			}

			return date;
		},

		clearVal() {
			this.editVal = '';
			this.$emit('date-input:update', '');
		},

		onFocus() {
			if (!this.value) {
				this.onInput(date2Iso(new Date()));
			}

			this.isEditing = true;
		},

		onBlur() {
			this.isEditing = false;
		},

		onInput(editVal) {
			this.editVal = editVal;
			this.$emit(
				'date-input:update',
				this.parseEditingDate(editVal),
			);
		},

		blur() {
			this.$refs.dateInput.blur();
		},

		focus() {
			this.$refs.dateInput.focus();
		},
	},
};
</script>
