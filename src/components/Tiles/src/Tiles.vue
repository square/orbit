<template>
	<div :class="$s.Tiles">
		<slot />
	</div>
</template>

<script>
import { assert } from '@square/orbit/utils/debug';
import TilesKey from './TilesKey';


export default {
	name: 'OTiles',

	model: {
		event: 'update',
	},

	provide() {
		return {
			[TilesKey]: this.api,
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
		mode: {
			type: String,
			default: 'single-select',
			validator: modeVal => ['multi-select', 'single-select'].includes(modeVal),
		},
		mandatory: {
			type: Boolean,
			default: false,
		},
		padding: {
			type: [Boolean, Number],
			default: 0,
			validator: val => [true, false, 0, 4, 8, 16, 24].includes(val),
		},
		hasIndicator: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		const vm = this;
		return {
			api: {
				get mode() {
					return vm.mode;
				},
				get value() {
					return vm.value;
				},
				get disabled() {
					return vm.disabled;
				},
				get tilePadding() {
					let { padding } = vm;
					if (typeof padding === 'boolean') {
						padding = padding ? 24 : 0;
					}
					return padding;
				},
				get hasIndicator() {
					return vm.hasIndicator;
				},
				updateSelected(newVal) {
					if (vm.mode === 'single-select') {
						if (!vm.mandatory && vm.value === newVal) {
							newVal = null;
						}
						if (vm.value !== newVal) {
							vm.$emit('update', newVal);
						}
					} else if (vm.mode === 'multi-select') {
						const arr = vm.value.slice();

						if (arr.includes(newVal)) {
							if (!vm.mandatory || (vm.mandatory && arr.length > 1)) {
								arr.splice(arr.indexOf(newVal), 1);
							}
						} else {
							arr.push(newVal);
						}

						vm.$emit('update', arr);
					}
				},
			},
		};
	},

	computed: {
		isValid() {
			return !(this.mode === 'multi-select' && !Array.isArray(this.value));
		},
	},

	watch: {
		isValid: {
			immediate: true,
			handler(isValid) {
				assert.error(isValid, 'Tiles', `The v-model value for a multi-select must be of type Array. "${this.value}" was found instead.`);
			},
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.Tiles {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: calc(-1 * var(--space-x2));
}
</style>
