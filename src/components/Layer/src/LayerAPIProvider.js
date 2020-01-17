import { API } from './Layers';
import APIKey from './APIKey';

// @vue/component
export default {

	data() {
		return {
			layerKey: Symbol('layer'),
		};
	},

	provide() {
		if (('hasLayers' in this) && !this.hasLayers) {
			return {};
		}

		return {
			[APIKey]: Object.assign(
				Object.create(API),
				{ layerId: this.layerKey },
			),
		};
	},
};
