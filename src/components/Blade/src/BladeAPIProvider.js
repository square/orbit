import BladeLayer from './BladeLayer.vue';
import { BladeLayerKey } from './Keys';

export default {
	data() {
		return {
			bladeLayer: Symbol('bladeLayer'),
		};
	},

	provide() {
		if (('hasLayers' in this) && !this.hasLayers) {
			return {};
		}

		return {
			[BladeLayerKey]: {
				open: (...args) => BladeLayer.open(this.bladeLayer, ...args),
			},
		};
	},
};
