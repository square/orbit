<template>
	<o-form-item
		:class="$s.ColorpickerHexInput"
		:errors="!isValid"
	>
		<o-input
			ref="input"
			v-model="color_"
			prefix="#"
			@keydown.enter="updateColor"
			@blur="updateColor"
		/>
	</o-form-item>
</template>

<script>
import tinycolor from 'tinycolor2';
import { OFormItem } from '@square/orbit/components/Form';
import { OInput } from '@square/orbit/components/Input';


export default {
	name: 'OColorpickerHexInput',

	components: {
		OFormItem,
		OInput,
	},

	model: {
		prop: 'color',
		event: 'colorpicker-hex-input:update',
	},

	props: {
		color: {
			type: String,
			default: undefined,
		},
	},

	data() {
		return {
			color_: tinycolor(this.color).toHex(),
		};
	},

	computed: {
		isValid() {
			return tinycolor(this.color_).isValid();
		},
	},

	watch: {
		color(color) {
			this.color_ = tinycolor(color).toHex();
		},
	},

	methods: {
		updateColor() {
			if (!this.isValid) {
				return;
			}

			this.$refs.input.blur();

			const color = tinycolor(this.color_).toHexString();
			this.$emit('colorpicker-hex-input:update', color);
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.ColorpickerHexInput {
	margin-top: var(--space-x2);
	margin-bottom: 0 !important;
}
</style>
