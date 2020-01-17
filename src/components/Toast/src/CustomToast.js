import CustomToastKey from './CustomToastKey';

// @vue/component
export default {
	props: {
		renderFunc: {
			type: Function,
			required: true,
		},
	},

	provide() {
		return {
			[CustomToastKey]: {
				closeToast: () => this.$emit('toast:request-close'),
			},
		};
	},

	render(h) {
		return this.renderFunc(h);
	},
};
