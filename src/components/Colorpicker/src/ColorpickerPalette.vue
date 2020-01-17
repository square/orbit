<template>
	<div :class="$s.Palette">
		<template v-for="(swatchColor, idx) in palette">
			<o-colorpicker-swatch
				:key="idx"
				:class="$s.Swatch"
				:color="swatchColor"
				:selected="color.toLowerCase() === swatchColor.toLowerCase()"
				@click="$emit('colorpicker-palette:update', swatchColor.toLowerCase())"
			/>
		</template>
	</div>
</template>

<script>
import OColorpickerSwatch from './ColorpickerSwatch.vue';


export default {
	name: 'OColorpickerPalette',

	components: {
		OColorpickerSwatch,
	},

	model: {
		prop: 'color',
		event: 'colorpicker-palette:update',
	},

	props: {
		color: {
			type: String,
			default: undefined,
		},
		palette: {
			type: Array,
			required: true,
		},
	},

	computed: {
		computedSpan() {
			return Array(this.palette.length).fill(2);
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.Palette {
	display: flex;
	flex-wrap: wrap;
	margin: calc(var(--space-half) * -1);
}

.Swatch {
	margin: var(--space-half);
}
</style>
