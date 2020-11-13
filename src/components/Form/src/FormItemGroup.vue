<template>
	<fieldset
		ref="fieldset"
		v-bind="$attrs"
		:class="[
			$s.FormGroup,
			{
				[$s.flush]: flush,
			},
		]"
		:disabled="disabled"
		v-on="$listeners"
	>
		<legend
			v-if="label"
			:class="$s.LabelText"
		>
			{{ label }}
		</legend>

		<slot />
	</fieldset>
</template>

<script>
import { showWarning } from '@square/orbit/utils/debug';
import FormItemGroupKey from './FormItemGroupKey';

export default {
	name: 'OFormItemGroup',

	provide() {
		return {
			[FormItemGroupKey]: this.api,
		};
	},

	props: {
		label: {
			type: String,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		flush: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		const vm = this;
		return {
			api: {
				get flush() {
					return vm.flush;
				},
			},
		};
	},

	mounted() {
		this.checkFieldsetCSS();
	},

	methods: {
		checkFieldsetCSS() {
			if (getComputedStyle(this.$refs.fieldset).display.indexOf('flex') !== -1) {
				showWarning('FormItemGroup', 'Setting `display: flex` or `display: inline-flex` on this component will not behave as expected. This is a quirk with the fieldset HTML element. Instead, use our Grid component for the layout.');
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.FormGroup {
	box-sizing: border-box;
	margin-bottom: var(--space-x2);
	padding: 0;
	border: 0;
}

.FormGroup.flush {
	margin-bottom: 0;
}

.LabelText {
	composes: font-base from "@square/orbit/styles/util.css";
	display: block;
	flex-basis: 100%;
	margin-bottom: var(--space);
	color: var(--form-label-color);
	font-size: var(--font-size-base);
	font-weight: var(--form-label-font-weight);
	line-height: var(--form-label-line-height);
}
</style>
