<template>
	<div
		v-bind="$attrs"
		v-on="$listeners"
	>
		<div
			:class="$s.CalendarHeader"
		>
			<o-button
				variant="muted"
				class="btn"
				tabindex="-1"
				@click="incMonth(-1)"
			>
				<o-icon
					name="arrow-left"
				/>
			</o-button>

			<o-heading
				size="title-4"
				flush
			>
				{{ monthName }}
			</o-heading>

			<o-button
				variant="muted"
				tabindex="-1"
				@click="incMonth(1)"
			>
				<o-icon
					name="arrow-right"
				/>
			</o-button>
		</div>
		<table>
			<thead>
				<tr>
					<th
						v-for="(day, i) in weekdays"
						:key="`day-${i}-${day}`"
						:class="$s.DayCell"
					>
						{{ day }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(week, wi) in weeks"
					:key="`week-${wi}`"
				>
					<td
						v-for="(date, di) in week"
						:key="`date-${wi-di}`"
					>
						<scope
							v-if="date"
							:iso-date="getIsoDate(date)"
						>
							<template
								#default="{ isoDate }"
							>
								<o-button
									:variant="isDateSelected(isoDate) ? 'secondary' : 'muted'"
									tabindex="-1"
									size="small"
									full-width
									:disabled="isOutOfRange(isoDate)"
									@click.prevent="emitDate(isoDate)"
								>
									{{ date }}
								</o-button>
							</template>
						</scope>
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
import { iso2Date } from './utils';

const Scope = {
	functional: true,
	render: (h, ctx) => ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props),
};

export default {
	name: 'Calendar',

	components: {
		OIcon,
		OButton,
		OHeading,
		Scope,
	},

	inheritAttrs: false,

	props: {
		selectedDate: {
			type: String,
			default: '',
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
			viewingDate: this.selectedDateObj() || new Date(),
		};
	},

	computed: {
		monthName() {
			return this.viewingDate.toLocaleString(this.locale, { month: 'short', year: 'numeric' });
		},

		weekdays() {
			const weekdays = [];
			const date = new Date();
			for (let i = 0; i < 7; i += 1) {
				weekdays[date.getDay()] = new Date(date);
				date.setDate(date.getDate() + 1);
			}

			const localizedDays = weekdays.map((d) => d.toLocaleDateString(this.locale, { weekday: 'short' }));

			if (localizedDays.toString() === 'Sun,Mon,Tue,Wed,Thu,Fri,Sat') {
				return localizedDays.map((d) => d.slice(0, 2));
			}

			return weekdays.map((d) => d.toLocaleDateString(this.locale, { weekday: 'narrow' }));
		},

		weeks() {
			const month = this.viewingDate.getMonth();
			const date = new Date(
				this.viewingDate.getFullYear(),
				month,
				1,
			);

			const weeks = [];
			let week = [];
			while (date.getMonth() === month) {
				const weekday = date.getDay();
				week[weekday] = date.getDate();

				if (weekday === 6) {
					weeks.push(week);
					week = [];
				}

				date.setDate(date.getDate() + 1);
			}

			weeks.push(week);

			return weeks;
		},
	},

	watch: {
		selectedDate() {
			const newViewingDate = this.selectedDateObj();
			if (newViewingDate) {
				this.viewingDate = newViewingDate;
			}
		},
	},

	methods: {
		selectedDateObj() {
			if (!this.selectedDate) {
				return null;
			}
			const [year, month, day] = this.selectedDate.split('-');
			return new Date(year, month - 1, day);
		},

		incMonth(n) {
			const nextMonth = new Date(this.viewingDate);
			nextMonth.setDate(1);
			nextMonth.setMonth(nextMonth.getMonth() + n);
			this.viewingDate = nextMonth;
		},

		getIsoDate(_day) {
			if (!_day) {
				return null;
			}
			const year = this.viewingDate.getFullYear();
			const month = `0${this.viewingDate.getMonth() + 1}`.slice(-2);
			const day = `0${_day}`.slice(-2);
			return `${year}-${month}-${day}`;
		},

		isDateSelected(isoDate) {
			return this.selectedDate === isoDate;
		},

		emitDate(isoDate) {
			this.$emit('change', isoDate);
		},

		isOutOfRange(isoDate) {
			const date = iso2Date(isoDate);
			return date < this.minDate || date > this.maxDate;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.CalendarHeader {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: var(--space-x2);
}

.DayCell {
	height: var(--space-x4);
	padding-bottom: var(--space);
	color: var(--color-black);
	font-weight: lighter;
	cursor: default;
}
</style>
