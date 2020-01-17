<template>
	<li
		:class="[
			$s.StepItem,
			$s[`direction_${parent.direction}`],
			$s[`status_${status}`],
			$s[`span_${parent.numSteps}`],
		]"
	>
		<!-- Start: Indicators -->
		<div
			:class="[
				$s.Indicators,
				$s[`direction_${parent.direction}`],
			]"
		>
			<o-icon
				v-if="isComplete || isCondensed"
				ref="check"
				key="step-complete"
				:class="[
					$s.Icon,
					$s[`direction_${parent.direction}`],
					$s[`status_${status}`],
					$s[`variant_${parent.variant}`],
					{
						[$s.clickable]: isClickable,
						[$s.complete]: isComplete,
					}
				]"
				:name="iconName"
				:disabled="!isClickable"
				@click="isClickable ? changeStep(idx) : null"
				@mouseover="isClickable ? mouseover() : null"
				@mouseout="isClickable ? mouseout() : null"
			/>

			<span
				v-if="!isCondensed && !isComplete"
				ref="number"
				key="step-number"
				:class="[
					$s.Number,
					$s[`direction_${parent.direction}`],
					$s[`status_${status}`],
					{
						[$s.clickable] : isClickable,
						[$s.hovering] : hovering,
						[$s.invalid] : invalid,
					},
				]"
				@click="isClickable ? changeStep(idx) : null"
				@mouseover="isClickable ? mouseover() : null"
				@mouseout="isClickable ? mouseout() : null"
			/>

			<div
				v-if="title && parent.direction === 'horizontal'"
				:class="[
					$s.Title,
					$s[`direction_${parent.direction}`],
					$s[`status_${status}`],
					{
						[$s.clickable] : isClickable,
						[$s.complete] : isComplete,
						[$s.hovering] : hovering,
					}
				]"
				@click="isClickable ? changeStep(idx) : null"
				@mouseover="isClickable ? mouseover() : null"
				@mouseout="isClickable ? mouseout() : null"
			>
				{{ title }}
			</div>

			<div
				:class="[
					$s.Line,
					$s[`direction_${parent.direction}`],
					$s[`status_${status}`],
				]"
			/>
		</div>
		<!-- End: Indicators -->

		<div
			v-if="!isCondensed && (description || title && parent.direction === 'vertical')"
			:class="[
				$s.Details,
				$s[`direction_${parent.direction}`],
			]"
		>
			<div
				v-if="title && parent.direction === 'vertical'"
				:class="[
					$s.Title,
					$s[`direction_${parent.direction}`],
					$s[`status_${status}`],
					{
						[$s.clickable] : isClickable,
						[$s.hovering] : hovering,
					}
				]"
				@click="isClickable ? changeStep(idx) : null"
				@mouseover="isClickable ? mouseover() : null"
				@mouseout="isClickable ? mouseout() : null"
			>
				{{ title }}
			</div>

			<div
				v-if="!isCondensed && description"
				ref="description"
				:class="[
					$s.Description,
					$s[`direction_${parent.direction}`],
					$s[`status_${status}`],
					{
						[$s.clickable] : isClickable,
						[$s.hovering] : hovering,
					}
				]"
			>
				{{ description }}
			</div>
		</div>
	</li>
</template>

<script>
import { showWarning } from '@square/orbit/utils/debug';
import { OIcon } from '@square/orbit/components/Icon';
import Key from './Key';


export default {
	name: 'OStepItem',

	components: {
		OIcon,
	},

	inject: {
		parent: Key,
	},

	props: {
		title: {
			type: String,
			default: undefined,
		},
		description: {
			type: String,
			default: undefined,
		},
		invalid: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			hovering: false,
			identifier: Symbol('step-item'),
		};
	},

	computed: {
		idx: {
			get() {
				return this.parent.children.indexOf(this.identifier) + 1;
			},
			set(val) {
				this.$emit('steps-item:update', val);
			},
		},

		status() {
			let status = 'default';

			if (this.parent.currentStep === this.idx) {
				status = 'active';
			}

			if (this.parent.currentStep > this.idx) {
				status = 'complete';
			}

			return status;
		},

		iconName() {
			return this.isComplete ? 'check' : 'circle';
		},

		isComplete() {
			return this.status === 'complete';
		},

		isClickable() {
			/* TODO: This logic currently only let's someone navigate to earlier steps. if someone was on
			step 3, clicks step 1, and then wants to go back to step 3, how would this work? */

			let isClickable = false;

			if (this.status !== 'active') {
				if (this.parent.clickable) {
					isClickable = true;
				} else {
					isClickable = this.status === 'complete';
				}
			}

			return isClickable;
		},

		isCondensed() {
			return this.parent.variant === 'condensed';
		},
	},

	created() {
		this.parent.children.push(this.identifier);

		if (this.isCondensed && this.description) {
			showWarning('Steps', 'Condensed steps cannot have descriptions.');
		}
	},

	methods: {
		changeStep(val) {
			this.parent.currentStep = val;
			this.hovering = false;
		},

		mouseover() {
			if (this.status !== 'active') {
				this.hovering = true;
			}
		},

		mouseout() {
			this.hovering = false;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";

:root {
	--step-number-size: var(--space-x3);
	--step-line-size: 2px;
}

.StepItem {
	display: flex;
	flex: 1 1 auto;
	flex-wrap: wrap;
	counter-increment: steps;

	&.direction_horizontal {
		align-items: center;

		&:last-child {
			flex: 0 0 auto;

			/* Without this, the last child can grow beyond an acceptable width */
			&.span_1 {
				max-width: calc(100% / 1);
			}

			&.span_2 {
				max-width: calc(100% / 2);
			}

			&.span_3 {
				max-width: calc(100% / 3);
			}

			&.span_4 {
				max-width: calc(100% / 4);
			}

			&.span_5 {
				max-width: calc(100% / 5);
			}

			&.span_6 {
				max-width: calc(100% / 6);
			}

			&.span_7 {
				max-width: calc(100% / 7);
			}

			&.span_8 {
				max-width: calc(100% / 8);
			}

			&.span_9 {
				max-width: calc(100% / 9);
			}

			&.span_10 {
				max-width: calc(100% / 10);
			}
		}
	}

	&.direction_vertical {
		align-items: stretch;
	}
}

.Indicators {
	display: flex;
	align-items: center;

	&.direction_horizontal {
		width: 100%;
	}

	&.direction_vertical {
		flex: 0 0 auto;
		flex-direction: column;
	}
}

.Details {
	display: flex;
	flex: 1 1 auto;

	&.direction_vertical {
		flex-direction: column;
	}
}

button.Icon {
	flex: 0 0 auto;
	margin: 0 var(--space);
	transition: color var(--transition-base);
	color: var(--brand-color);

	&.clickable {
		cursor: pointer;
	}

	&.variant_condensed {
		margin-right: 0;
		color: var(--color-gray-30);

		&.status_active {
			color: var(--brand-color);
		}

		&.clickable {
			&:hover {
				color: var(--color-gray-60);
			}
		}

		&.complete {
			color: var(--brand-color);
		}
	}
}

.Number {
	composes: title-4 from "@square/orbit/styles/headings.css";
	box-sizing: border-box;
	display: inline-block;
	flex: 0 0 var(--step-number-size);
	width: var(--step-number-size);
	height: var(--step-number-size);
	margin: 0 var(--space-half);
	transition:
		border-color var(--transition-base),
		background-color var(--transition-base),
		color var(--transition-base);
	border: 1px solid var(--disabled-border-color);
	border-radius: var(--step-number-size);
	background-color: var(--disabled-bg-color);
	color: var(--disabled-color);
	line-height: calc(var(--step-number-size) - 2px);
	text-align: center;

	&::before {
		content: counter(steps);
	}

	&.clickable {
		border-color: var(--color-gray-40);
		background-color: var(--color-white);
		color: var(--color-gray-50);
		cursor: pointer;
	}

	&.clickable:hover,
	&.hovering {
		border-color: var(--color-gray-40);
		background-color: var(--color-gray-10);
	}

	&.status_active {
		border-color: var(--selected-border-color);
		background-color: var(--color-white);
		color: var(--selected-color);
		box-shadow: var(--selected-box-shadow);
	}

	&.invalid {
		border-color: var(--danger-color);
		background-color: var(--danger-color);
		color: var(--color-white);
	}
}

.Title {
	composes: title-4 from "@square/orbit/styles/headings.css";
	transition: color var(--transition-base);
	font-weight: var(--font-weight-medium);

	&.direction_horizontal {
		margin-right: var(--space);
		margin-left: var(--space-half);
	}

	&.direction_vertical {
		margin-left: var(--space);
	}

	&.status_active {
		color: var(--brand-color);
	}

	&.status_default {
		color: var(--disabled-color);
	}

	&.clickable {
		color: var(--color-gray-50);
		cursor: pointer;
	}

	&.clickable:hover,
	&.hovering {
		color: var(--color-gray-60);
	}
}

.Line {
	display: block;
	flex: 1 1 auto;
	transition: background-color var(--transition-base);
	background-color: var(--color-gray-30);

	&.direction_horizontal {
		height: var(--step-line-size);
	}

	&.direction_vertical {
		width: var(--step-line-size);
		min-height: var(--space-x2);
		margin: var(--space-half) 0;
	}

	&.status_complete {
		background-color: var(--brand-color);
	}
}

.StepItem:last-child .Line {
	display: none;
}

.Description {
	composes: title-4 from "@square/orbit/styles/headings.css";
	transition: color var(--transition-base);
	font-weight: 400;

	&:last-child {
		padding-bottom: var(--space-x2);
	}

	&.direction_horizontal {
		margin-left: 36px;
	}

	&.direction_vertical {
		order: 4;
		margin-left: var(--space);
	}

	&.status_active {
		color: var(--color-gray-50);
	}

	&.status_default {
		color: var(--disabled-color);
	}

	&.clickable {
		color: var(--color-gray-40);
	}

	&.hovering {
		color: var(--color-gray-50);
	}
}

.Title + .Description.direction_vertical {
	margin-top: var(--space-half);
}
</style>
