<script>
import { throwError } from '@square/orbit/utils/debug';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import Key from './Key';
import StepItem from './StepItem.vue';


export default {
	name: 'OSteps',

	model: {
		prop: 'currentStep',
		event: 'steps:change',
	},

	props: {
		clickable: {
			type: Boolean,
			default: false,
		},
		currentStep: {
			type: Number,
			validator: n => Number.isInteger(n) && n > 0,
			default: undefined,
		},
		direction: {
			type: String,
			default: 'horizontal',
			validator: value => ['horizontal', 'vertical'].includes(value),
		},
		variant: {
			type: String,
			default: 'normal',
			validator: value => ['normal', 'condensed'].includes(value),
		},
	},

	data() {
		const vm = this;

		return {
			internalCurrentStep: 1,
			numSteps: 0,
			state: {
				children: [],
				get clickable() {
					return vm.clickable;
				},
				get currentStep() {
					return (vm.currentStep !== undefined ? vm.currentStep : vm.internalCurrentStep) || 1;
				},
				set currentStep(idx) {
					if (vm.currentStep !== undefined) {
						vm.$emit('steps:change', idx);
					} else {
						vm.internalCurrentStep = idx;
					}
				},
				get direction() {
					return vm.direction;
				},
				get numSteps() {
					return vm.numSteps;
				},
				get variant() {
					return vm.variant;
				},
			},
		};
	},

	provide() {
		return {
			[Key]: this.state,
		};
	},

	render() {
		const { $s } = this;

		return (
			<ol
				class={[
					$s.Steps,
					$s[`direction_${this.direction}`],
				]}
				{...{ attrs: this.$attrs }}
			>
				<VnodeFilter
					remove-whitespace
					enforce-component={StepItem}
					onComponentMismatch={() => throwError('Steps', 'You can only use the StepsItem component within Steps.')}
					onCompleted={(vnodes) => { this.numSteps = vnodes.length; }}
				>
					{this.$slots.default}
				</VnodeFilter>
			</ol>
		);
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.Steps {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	align-items: flex-start;
	width: 100%;
	margin-top: 0;
	margin-bottom: 0;
	padding-left: 0;
	list-style: none;
	counter-reset: steps;
}

.direction_horizontal {
	flex-direction: row;
}

.direction_vertical {
	flex-direction: column;
}
</style>
