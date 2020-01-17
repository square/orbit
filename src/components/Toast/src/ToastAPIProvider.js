import { openInLayer } from './ToastLayers';
import ToastAPIKey from './ToastAPIKey';

// @vue/component
export default {

	data() {
		return {
			toastLayer: Symbol('toastLayer'),
		};
	},

	provide() {
		if (('hasLayers' in this) && !this.hasLayers) {
			return {};
		}

		return {
			[ToastAPIKey]: {
				show: toast => openInLayer(this.toastLayer, toast),
			},
		};
	},
};
