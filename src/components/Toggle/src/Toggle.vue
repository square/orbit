<template>
	<fieldset
		:class="$s.Wrapper"
		:disabled="disabledAttr"
	>
		<label :class="$s.Toggle">
			<div :class="$s.ControlContainer">
				<input
					ref="hidden"
					:class="$s.HiddenInput"
					v-bind="$attrs"
					:checked="checked === (trueValue || value)"
					:value="value"
					type="checkbox"
					v-on="$listeners"
					@change="handleChange"
				>
				<div :class="$s.Control">
					<div :class="$s.ToggleBall" />
				</div>
			</div>
			<div
				v-if="$slots.default"
				:class="$s.LabelWrapper"
			>
				<span
					:class="$s.Label"
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
	</fieldset>
</template>

<script>
import { showWarning } from '@square/orbit/utils/debug';

export default {
	name: 'OToggle',

	inheritAttrs: false,

	model: {
		prop: 'checked',
		event: 'toggle:update',
	},

	props: {
		/**
		 * Passed in by v-model
		 * @model
		*/
		checked: {
			type: null,
			default: undefined,
		},

		// The toggle value
		value: {
			type: [String, Boolean],
			default: true,
		},
		// True value of Toggle
		trueValue: {
			type: null,
			default: undefined,
		},
		// False value of Toggle.
		falseValue: {
			type: null,
			default: undefined,
		},
		sublabel: {
			type: String,
			default: undefined,
		},
	},

	computed: {
		disabledAttr() {
			return this.$attrs.disabled;
		},

		hasSublabel() {
			return this.sublabel || this.$slots.sublabel;
		},
	},

	created() {
		if (this.sublabel && !this.$slots.default) {
			showWarning('Toggle', 'You are using the `sublabel` prop or slot without default slot content. Please give the Toggle a label by adding content in the default slot before adding a sublabel.');
		}
	},

	methods: {
		handleChange(e) {
			let val;
			if (e.target.checked) {
				val = (this.trueValue !== undefined) ? this.trueValue : (this.value || true);
			} else {
				val = (this.falseValue !== undefined) ? this.falseValue : false;
			}

			this.$emit('toggle:update', val);
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

/*
+-------------------------------------------+
|   +-------+                               |
|   |       |      distance-from-far-edge   |
|   |       | +---------------------------+ |
|   |       |                               |
| ^ +-------+                               |
+-|-----------------------------------------+
  |
  | ball-inset

*/
:root {
	--toggle-height: var(--form-control-dimension);
	--toggle-width: calc(var(--toggle-height) * 2);
	--toggle-off-color: var(--color-gray-40);
	--toggle-on-color: var(--brand-color);
	--toggle-ball-inset: 2px;
	--toggle-ball-dimension: calc(var(--toggle-height) - (var(--toggle-ball-inset) * 2));
	--toggle-ball-hover-stretch: 2px;
	--toggle-ball-distance-from-far-edge:
		calc(
			var(--toggle-width)
			- var(--toggle-ball-dimension)
			- var(--toggle-ball-inset)
		);
}

.Wrapper {
	margin: 0;
	padding: 0;
	border: none;

	&:disabled {
		& .Label {
			color: var(--form-disabled-color);
		}

		& .Toggle {
			cursor: default;
		}
	}
}

.Toggle {
	display: inline-flex;
	position: relative;
	user-select: none;
	cursor: pointer;
}

.Label {
	composes: font-base from "@square/orbit/styles/util.css";
	transition: color var(--transition-base);
	line-height: var(--form-control-line-height);

	&.disabled {
		color: var(--form-disabled-color);
	}
}

.HiddenInput {
	position: absolute;
	opacity: 0;
}

.ControlContainer {
	display: flex;
	align-items: center;
	height: var(--form-control-line-height);
}

/* Disabled + Unchecked */
.Control {
	display: inline-block;
	position: relative;
	width: var(--toggle-width);
	height: var(--toggle-height);
	box-sizing: border-box;
	transition:
		box-shadow var(--transition-base),
		background-color var(--transition-base);
	border-radius: calc(var(--toggle-width) / 2);
	background-color: var(--form-disabled-bg-color);
	vertical-align: middle;
}

.ToggleBall {
	position: absolute;
	top: var(--toggle-ball-inset);
	right: var(--toggle-ball-distance-from-far-edge);
	left: var(--toggle-ball-inset);
	box-sizing: border-box;
	height: var(--toggle-ball-dimension);
	transition:
		right var(--transition-base),
		left var(--transition-base),
		background-color var(--transition-base),
		opacity var(--transition-base);
	border-radius: inherit;

	&::after {
		display: block;
		width: 100%;
		height: 100%;
		transition: transform var(--transition-base);
		border-radius: inherit;
		background-color: var(--color-white);
		box-shadow: 0 0 0 8px transparent;
		content: "";
	}
}

/* Disabled + Checked */
.HiddenInput:checked + .Control {
	background-color: var(--toggle-on-color);
	opacity: 0.25;

	& .ToggleBall {
		right: var(--toggle-ball-inset);
		left: var(--toggle-ball-distance-from-far-edge);
	}
}

/* Enabled + Unchecked */
.HiddenInput:not(:disabled) + .Control {
	background-color: var(--toggle-off-color);

	& .ToggleBall {
		left: var(--toggle-ball-inset);
	}

	& .ToggleBall::after {
		background-color: var(--color-white);
	}

	&:hover {
		& .ToggleBall {
			right: calc(var(--toggle-ball-distance-from-far-edge) - var(--toggle-ball-hover-stretch));
		}
	}

	&:active {
		background-color: color(var(--toggle-off-color) blackness(+20%));
	}
}

/* Enabled + Checked */
.HiddenInput:not(:disabled):checked + .Control {
	background-color: var(--toggle-on-color);
	opacity: 1;

	& .ToggleBall {
		left: var(--toggle-ball-distance-from-far-edge);
	}

	&:hover .ToggleBall {
		right: var(--toggle-ball-inset);
		left: calc(var(--toggle-ball-distance-from-far-edge) - var(--toggle-ball-hover-stretch));
	}

	&:active {
		background-color: color(var(--toggle-on-color) blackness(+20%));
	}
}

/* Focus (enabled) + Unchecked */
.HiddenInput:focus + .Control {
	box-shadow: var(--focus-box-shadow);
}

.HiddenInput:focus:checked + .Control {
	box-shadow: var(--focus-box-shadow);
}

.LabelWrapper {
	margin-left: var(--form-control-label-gutter);
}

.Sublabel {
	composes: font-base from "@square/orbit/styles/util.css";
	display: block;
	color: var(--form-sublabel-color);
}
</style>
