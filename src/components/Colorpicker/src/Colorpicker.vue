<template>
	<o-popover
		flush
		@open="$emit('open')"
		@close="$emit('close')"
		@click="$emit('popover:click', $event)"
		@resize="resizeContent"
	>
		<template
			slot="action"
			slot-scope="popover"
		>
			<slot
				v-bind="popover"
				name="action"
			>
				<div
					:class="[
						$s.Colorpicker,
						{
							[$s.isOpen]: popover.isOpen,
							[$s.isLight]: isLight,
							[$s.disabled]: disabled,
						},
					]"
					:style="`${backgroundColor} ${shadowColor}`"
					tabindex="0"
					@click="handleClick(popover)"
				>
					<div
						:class="[
							$s.IconContainer,
							{ [$s.isHidden]: hideIcon }
						]"
					>
						<o-icon
							:class="$s.Icon"
							name="arrow-down"
						/>
					</div>
				</div>
			</slot>
		</template>

		<div
			:class="$s.PopoverContent"
			:style="contentStyles"
		>
			<o-colorpicker-palette
				v-if="palette"
				v-model="currentColor"
				:class="$s.Palette"
				:palette="palette"
			/>

			<o-colorpicker-spectrum
				v-if="showSpectrum"
				v-model="currentColor"
				:class="$s.Spectrum"
			/>

			<o-colorpicker-hex-input
				v-if="showInput"
				v-model="currentColor"
			/>
		</div>
	</o-popover>
</template>

<script>
import tinycolor from 'tinycolor2';
import { throwError } from '@square/orbit/utils/debug';

import { OPopover } from '@square/orbit/components/Popover';
import { OIcon } from '@square/orbit/components/Icon';
import OColorpickerPalette from './ColorpickerPalette.vue';
import OColorpickerSpectrum from './ColorpickerSpectrum.vue';
import OColorpickerHexInput from './ColorpickerHexInput.vue';


export default {
	name: 'OColorpicker',

	components: {
		OPopover,
		OIcon,
		OColorpickerPalette,
		OColorpickerSpectrum,
		OColorpickerHexInput,
	},

	model: {
		prop: 'color',
		event: 'colorpicker:update',
	},

	props: {
		color: {
			type: String,
			required: true,
			validator: colorVal => tinycolor(colorVal).isValid(),
		},
		hideIcon: {
			type: Boolean,
			default: false,
		},
		showSpectrum: {
			type: Boolean,
			default: false,
		},
		showInput: {
			type: Boolean,
			default: false,
		},
		palette: {
			type: Array,
			validator: paletteArr => paletteArr && paletteArr.length,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			contentStyles: {
				width: 'auto',
			},
		};
	},

	computed: {
		currentColor: {
			get() {
				return this.color.toLowerCase();
			},
			set(newColor) {
				if (newColor !== this.color) {
					this.$emit('colorpicker:update', newColor);
				}
			},
		},

		backgroundColor() {
			return `background-color: ${this.currentColor};`;
		},

		isLight() {
			return tinycolor(this.currentColor).getBrightness() > 200;
		},

		shadowColor() {
			let color = tinycolor(this.currentColor).toRgbString();
			color = tinycolor(color).setAlpha(0.3);

			return `color: ${color};`;
		},
	},

	created() {
		this.validateProps();
	},

	updated() {
		this.validateProps();
	},

	methods: {
		handleClick(popover) {
			if (!this.disabled) {
				popover.toggle();
			}
		},

		validateProps() {
			if (!this.palette && !this.showSpectrum) {
				throwError('Colorpicker', 'You must provide a palette or add the show-pectrum prop.');
			}
		},

		resizeContent() {
			const { $el } = this;
			if ($el) {
				this.contentStyles.width = `${$el.offsetWidth}px`;
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.Colorpicker {
	box-sizing: border-box;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: var(--form-height);
	transition:
		border-color var(--transition-base),
		box-shadow var(--transition-base);
	border-radius: var(--border-radius-base);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.3);
	cursor: pointer;

	&:hover {
		box-shadow:
			inset 0 0 0 1px rgba(0, 0, 0, 0.3),
			0 0 0 3px rgba(255, 255, 255, 0.66),
			0 0 0 3px currentColor;

		&.isLight {
			box-shadow:
				inset 0 0 0 1px rgba(0, 0, 0, 0.3),
				0 0 0 3px rgba(255, 255, 255, 0.66),
				var(--focus-box-shadow);
		}
	}

	&:focus,
	&:active,
	&.isOpen {
		outline: none;
		box-shadow:
			inset 0 0 0 1px rgba(0, 0, 0, 0.3),
			0 0 0 3px currentColor;

		&.isLight {
			box-shadow:
				inset 0 0 0 1px rgba(0, 0, 0, 0.3),
				var(--focus-box-shadow);
		}
	}

	&.disabled {
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.3);
		cursor: default;
		opacity: 0.5;
	}
}

.IconContainer {
	flex: 0 0 auto;
	padding: 0 var(--space-x2);
	transition: border-color var(--transition-base);
	border: var(--form-border);
	border-top-right-radius: var(--border-radius-base);
	border-bottom-right-radius: var(--border-radius-base);
	background: var(--color-white);
	line-height: 36px;

	&.isHidden {
		display: none;
	}

	& .Icon {
		color: var(--color-gray-60);
	}
}

.PopoverContent {
	/* min width required to fit 6 color swatches in a row */
	min-width: 184px;
	padding: var(--space-x2);
	box-sizing: border-box;
}

.Palette + .Spectrum {
	margin-top: var(--space-x2);
}
</style>
