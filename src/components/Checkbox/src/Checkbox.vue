<template>
	<fieldset
		:class="$s.Wrapper"
		:disabled="$attrs.disabled"
	>
		<label :class="$s.Checkbox">
			<div :class="$s.ControlContainer">
				<input
					v-model="checkVal"
					:class="$s.HiddenInput"
					:value="value"
					:true-value="trueValue"
					:false-value="falseValue"
					v-bind="$attrs"
					type="checkbox"
					v-on="$listeners"
				>
				<div :class="$s.Control">
					<box-check :class="$s.BoxCheck" />
				</div>
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
					<!-- The checkbox label -->
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
	</fieldset>
</template>

<script>
import { showWarning } from '@square/orbit/utils/debug';
import { FormItemKey } from '@square/orbit/components/Form';
import BoxCheck from './BoxCheck.vue';

export default {
	name: 'OCheckbox',

	components: {
		BoxCheck,
	},

	inheritAttrs: false,

	model: {
		prop: 'checked',
		event: 'checkbox:update',
	},

	inject: {
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	props: {
		/**
		 * The variable to compare true-value against
		 * @model
		*/
		checked: {
			type: null,
			default: undefined,
		},
		// The value the checked state represents
		trueValue: {
			type: null,
			default: true,
		},
		// The value the checked state represents
		falseValue: {
			type: null,
			default: false,
		},
		/**
		 * **Only use when multiple checkboxes are bound to the same
		 * model.** The `value` prop provides the item to be added/removed
		 * from the Array depending on checkbox state.
		 * @dontDemo
		*/
		value: {
			type: null,
			default: undefined,
		},
		/**
		 * A short description that appears underneath the checkbox label/default slot
		 * content. Please only use if you have default slot content.
		 */
		sublabel: {
			type: String,
			default: undefined,
		},
	},

	computed: {
		checkVal: {
			get() {
				return this.checked;
			},
			set(newVal) {
				this.$emit('checkbox:update', newVal);
			},
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
			showWarning('Checkbox', 'You are using the `sublabel` prop or slot without default slot content. Please give the checkbox a label by adding content in the default slot before adding a sublabel.');
		}
	},

	destroyed() {
		if (this.formItem) {
			this.formItem.removeUnwrappedChild();
		}
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.Wrapper {
	margin: 0;
	padding: 0;
	border: none;

	&:disabled {
		& .Label {
			color: var(--form-disabled-color);
		}

		& .Checkbox {
			cursor: default;
		}
	}

	& + .Wrapper {
		margin-top: var(--space);
	}
}

.Checkbox {
	display: flex;
	cursor: pointer;
}

.ControlContainer {
	display: flex;
	align-items: center;
	height: var(--form-control-line-height);
}

.Control {
	position: relative;
	width: var(--form-control-dimension);
	height: var(--form-control-dimension);
	transition:
		box-shadow var(--transition-base),
		background-color var(--transition-time) ease-out;
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	z-index: 0;
	user-select: none;
	box-sizing: border-box;
}

.LabelWrapper {
	margin-left: var(--form-control-label-gutter);
}

.Label {
	composes: font-base from "@square/orbit/styles/util.css";
	transition: color var(--transition-base);
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

.HiddenInput {
	position: absolute;
	width: 0;
	opacity: 0;

	/* Disabled state (including shared base styles) */
	& + .Control {
		background: var(--form-disabled-bg-color);
		box-shadow: inset 0 0 0 1px var(--disabled-border-color);
	}

	/* Disabled & Selected */
	&:checked + .Control {
		& .BoxCheck {
			opacity: 0.25;

			&::before,
			&::after {
				background-color: var(--brand-color);
			}

			&::before {
				height: 100%;
			}

			&::after {
				width: 100%;
			}
		}
	}

	/* NOT Disabled */
	&:not(:disabled) {
		& + .Control {
			background: var(--form-bg-color);
			box-shadow: inset 0 0 0 1px var(--form-border-color);
		}

		/* Hover */
		&:hover + .Control {
			box-shadow: inset 0 0 0 1px var(--form-hover-border-color);
		}

		/* Focus */
		&:focus + .Control {
			box-shadow:
				var(--focus-box-shadow),
				var(--focus-box-shadow-inset);
		}

		/* Selected */
		&:checked + .Control {
			& .BoxCheck {
				opacity: 1;

				&::before,
				&::after {
					background-color: var(--brand-color);
				}
			}
		}

		/* Selected & Focus */
		&:checked:focus + .Control {
			border: none;
			box-shadow:
				var(--focus-box-shadow),
				var(--focus-box-shadow-inset);
		}
	}
}
</style>
