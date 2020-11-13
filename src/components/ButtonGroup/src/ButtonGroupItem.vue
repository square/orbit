<template>
	<o-button
		:class="[
			group.$s.ButtonWrapper,
			{ [$s['full-width']]: isFullWidth },
		]"
		:size="size"
		:full-width="isFullWidth"
		:disabled="isDisabled"
		:selected="isSelected"
		@click="updateSelected"
		v-on="$listeners"
	>
		<slot />
	</o-button>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import { OButton, ButtonKey } from '@square/orbit/components/Button';
import isNil from 'lodash/isNil';
import Key from './Key';

export default {
	name: 'OButtonGroupItem',

	components: {
		OButton,
	},

	inject: {
		group: Key,
	},

	provide() {
		return {
			[ButtonKey]: this.buttonApi,
		};
	},

	props: {
		value: {
			type: null,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			buttonApi: {
				className: this.buttonClasses,
			},
		};
	},

	computed: {
		isSelected() {
			const { group, value } = this;

			if (group.mode.startsWith('single-select')) {
				return group.value === value;
			}

			if (group.mode === 'multi-select') {
				return group.value.includes(value);
			}

			return false;
		},
		isDisabled() {
			return this.group._disabled || this.disabled;
		},
		isFullWidth() {
			return this.group._fullWidth;
		},
		size() {
			return this.group._size;
		},
		buttonClasses() {
			return [
				this.group.$s.Button,
				{ [this.group.$s.selected]: this.isSelected },
				{ [this.group.$s.disabled]: this.isDisabled },
			];
		},
	},

	watch: {
		buttonClasses(value) {
			this.buttonApi.className = value;
		},
	},

	mounted() {
		if (this.group.mode !== 'normal' && isNil(this.value)) {
			throwError('ButtonGroupItem', `The 'value' property is required for ButtonGroupItems within a ButtonGroup with mode '${this.group.mode}'`);
		}

		this.buttonApi.className = this.buttonClasses;
	},

	methods: {
		updateSelected() {
			this.group.updateSelected(this.value);
		},
	},
};
</script>

<style module="$s">
.full-width {
	width: 100%;
}
</style>
