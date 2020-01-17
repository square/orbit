<template>
	<label
		:class="[
			$s.Radio,
			{ [$s.disabled]: isDisabled },
			group && group.radioClass,
		]"
	>
		<div :class="$s.ControlContainer">
			<input
				ref="input"
				:class="$s.HiddenInput"
				:disabled="isDisabled"
				:checked="isChecked"
				v-bind="$attrs"
				type="radio"
				@click="handleClick"
				v-on="$listeners"
			>
			<div :class="$s.Control" />
		</div>
		<div
			v-if="$slots.default"
			:class="$s.LabelWrapper"
		>
			<span
				:class="[
					$s.Label,
					{ [$s.hasSublabel]: hasSublabel }
				]"
			>
				<slot />
			</span>
			<span
				v-if="hasSublabel"
				:class="$s.Sublabel"
			>
				<slot name="sublabel">
					{{ sublabel }}
				</slot>
			</span>
		</div>
	</label>
</template>

<script>
import { FormItemKey } from '@square/orbit/components/Form';
import { showWarning } from '@square/orbit/utils/debug';
import Key from './Key';

export default {
	name: 'ORadio',

	inheritAttrs: false,

	model: {
		prop: 'selected',
		event: 'radio:update',
	},

	props: {
		value: {
			type: null,
			required: true,
		},
		selected: {
			type: null,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		sublabel: {
			type: String,
			default: undefined,
		},
	},

	inject: {
		group: {
			from: Key,
			default: undefined,
		},
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	computed: {
		isChecked() {
			const selected = this.group ? this.group.value : this.selected;
			return selected === this.value;
		},
		isDisabled() {
			return this.disabled || (this.group && this.group.disabled);
		},
		hasSublabel() {
			return this.sublabel || this.$slots.sublabel;
		},
	},

	created() {
		if (this.formItem) {
			this.formItem.addUnwrappedChild();
		}

		if (this.sublabel && !this.$slots.default) {
			showWarning('Radio', 'You are using the `sublabel` prop or slot without default slot content. Please give the Radio a label by adding content in the default slot before adding a sublabel.');
		}
	},

	destroyed() {
		if (this.formItem) {
			this.formItem.removeUnwrappedChild();
		}
	},

	methods: {
		handleClick() {
			if (this.group) {
				this.group.value = this.value;
			} else {
				this.$emit('radio:update', this.value);
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

:root {
	--radio-background-color: #fff;
	--radio-disabled-color: var(--color-gray-20);
	--radio-border-color: var(--color-gray-30);
	--radio-hover-border-color: var(--color-gray-50);
	--radio-hover-ball-color: var(--color-gray-20);
	--radio-actionable-color: var(--color-gray-60);
	--radio-checked-color: var(--brand-color);
}

.Radio {
	display: flex;
	cursor: pointer;

	&.disabled {
		cursor: default;
	}

	&:disabled .Label,
	&.disabled .Label {
		color: var(--form-disabled-color);
	}
}

.ControlContainer {
	display: flex;
	align-items: center;
	height: var(--form-control-line-height);
}

.HiddenInput {
	position: absolute;
	width: 0;
	opacity: 0;

	/* Disabled state (including shared base styles) */
	& + .Control {
		border: 1px solid var(--form-disabled-border-color);
		background: var(--form-disabled-bg-color);
	}

	& + .Control::after {
		display: block;
		width: 100%;
		height: 100%;
		transform: scale(0.1);
		transition: transform var(--transition-base);
		border-radius: inherit;
		background-color: var(--brand-color);
		content: "";
		opacity: 0;
	}

	/* NOT Disabled */
	&:not(:disabled) {
		& + .Control {
			border: 1px solid var(--form-border-color);
			background-color: var(--form-bg-color);
		}

		/* Hover */
		&:hover + .Control {
			border-color: var(--form-hover-border-color);
		}

		/* Focus */
		&:focus + .Control {
			border-color: var(--focus-border-color);
			box-shadow: var(--focus-box-shadow);
		}

		/* Selected */
		&:checked + .Control::after {
			transform: scale(0.5);
			opacity: 1;
		}

		/* Selected & Focus */
		&:checked:focus + .Control {
			border-color: var(--focus-border-color);
			box-shadow: var(--focus-box-shadow);
		}
	}

	&:disabled:checked + .Control::after {
		transform: scale(0.5);
		opacity: 0.25;
	}
}

/* Put styles shared by Enabled and Disabled states for .Control and .Label below. */
.Control {
	width: var(--form-control-dimension);
	height: var(--form-control-dimension);
	transition:
		border-color var(--transition-base),
		box-shadow var(--transition-base);
	border-radius: 50%;
	user-select: none;
	box-sizing: border-box;
}

.LabelWrapper {
	margin-left: var(--form-control-label-gutter);
}

.Label {
	composes: font-base from "@square/orbit/styles/util.css";
	line-height: var(--form-control-line-height);

	&.hasSublabel {
		margin-bottom: var(--space);
	}
}

.Sublabel {
	composes: font-base from "@square/orbit/styles/util.css";
	display: block;
	color: var(--form-sublabel-color);
}
</style>
