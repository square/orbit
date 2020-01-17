<!--
This file is taken from the library `vue2-datepicker`
https://github.com/mengxiong10/vue2-datepicker

We have altered some of the innards of the calendar with Orbit components.

MIT License

Copyright (c) 2018 xiemengxiong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->
<template>
	<o-popover flush>
		<template
			slot="action"
			slot-scope="popover"
		>
			<div :class="$s.InputWrapper">
				<o-input
					ref="input"
					:class="inputClass"
					:value="text"
					:placeholder="placeholder"
					readonly
					@focus="popover.open()"
					@click.stop
				>
					<o-icon
						slot="suffix"
						:class="$s.Icon"
						:name="showCloseIcon ? 'circle-x' : 'calendar'"
						@click="showCloseIcon ? clearDate() : popover.open()"
					/>
				</o-input>
			</div>
		</template>


		<template slot-scope="popover">
			<datepicker-calendar
				v-model="currentValue"
				:translation="translation"
				:first-day-of-week="firstDayOfWeek"
				:format="format"
				:disabled-days="disabledDays"
				:min-date="minDate"
				:max-date="maxDate"
				:type="type"
				:show="true"
				:year-controls="yearControls"
				not-before="new Date()"
				@select="selectDate(popover.close)"
			/>
		</template>
	</o-popover>
</template>

<script>
import { OPopover } from '@square/orbit/components/Popover';
import { OInput } from '@square/orbit/components/Input';
import { OIcon } from '@square/orbit/components/Icon';
import DatepickerCalendar from './DatepickerCalendar.vue';
import Languages from './languages';


export default {
	name: 'DatePicker',

	components: {
		DatepickerCalendar,
		OInput,
		OIcon,
		OPopover,
	},

	props: {

		value: {
			type: null,
			default: null,
		},

		format: {
			type: String,
			default: 'MM/DD/YYYY',
		},

		type: {
			type: String,
			default: 'date',
		},

		width: {
			type: [String, Number],
			default: 210,
		},

		placeholder: {
			type: String,
			default: '',
		},

		lang: {
			type: String,
			default: 'en',
		},

		shortcuts: {
			type: [Boolean, Array],
			default: true,
		},

		disabledDays: {
			type: Array,
			default() {
				return [];
			},
		},

		minDate: {
			type: [String, Number],
			default: '',
		},

		maxDate: {
			type: [String, Number],
			default: '',
		},

		firstDayOfWeek: {
			default: 7,
			type: Number,
			validator: val => val >= 1 && val <= 7,
		},

		minuteStep: {
			type: Number,
			default: 0,
			validator: val => val >= 0 && val <= 60,
		},

		timePickerOptions: {
			type: Object,
			default() {
				return {};
			},
		},

		confirm: {
			type: Boolean,
			default: false,
		},

		inputClass: {
			type: String,
			default: '',
		},

		confirmText: {
			type: String,
			default: 'OK',
		},

		yearControls: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			currentValue: this.value,
			position: null,
		};
	},

	computed: {
		showCloseIcon() {
			if (Array.isArray(this.currentValue)) {
				return this.currentValue.findIndex(val => val !== undefined) !== -1;
			}
			return !!this.currentValue;
		},

		translation() {
			return Languages[this.lang] || Languages.en;
		},

		text() {
			if (this.isValidDate(this.value)) {
				return this.stringify(this.value);
			}
			return undefined;
		},
	},

	watch: {
		value: {
			handler(val) {
				this.currentValue = this.isValidDate(val) ? val : undefined;
			},

			immediate: true,
		},
	},

	methods: {
		updateDate() {
			const val = this.currentValue;
			if (val) {
				this.$emit('input', val);
			}
		},

		confirmDate() {
			this.updateDate();
			this.$emit('confirm', this.currentValue);
		},

		selectDate(closePopup) {
			if (!this.confirm) {
				this.updateDate();
				if (this.type === 'date') {
					closePopup();
				}
			}
		},

		clearDate() {
			this.$emit('input', '');
		},

		formatDate(date, fmt = 'YYYY-MM-dd HH:mm:ss') {
			const hour = date.getHours();

			const map = {
				'M+': date.getMonth() + 1,
				'[Dd]+': date.getDate(),
				'H+': hour,
				'h+': (hour % 12) || 12,
				'm+': date.getMinutes(),
				's+': date.getSeconds(),
				'q+': Math.floor((date.getMonth() + 3) / 3),
				S: date.getMilliseconds(),
				a: hour >= 12 ? 'pm' : 'am',
				A: hour >= 12 ? 'PM' : 'AM',
			};

			let str = fmt.replace(/[Yy]+/g, dateStr => (`${date.getFullYear()}`).slice(4 - dateStr.length));


			Object.keys(map).forEach((key) => {
				str = str.replace(new RegExp(key), (strKey) => {
					const value = `${map[key]}`;
					return strKey.length === 1 ? value : (`00${value}`).slice(value.length);
				});
			});

			return str;
		},

		stringify(date) {
			return this.formatDate(new Date(date), this.format);
		},

		isValidDate(date) {
			return !!new Date(date).getTime();
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--calendar-height: 312px;
}

.CalendarPopup {
	width: 256px;
	height: var(--calendar-height);
	margin-top: 1px;
	margin-bottom: 1px;
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 10px 0 rgba(0, 0, 0, 0.1);
	z-index: 1000;
}

.InputWrapper {
	position: relative;
}

.Footer {
	padding: 4px;
	clear: both;
	border-top: 1px solid rgba(0, 0, 0, 0.05);
	text-align: right;
}

.ConfirmBtn {
	margin: 0 5px;
	padding: 7px 15px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 3px;
	outline: none;
	background-color: transparent;
	color: #73879c;
	font-size: 12px;
	cursor: pointer;

	&:hover {
		border-color: #1284e7;
		color: #1284e7;
	}
}
</style>
