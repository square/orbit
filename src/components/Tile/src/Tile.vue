<template>
	<div
		:class="[
			$s.Tile,
			{
				[$s.disabled]: isDisabled,
				[$s.selected]: isSelected,
				[$s.checkable]: checkable,
			},
		]"
		:tabindex="isDisabled ? -1 : 0"
		:aria-pressed="isSelected"
		:aria-disabled="isDisabled"
		:style="styles"
		role="button"
		@click="selectTile"
		@keydown.space.enter.prevent="selectTile"
		v-on="$listeners"
	>
		<slot />
		<div
			v-if="checkable"
			:class="$s.Control"
		>
			<box-check :class="$s.BoxCheck" />
		</div>
	</div>
</template>

<script>
import { BoxCheck } from '@square/orbit/components/Checkbox';
import { ProxiInject } from 'vue-proxi';
import TileKey from './TileKey';

export default {
	name: 'OTile',

	components: {
		BoxCheck,
	},

	mixins: [
		ProxiInject({
			from: TileKey,
			props: [
				'selectedValue',
				'mode',
				'checkable',
				'padding',
			],
		}),
	],

	model: {
		prop: 'selectedOption',
		event: 'tile:select-option',
	},

	props: {
		value: {
			type: null,
			default: undefined,
		},
		selectedOption: {
			type: null,
			default: undefined,
		},
		options: {
			type: Array,
			default: undefined,
		},
		optionComparator: {
			type: Function,
			default: (a, b) => (a === b),
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		isSelected() {
			const { mode, selectedValue, value } = this;
			if (mode === 'single-select') {
				return selectedValue === value;
			}

			if (mode === 'multi-select') {
				return selectedValue.includes(value);
			}

			return false;
		},

		isDisabled() {
			return this.$$.attrs.disabled || this.disabled;
		},

		styles() {
			if (!this.padding) { return ''; }
			return {
				padding: `${this.padding}px`,
			};
		},

	},
	methods: {
		selectNext() {
			if (!this.options) {
				return undefined;
			}

			const idx = this.options.findIndex(
				(option) => this.optionComparator(option, this.selectedOption),
			);

			if (idx === -1) {
				return this.options[0];
			}

			const nextIdx = (idx + 1) % this.options.length;
			return this.options[nextIdx];
		},

		selectTile() {
			if (this.value) {
				if (this.selectedValue !== this.value) {
					this.$emit('tile:select', this.value);
					return;
				}
			}

			const val = this.selectNext();
			if (val) {
				this.$emit('tile:select-option', val);
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars-form.css";
@import "@square/orbit/styles/vars.css";

.Control {
	position: absolute;
	top: -12px;
	right: -12px;
	width: var(--space-x3);
	height: var(--space-x3);
	transition:
		box-shadow var(--transition-base),
		background-color var(--transition-time) ease-out;
	border-radius: 50%;
	background-color: var(--color-white);
	box-shadow: 0 0 0 2px var(--color-white);
	opacity: 0;
	box-sizing: border-box;
	user-select: none;
}

.BoxCheck {
	&::before,
	&::after {
		background-color: var(--color-gray-40);
	}
}

.Tile {
	composes: font-base from "@square/orbit/styles/util.css";
	position: relative;
	flex: 0 1 auto;
	margin: 0 var(--space-x2) var(--space-x2) 0;
	transition:
		background var(--transition-base),
		box-shadow var(--transition-base);
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	font-size: var(--font-size-base);
	box-shadow:
		inset 0 0 0 2px transparent,
		0 0 0 1px var(--color-gray-30);
	cursor: pointer;
	box-sizing: border-box;

	& img {
		display: block;
	}

	&:not(.selected):hover {
		background-color: var(--color-gray-10);
		box-shadow:
			inset 0 0 0 2px transparent,
			0 0 0 1px var(--color-gray-50);

		&:focus {
			box-shadow:
				inset 0 0 0 2px var(--color-white),
				0 0 0 1px var(--focus-color),
				0 0 0 4px var(--focus-color-light);
		}
	}

	&:focus {
		outline: none;
		box-shadow:
			inset 0 0 0 2px var(--color-white),
			0 0 0 1px var(--focus-color),
			0 0 0 4px var(--focus-color-light);
	}

	&:not(.checkable) {
		overflow: hidden;
	}

	&.disabled {
		background-color: var(--disabled-bg-color);
		color: var(--disabled-color);
		box-shadow: 0 0 0 1px var(--color-gray-20);
		cursor: default;
		pointer-events: none;

		&::after {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: var(--color-gray-10);
			content: "";
			opacity: 0.4;
		}
	}

	&.selected {
		box-shadow:
			inset 0 0 0 2px var(--color-white),
			0 0 0 2px var(--selected-color);

		&:focus {
			box-shadow:
				inset 0 0 0 2px var(--color-white),
				0 0 0 2px var(--selected-color),
				0 0 0 5px var(--focus-color-light);
		}

		&.disabled {
			box-shadow: 0 0 0 1px var(--disabled-border-color);
		}
	}

	/* Indicator: Disabled & Selected
	--------------------------------------------- */
	&.selected .Control {
		background-color: var(--form-disabled-border-color);
		box-shadow:
			0 0 0 2px var(--color-white),
			inset 0 0 0 1px var(--form-disabled-border-color);
	}

	&.selected .BoxCheck {
		&::before,
		&::after {
			background-color: var(--color-white);
		}

		&::before {
			height: 100%;
		}

		&::after {
			width: 100%;
		}
	}

	/* Indicator: NOT Disabled
	--------------------------------------------- */
	&:not(.disabled) {
		& .Control {
			background: var(--form-bg-color);
			box-shadow:
				0 0 0 2px var(--color-white),
				inset 0 0 0 1px var(--form-border-color);
		}

		/* Hover */
		&:hover .Control {
			opacity: 1;
		}

		&:hover .BoxCheck {
			&::before {
				height: 100%;
			}

			&::after {
				width: 100%;
			}
		}
	}

	/* Selected */
	&:not(.disabled).selected {
		& .Control {
			background-color: var(--brand-color);
			box-shadow:
				0 0 0 2px var(--color-white),
				inset 0 0 0 1px var(--brand-color);
			opacity: 1;
		}

		& .BoxCheck {
			opacity: 1;

			&::before,
			&::after {
				background-color: var(--color-white);
			}

			&::before {
				height: 100%;
			}

			&::after {
				width: 100%;
			}
		}
	}
}
</style>
