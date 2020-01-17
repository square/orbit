<template>
	<component
		:is="bubble"
		v-if="bubble"
	/>
</template>
<script>
import { assert } from '@square/orbit/utils/debug';

const layers = new Map();

export default {
	name: 'SchooltipLayer',

	props: {
		id: {
			type: null,
			required: true,
		},
	},

	data() {
		return {
			bubble: null,
		};
	},

	watch: {
		id(newId, oldId) {
			layers.delete(oldId);
			this.registerLayer();
		},
	},

	beforeMount() {
		this.registerLayer();
	},

	beforeDestroy() {
		layers.delete(this.id);
	},

	methods: {
		registerLayer() {
			assert.error(!layers.has(this.id), 'SchooltipLayer', `Layer with id ${String(this.id)} already exists`);
			layers.set(this.id, this);
		},
	},

	showBubble(layerId, newBubble) {
		const layer = layers.get(layerId);
		assert.error(layer, 'SchooltipLayer', `Layer ${String(layerId)} not found`);

		layer.bubble = newBubble;
		return function remove() {
			if (layer.bubble === newBubble) {
				layer.bubble = null;
			}
		};
	},
};
</script>
