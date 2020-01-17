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
	<div :class="$s.Calendar">
		<div
			v-if="currentPanel === 'time'"
			:class="$s.CalendarHeader"
		>
			<a @click="currentPanel = 'date'">
				{{ now.toLocaleDateString() }}
			</a>
		</div>

		<div
			v-else
			:class="$s.CalendarHeader"
		>
			<o-button
				v-show="yearControls && currentPanel === 'date'"
				:class="$s.Button"
				variant="muted"
				size="small"
				@click.prevent="changeYear(-1)"
			>
				<o-icon name="arrow-left-double" />
			</o-button>
			<o-button
				v-show="currentPanel === 'date'"
				:class="$s.Button"
				variant="muted"
				size="small"
				@click.prevent="changeMonth(-1)"
			>
				<o-icon name="arrow-left" />
			</o-button>

			<o-heading
				:class="$s.HeaderTitle"
				size="title-5"
				flush
			>
				{{ months[currentMonth] }}
				{{ currentYear }}
			</o-heading>

			<o-button
				v-show="currentPanel === 'date'"
				:class="$s.Button"
				variant="muted"
				size="small"
				@click.prevent="changeMonth(1)"
			>
				<o-icon name="arrow-right" />
			</o-button>
			<o-button
				v-show="yearControls && currentPanel === 'date'"
				:class="$s.Button"
				variant="muted"
				size="small"
				@click.prevent="changeYear(1)"
			>
				<o-icon name="arrow-right-double" />
			</o-button>
		</div>

		<table
			v-show="currentPanel === 'date'"
			:class="$s.DaysTable"
		>
			<thead>
				<tr>
					<th
						v-for="day in days"
						:key="day"
					>
						{{ day }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, rowIdx) in dates"
					:key="rowIdx"
				>
					<td
						v-for="cell in row"
						:key="cell.day"
						:title="cell.title"
						@click="selectDate(cell)"
					>
						<div :class="[$s.Day, getDateClasses(cell)]">
							{{ cell.day }}
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { OHeading } from '@square/orbit/components/Heading';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';

export default {

	name: 'DatepickerCalendar',

	components: {
		OHeading,
		OButton,
		OIcon,
	},

	filters: {
		timeText(value) {
			return (`00${value}`).slice(String(value).length);
		},
	},

	props: {
		startAt: {
			type: null,
			default: null,
		},
		endAt: {
			type: null,
			default: null,
		},
		value: {
			type: null,
			default: null,
		},
		show: {
			type: Boolean,
			default: false,
		},
		translation: {
			type: Object,
			required: true,
		},
		firstDayOfWeek: {
			type: Number,
			required: true,
		},
		format: {
			type: String,
			required: true,
		},
		disabledDays: {
			type: Array,
			required: true,
		},
		minDate: {
			type: [String, Number],
			required: true,
		},
		maxDate: {
			type: [String, Number],
			required: true,
		},
		yearControls: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			required: true,
		},
	},

	data() {
		const translationObj = this.translation;
		const translation = translationObj;

		return {
			months: translation.months,
			dates: [],
			years: [],
			now: new Date(),
			currentPanel: 'date',
			times: [],
		};
	},


	computed: {

		days() {
			const daysObj = this.translation.days;
			const days = daysObj;

			const firstday = +this.firstDayOfWeek;
			return days.concat(days).slice(firstday, firstday + 7);
		},

		timeType() {
			return /h+/.test(this.format) ? '12' : '24';
		},

		currentYear() {
			return this.now.getFullYear();
		},

		currentMonth() {
			return this.now.getMonth();
		},

		curHour() {
			return this.now.getHours();
		},

		curMinute() {
			return this.now.getMinutes();
		},

		curSecond() {
			return this.now.getSeconds();
		},
	},

	watch: {
		show(val) {
			if (val) {
				this.currentPanel = 'date';
				this.updateNow();
			}
		},

		value: {
			handler: 'updateNow',
			immediate: true,
		},

		now: 'updateCalendar',
	},

	created() {
		this.updateCalendar();
	},

	methods: {
		updateNow() {
			this.now = this.value ? new Date(this.value) : new Date();
		},

		updateCalendar() {
			function getCalendar(time, firstday, length, classes) {
				return Array(length).fill().map((v, i) => {
					const day = firstday + i;
					const date = new Date(
						time.getFullYear(),
						time.getMonth(),
						day,
						0,
						0,
						0,
					);
					date.setDate(day);
					return {
						title: date.toLocaleDateString(),
						date,
						day,
						classes,
					};
				});
			}

			const firstDayOfWeekObj = this.firstDayOfWeek;
			const firstDayOfWeek = firstDayOfWeekObj;
			const time = new Date(this.now);
			time.setDate(0);

			const lastMonthLength = (((time.getDay() + 7) - firstDayOfWeek) % 7) + 1;
			const lastMonthfirst = time.getDate() - (lastMonthLength - 1);
			const lastMonth = getCalendar(
				time,
				lastMonthfirst,
				lastMonthLength,
				this.$s['last-month'],
			);
			time.setMonth(time.getMonth() + 2, 0);

			const curMonthLength = time.getDate();
			const curMonth = getCalendar(time, 1, curMonthLength);
			time.setMonth(time.getMonth() + 1, 1);

			const nextMonthLength = 42 - (lastMonthLength + curMonthLength);
			const nextMonth = getCalendar(time, 1, nextMonthLength, this.$s['last-month']);
			let index = 0;
			let resIndex = 0;
			const arr = lastMonth.concat(curMonth, nextMonth);
			const result = new Array(6);

			while (index < 42) {
				result[resIndex += 1] = arr.slice(index, (index += 7));
			}

			this.dates = result;
		},

		getDateClasses(cell) {
			const classes = [];
			const cellTime = new Date(cell.date).setHours(0, 0, 0, 0);
			const cellEndTime = new Date(cell.date).setHours(23, 59, 59, 999);
			const curTime = this.value ? new Date(this.value).setHours(0, 0, 0, 0) : 0;
			const startTime = this.startAt
			? new Date(this.startAt).setHours(0, 0, 0, 0)
			: 0;
			const endTime = this.endAt ? new Date(this.endAt).setHours(0, 0, 0, 0) : 0;
			const today = new Date().setHours(0, 0, 0, 0);

			if (
				this.disabledDays.some(v => new Date(v).setHours(0, 0, 0, 0) === cellTime)
				|| (this.minDate !== '' && cellEndTime < new Date(this.minDate).getTime())
				|| (this.maxDate !== '' && cellTime > new Date(this.maxDate).getTime())
				) {
				return this.$s.disabled;
			}

			classes.push(cell.classes);

			if (cellTime === today) {
				classes.push(this.$s.today);
			}


			if (cellTime === curTime) {
				classes.push(this.$s.current);
			} else if (startTime) {
				if (cellTime < startTime) {
					classes.push(this.$s.disabled);
				} else if (curTime && cellTime <= curTime) {
					classes.push(this.$s['in-range']);
				}
			} else if (endTime) {
				if (cellTime > endTime) {
					classes.push(this.$s.disabled);
				} else if (curTime && cellTime >= curTime) {
					classes.push(this.$s['in-range']);
				}
			}

			return classes.join(' ');
		},

		showMonths() {
			if (this.currentPanel === 'months') {
				this.currentPanel = 'date';
			} else {
				this.currentPanel = 'months';
			}
		},

		showYears() {
			if (this.currentPanel === 'years') {
				this.currentPanel = 'date';
			} else {
				const firstYear = Math.floor(this.now.getFullYear() / 10) * 10;
				const years = [];
				for (let i = 0; i < 10; i += 1) {
					years.push(firstYear + i);
				}

				this.years = years;
				this.currentPanel = 'years';
			}
		},

		changeMonth(flag) {
			const now = new Date(this.now);
			now.setMonth(now.getMonth() + flag, 1);
			this.now = now;
		},

		changeYear(flag) {
			const now = new Date(this.now);
			now.setYear(now.getFullYear() + flag, 1);
			this.now = now;
		},

		scrollIntoView(container, selected) {
			if (!selected) {
				container.scrollTop = 0;
				return;
			}
			const top = selected.offsetTop;
			const bottom = selected.offsetTop + selected.offsetHeight;
			const viewRectTop = container.scrollTop;
			const viewRectBottom = viewRectTop + container.clientHeight;
			if (top < viewRectTop) {
				container.scrollTop = top;
			} else if (bottom > viewRectBottom) {
				container.scrollTop = bottom - container.clientHeight;
			}
		},

		selectDate(cell) {
			const classes = this.getDateClasses(cell);
			if (classes.indexOf(this.$s.disabled) !== -1) {
				return;
			}
			let date = new Date(cell.date);


			if (this.type === 'datetime') {
				if (this.value instanceof Date) {
					date.setHours(
						this.value.getHours(),
						this.value.getMinutes(),
						this.value.getSeconds(),
					);
				}

				if (this.startAt && date.getTime() < new Date(this.startAt).getTime()) {
					date = new Date(this.startAt);
				} else if (this.endAt && date.getTime() > new Date(this.endAt).getTime()) {
					date = new Date(this.endAt);
				}
				this.currentPanel = 'time';
				this.$nextTick(() => {
					Array.prototype.forEach.call(
						this.$el.querySelectorAll('.mx-time-list-wrapper'),
						(el) => {
							this.scrollIntoView(el, el.querySelector(this.$s['.cur-time']));
						},
					);
				});
			}
			this.now = date;
			this.$emit('input', date);
			this.$emit('select');
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";

.Calendar {
	float: left;
	font-family: var(--font-family-base);

	& a {
		color: inherit;
		text-decoration: none;
		cursor: pointer;
	}
}

.CalendarHeader {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--space);
	border-bottom: var(--divider-border);
	text-align: center;

	& > a:hover {
		color: var(--brand-color);
	}
}

.HeaderTitle {
	flex: 1;
	color: var(--font-color-base);
}

.Button {
	flex: 0 0 auto;
}

.DaysTable {
	width: 300px;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
	border-collapse: collapse;
	border-spacing: 0;
	table-layout: fixed;

	& th {
		padding: var(--space) 0;
		border-bottom: var(--divider-border);
		border-radius: var(--border-radius-base);
		color: var(--disabled-color);
		font-size: var(--heading-t5-size);
		font-weight: var(--font-weight-regular);
		text-align: center;
		box-sizing: border-box;
	}

	& td {
		padding: var(--space-half);
	}

	& .today {
		font-weight: var(--font-weight-medium);
	}

	& .last-month {
		color: var(--disabled-color);
	}
}

.Day {
	padding: var(--space) var(--space-half);
	box-sizing: border-box;
	transition: var(--transition-base);
	border-radius: var(--border-radius-base);
	color: var(--font-color-base);
	font-size: var(--heading-t5-size);
	text-align: center;
	cursor: pointer;

	&:hover {
		background-color: var(--hover-bg-color);
	}

	&.in-range {
		background-color: var(--hover-bg-color);
	}

	&.current {
		box-shadow: inset 0 0 0 2px var(--selected-color);
	}

	&.disabled {
		color: var(--disabled-color);
		cursor: not-allowed;
	}
}
</style>
