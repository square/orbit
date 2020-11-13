<template>
	<fieldset
		:class="$s.Wrapper"
		:disabled="$attrs.disabled"
	>
		<div :class="$s.SliderContainer">
			<input
				v-model.number="rangeVal"
				:class="[$s.Slider, $s[`theme_${sliderTheme}`]]"
				:style="sliderGradientStyle"
				:min="min"
				:max="max"
				v-bind="$attrs"
				type="range"
				v-on="$listeners"
			>
			<div
				v-if="showValue"
				:class="$s.Value"
				:style="{ width: valueWidth }"
			>
				{{ value }}
				<span v-if="suffix">{{ suffix }}</span>
			</div>

			<!-- For width calculation purposes only. -->
			<div
				v-if="showValue && !valueWidth"
				ref="ghostVal"
				:class="$s.Hidden"
			>
				{{ max }}
				<span v-if="suffix">{{ suffix }}</span>
			</div>
		</div>
	</fieldset>
</template>

<script>

const SLIDER_GRADIENT_DEFAULT = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'];

export default {
	name: 'OSlider',

	inheritAttrs: false,

	model: {
		event: 'slider:update',
	},

	props: {
		value: {
			type: Number,
			default: 0,
		},
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 100,
		},
		suffix: {
			type: [String],
			default: undefined,
		},
		showValue: {
			type: Boolean,
			default: false,
		},
		theme: {
			type: String,
			default: 'default',
			validator: (themeVal) => ['default', 'hue', 'gradient'].includes(themeVal),
		},
		sliderGradient: {
			type: Array,
			default: () => SLIDER_GRADIENT_DEFAULT,
			validator: (colors) => colors.length > 1,
		},
	},

	data() {
		return {
			valueWidth: 0,
		};
	},

	computed: {
		rangeVal: {
			get() {
				return this.value;
			},

			set(val) {
				this.$emit('slider:update', val);
			},
		},
		sliderGradientStyle() {
			const sliderGradient = this.theme === 'hue' ? SLIDER_GRADIENT_DEFAULT : this.sliderGradient;
			return `--slider-track-gradient-background: linear-gradient(to right, ${sliderGradient})`;
		},
		sliderTheme() {
			if (this.theme === 'hue') {
				return 'gradient';
			}
			return this.theme;
		},
	},

	mounted() {
		if (this.showValue) {
			this.calculateValueWidth();
		}
	},

	methods: {
		calculateValueWidth() {
			this.valueWidth = `${this.$refs.ghostVal.offsetWidth}px`;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

:root {
	/* Base variables */
	--slider-width: 100%;
	--slider-height: 16px;

	/* Track variables */
	--slider-track-background: var(--color-gray-30);
	--slider-track-height: 2px;
	--slider-track-gradient-border-color: rgba(0, 0, 0, 0.1);
	--slider-track-gradient-height: 6px;
	--slider-track-gradient-border-radius: 6px;

	/* Thumb variables */
	--slider-thumb-dimension: var(--slider-height);
	--slider-thumb-margin-top: -7px;
	--slider-thumb-background-color: var(--color-white);
	--slider-thumb-border-color: var(--color-gray-30);
	--slider-thumb-hover-border-color: var(--color-gray-50);
	--slider-thumb-focus-border: 2px solid var(--brand-color);

	/* Thumb Theme Hue */
	--slider-thumb-hue-margin-top: -6px;

	/* Value Variables */
	--slider-value-color: var(--color-gray-60);
	--slider-value-font-size: var(--form-font-size);
	--slider-value-margin-left: var(--space);

	/* Disabled */
	--slider-disabled-track-background-color: #e2e8ef;
	--slider-disabled-thumb-background-color: var(--color-gray-10);
	--slider-disabled-thumb-border-color: var(--color-gray-20);
	--slider-disabled-value-color: #66788c;
}

.Wrapper {
	margin: 0;
	padding: 0;
	border: 0;
}

.SliderContainer {
	display: flex;
	align-items: center;
}

/* stylelint-disable no-descending-specificity */
.Slider {
	width: var(--slider-width);
	height: var(--slider-height);
	margin: 0;
	padding: 0;
	appearance: none;
	background: transparent;
	cursor: pointer;

	/* Resets
	--------------------------------------------- */
	&::-ms-track {
		border-color: transparent;
		color: transparent;
		cursor: pointer;
	}

	&::-moz-range-track {
		border: none;
		color: transparent;
	}

	&:focus {
		outline: none;
	}

	&::-moz-focus-outer {
		border: 0;
	}

	/* Thumb
	--------------------------------------------- */
	&::range-thumb {
		width: var(--slider-thumb-dimension);
		height: var(--slider-thumb-dimension);
		transition: border-color var(--transition-base), box-shadow var(--transition-base);
		border: 1px solid var(--color-gray-40);
		border-radius: 50%;
		background-color: var(--color-white);
		box-shadow: none;
		box-sizing: border-box;
		appearance: none;
	}

	&::-webkit-slider-thumb {
		margin-top: calc((var(--slider-thumb-dimension) - var(--slider-track-height)) / -2);
	}

	&::-ms-thumb {
		margin-top: 0;  /* Cancels the margin required for -webkit */
	}

	/* Track
	--------------------------------------------- */
	&::range-track {
		width: var(--slider-width);
		border: 0;
		box-shadow: none;
	}

	/* Themes
	--------------------------------------------- */
	&.theme_default {
		&::range-track {
			height: var(--slider-track-height);
			background-color: var(--slider-track-background);
		}

		&::-ms-track {
			background-color: transparent;
		}

		&::-ms-fill-lower {
			border-top-left-radius: var(--border-radius-base);
			border-bottom-left-radius: var(--border-radius-base);
			background-color: var(--slider-track-background);
		}

		&::-ms-fill-upper {
			border-top-right-radius: var(--border-radius-base);
			border-bottom-right-radius: var(--border-radius-base);
			background-color: var(--slider-track-background);
		}
	}

	&.theme_gradient {
		&::range-track {
			height: var(--slider-track-gradient-height);
			border-radius: var(--slider-track-gradient-border-radius);
			background: var(--slider-track-gradient-background);
			box-shadow: inset 0 0 0 1px var(--slider-track-gradient-border-color);
		}

		&::-webkit-slider-thumb {
			margin-top: calc((var(--slider-thumb-dimension) - var(--slider-track-gradient-height)) / -2);
		}

		&::-ms-track {
			height: 4px;
			border: 1px solid var(--slider-track-gradient-border-color);
			border-radius: 0;
			box-shadow: none;
		}

		&::-ms-fill-lower {
			background-color: transparent;
		}

		&::-ms-fill-upper {
			background-color: transparent;
		}

		&::-ms-thumb {
			margin-top: 0; /* Cancels the margin required for -webkit */
		}
	}

	/* States
	--------------------------------------------- */
	&:disabled {
		cursor: auto;

		/* Tracks
		-------------------- */
		&::range-track {
			background: var(--slider-disabled-track-background-color);
		}

		&::-ms-track {
			box-shadow: none;
		}

		/* Thumbs
		-------------------- */
		&::range-thumb {
			border-color: var(--slider-disabled-thumb-border-color);
			background-color: var(--slider-disabled-thumb-background-color);
		}
	}

	&:not(:disabled) {
		&:hover {
			&::range-thumb {
				border-color: var(--color-gray-50);
			}
		}

		&:focus,
		&:active {
			&::range-thumb {
				border-color: var(--focus-border-color);
				box-shadow: var(--focus-box-shadow);
			}
		}
	}
}

/* stylelint-enable no-descending-specificity */

.Value {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	align-items: center;
	height: var(--slider-height);
	margin-left: var(--slider-value-margin-left);
	color: var(--slider-value-color);
	font-size: var(--slider-value-font-size);
}

.Wrapper:disabled .Value {
	color: var(--slider-disabled-value-color);
}

.Hidden {
	position: absolute;
	visibility: hidden;
}
</style>
