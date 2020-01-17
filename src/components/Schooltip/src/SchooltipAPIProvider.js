import SchooltipLayer from './SchooltipLayer.vue';
import SchooltipAPIKey from './SchooltipAPIKey';

// @vue/component
export default {

	data() {
		return {
			schooltipLayer: Symbol('schooltipLayer'),
		};
	},

	provide() {
		if (('hasLayers' in this) && !this.hasLayers) {
			return {};
		}

		return {
			[SchooltipAPIKey]: {
				showBubble: SchooltipLayer.showBubble.bind(SchooltipLayer, this.schooltipLayer),
			},
		};
	},
};
