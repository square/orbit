import PopoverKey from './PopoverKey';

// @vue/component
export default {

	data() {
		return {
			popoverLayer: Symbol('popoverLayer'),
		};
	},

	provide() {
		if (('hasLayers' in this) && !this.hasLayers) {
			return {};
		}

		return {
			[PopoverKey]: this.popoverLayer,
		};
	},
};
