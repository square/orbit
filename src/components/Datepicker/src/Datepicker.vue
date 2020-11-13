<template>
	<o-popover>
		<div
			slot="action"
			slot-scope="popover"
			:class="$s.InputWrapper"
		>
			<date-input
				ref="input"
				v-model="dateValue"
				v-bind="$attrs"
				:tabindex="isMobile ? -1 : false"
				:locale="locale"
				:min-date="minDateObj"
				:max-date="maxDateObj"
				v-on="$listeners"
				@focus="showCalendar($event, () => popover.open())"
				@blur="popover.close()"
			/>
			<input
				v-if="isMobile"
				ref="hiddenMobileInput"
				v-model="dateValue"
				:class="$s.HiddenMobileInput"
				type="date"
			>
		</div>

		<template slot-scope="{}">
			<calendar
				v-show="!isMobile"
				ref="calendar"
				:selected-date="value"
				:locale="locale"
				:min-date="minDateObj"
				:max-date="maxDateObj"
				@mousedown.prevent
				@change="setDate"
			/>
		</template>
	</o-popover>
</template>

<script>
import { FormItemKey } from '@square/orbit/components/Form';
import { OPopover } from '@square/orbit/components/Popover';
import Calendar from './Calendar.vue';
import DateInput from './DateInput.vue';
import { validateIsoDate, iso2Date } from './utils';

export default {
	name: 'Datepicker',

	components: {
		OPopover,
		DateInput,
		Calendar,
	},

	inject: {
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	model: {
		event: 'datepicker:update',
	},

	props: {
		locale: {
			type: String,
			default: undefined,
		},
		value: {
			type: String,
			default: '',
			validator: validateIsoDate,
		},
		minDate: {
			type: String,
			default: undefined,
			validator: validateIsoDate,
		},
		maxDate: {
			type: String,
			default: undefined,
			validator: validateIsoDate,
		},
	},

	data() {
		return {
			isMobile: (typeof window !== 'undefined' && 'ontouchstart' in window),
		};
	},

	computed: {
		dateValue: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('datepicker:update', val);
			},
		},
		minDateObj() {
			return iso2Date(this.minDate);
		},
		maxDateObj() {
			return iso2Date(this.maxDate);
		},
	},

	created() {
		if (this.formItem) {
			this.formItem.addUnwrappedChild();
		}
	},

	destroyed() {
		if (this.formItem) {
			this.formItem.removeUnwrappedChild();
		}
	},

	methods: {
		showCalendar(e, showCalendar) {
			if (this.isMobile) {
				// some mobile devices and chrome emulator
				// need a slight timeout for focus to work
				this.$nextTick(() => {
					this.$refs.hiddenMobileInput.focus();
				});
			} else {
				showCalendar();
			}
		},

		setDate(val) {
			this.dateValue = val;
			this.$refs.input.blur();
		},

	},
};
</script>

<style module="$s">
.InputWrapper {
	position: relative;
}

.HiddenMobileInput {
	position: absolute;
	top: 0;
	left: 0;
	min-width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	opacity: 0;
	box-sizing: border-box;
	appearance: none;
}
</style>
