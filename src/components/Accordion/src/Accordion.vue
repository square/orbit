<script>
import { showWarning, throwError } from '@square/orbit/utils/debug';
import AccordionKey from './AccordionKey';
import AccordionItem from './AccordionItem.vue';

export default {
	name: 'OAccordion',

	model: {
		prop: 'open',
		event: 'accordion:update',
	},

	props: {
		open: {
			type: Number,
			default: undefined,
		},
		label: {
			type: String,
			default: undefined,
		},
		subtitle: {
			type: String,
			default: undefined,
		},
		variant: {
			type: String,
			default: 'normal',
			validate: variantVal => ['normal', 'contained', 'subtle'].includes(variantVal),
		},
	},

	data() {
		const vm = this;
		return {
			isOpen: 0,
			state: {
				children: [],
				get openIdx() {
					return (vm.open !== undefined ? vm.open : vm.isOpen) || 0;
				},
				set openIdx(idx) {
					if (vm.open !== undefined) {
						vm.$emit('accordion:update', idx);
					} else {
						vm.isOpen = idx;
					}
				},
				get variant() {
					return vm.variant;
				},
			},
		};
	},

	provide() {
		return {
			[AccordionKey]: this.state,
		};
	},

	methods: {
		isAccordionItem(vnode) {
			return (
				vnode.componentOptions
				&& vnode.componentOptions.Ctor.extendOptions === AccordionItem
			);
		},

		enforceChildType(vnodes = []) {
			return vnodes.every(vnode => !vnode.tag || this.isAccordionItem(vnode));
		},
	},

	render() {
		const { default: defaultSlot = [] } = this.$slots;

		if (defaultSlot.length === 0) {
			showWarning('Accordion', 'Content must be passed into the Accordion');
		}

		const accordionItems = defaultSlot.filter(vnode => this.isAccordionItem(vnode));

		if (accordionItems.length === 1) {
			showWarning('Accordion', 'Use the Accordion component as an AccordionItem if you only have one section');
		}

		if (defaultSlot.length > 0 && accordionItems.length === 0) {
			accordionItems.push(
					<AccordionItem
						label={this.label}
						subtitle={this.subtitle}
					>
						{defaultSlot}
					</AccordionItem>,
			);
		} else if (!this.enforceChildType(defaultSlot)) {
			throwError('Accordion', 'Only AccordionItems are allowed');
		}

		return (
			<div
				class={this.$s.Accordion}
				{...{ attrs: this.$attrs }}
			>
				{accordionItems}
			</div>
		);
	},

};
</script>

<style module="$s">
.Accordion {
	position: relative;
	z-index: 0;
}
</style>
