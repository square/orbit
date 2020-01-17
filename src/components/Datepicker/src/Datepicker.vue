<template>
	<datepicker-calendar-wrapper
		v-model="inputVal"
		:placeholder="placeholder"
		:min-date="minDate"
		:max-date="maxDate"
		:year-controls="yearControls"
		v-on="$listeners"
	/>
</template>

<script>
import { FormItemKey } from '@square/orbit/components/Form';
import DatepickerCalendarWrapper from './DatepickerCalendarWrapper.vue';

export default {
	name: 'ODatepicker',

	components: {
		DatepickerCalendarWrapper,
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
		value: {
			type: Number,
			validator: timestamp => (new Date(timestamp)).getTime() > 0,
			default: undefined,
		},
		placeholder: {
			type: String,
			default: undefined,
		},
		minDate: {
			type: [Number, String],
			default: undefined,
		},
		maxDate: {
			type: [Number, String],
			default: undefined,
		},
		yearControls: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		inputVal: {
			get() {
				return (new Date(this.value));
			},

			set(dateObj) {
				if (!dateObj) {
					this.$emit('datepicker:update', null);
					return;
				}

				const timestamp = dateObj.getTime();
				this.$emit('datepicker:update', timestamp);
			},
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
};
</script>
