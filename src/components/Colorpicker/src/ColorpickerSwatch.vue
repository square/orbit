<template>
	<div
		:class="$s.ColorpickerSwatch"
		:style="backgroundColor"
		tabindex="0"
		v-on="$listeners"
	>
		<o-icon
			:class="[
				$s.Icon,
				{
					[$s.light]: isLight,
					[$s.isSelected]: selected,
				},
			]"
			name="check"
		/>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import tinycolor from 'tinycolor2';


export default {
	name: 'OColorpickerSwatch',

	components: {
		OIcon,
	},

	props: {
		color: {
			type: String,
			required: true,
			validator: colorVal => tinycolor(colorVal).isValid(),
		},
		selected: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		backgroundColor() {
			return { backgroundColor: this.color };
		},

		isLight() {
			return tinycolor(this.color).getBrightness() > 200;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.ColorpickerSwatch {
	display: flex;
	align-items: center;
	justify-content: center;
	width: var(--space-x3);
	height: var(--space-x3);
	transition:
		background-color var(--transition-base),
		box-shadow var(--transition-base);
	border-radius: var(--border-radius-base);
	color: var(--color-white);
	text-align: center;
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	box-sizing: border-box;

	&:focus,
	&:active {
		outline: none;
	}
}

.Icon {
	transition: opacity var(--transition-base);
	opacity: 0;

	&.light {
		color: var(--font-color-base);
	}

	&.isSelected {
		opacity: 1;
	}
}

.ColorpickerSwatch:hover {
	& .Icon:not(.isSelected) {
		opacity: 0.5;
	}
}
</style>
