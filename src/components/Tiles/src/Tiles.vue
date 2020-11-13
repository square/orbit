<template>
	<div :class="$s.Tiles">
		<proxi
			:proxi-key="key"
			:selected-value="value"
			:mode="mode"
			:disabled="disabled"
			:checkable="hasIndicator"
			:padding="tilePadding"
			@tile:select="updateSelected"
		>
			<slot />
		</proxi>
	</div>
</template>

<script>
import Proxi from 'vue-proxi';
import { assert } from '@square/orbit/utils/debug';
import { TileKey } from '@square/orbit/components/Tile';

export default {
	name: 'OTiles',

	components: {
		Proxi,
	},

	model: {
		event: 'update',
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
			validator: (modeVal) => ['multi-select', 'single-select'].includes(modeVal),
		},
		mandatory: {
			type: Boolean,
			default: false,
		},
		padding: {
			type: [Boolean, Number],
			default: 0,
			validator: (val) => [true, false, 0, 4, 8, 16, 24].includes(val),
		},
		hasIndicator: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			key: TileKey,
		};
	},

	computed: {
		isValid() {
			return !(this.mode === 'multi-select' && !Array.isArray(this.value));
		},
		tilePadding() {
			let { padding } = this;
			if (typeof padding === 'boolean') {
				padding = padding ? 24 : 0;
			}
			return padding;
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

	methods: {
		updateSelected(newVal) {
			if (this.mode === 'single-select') {
				if (!this.mandatory && this.value === newVal) {
					newVal = null;
				}
				if (this.value !== newVal) {
					this.$emit('update', newVal);
				}
				return;
			}

			if (this.mode === 'multi-select') {
				const arr = this.value.slice();

				if (arr.includes(newVal)) {
					if (!this.mandatory || (this.mandatory && arr.length > 1)) {
						arr.splice(arr.indexOf(newVal), 1);
					}
				} else {
					arr.push(newVal);
				}

				this.$emit('update', arr);
			}
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
