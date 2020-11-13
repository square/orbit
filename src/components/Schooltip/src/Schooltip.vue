<script>
import { assert } from '@square/orbit/utils/debug';
import {
	supportedPlacements,
	supportedOverflowElements,
	validatePlacement,
	validateOverflowElement,
	validateOffset,
} from '@square/orbit/utils/popper';
import SchooltipSequenceKey from './SchooltipSequenceKey';
import SchooltipAPIKey from './SchooltipAPIKey';
import SchooltipBubble from './SchooltipBubble.vue';

function createPopperConfig(placement, offset, boundariesElement) {
	boundariesElement = boundariesElement === 'scroll-parent' ? 'scrollParent' : boundariesElement;
	return {
		placement,
		modifiers: {
			offset: {
				offset,
			},
			preventOverflow: {
				boundariesElement,
			},
		},
	};
}

export default {
	name: 'OSchooltip',

	props: {
		tipId: {
			type: null,
			default: undefined,
		},
		activeTip: {
			type: null,
			default: undefined,
		},
		privatePopperConfigBeware: {
			type: Object,
			default: undefined,
		},
		placement: {
			type: String,
			default: 'auto',
			validator: validatePlacement,
		},
		offset: {
			type: String,
			default: '0, 12',
			validator: validateOffset,
		},
		overflowElement: {
			type: String,
			default: 'viewport',
			validator: validateOverflowElement,
		},
	},

	inject: {
		layer: SchooltipAPIKey,
		guide: {
			from: SchooltipSequenceKey,
			default: undefined,
		},
	},

	data() {
		return {
			key: Symbol(this.tipId),
			bubbleComp: null,
		};
	},

	computed: {
		cActiveTip() {
			return this.guide ? this.guide.$attrs.activeTip : this.activeTip;
		},
		cTipId() {
			return this.guide ? this.guide.$attrs.tipId : this.tipId;
		},
		popperConf() {
			if (this.privatePopperConfigBeware) {
				return this.privatePopperConfigBeware;
			}
			return createPopperConfig(this.placement, this.offset, this.overflowElement);
		},
	},

	watch: {
		cActiveTip: 'shouldShow',
		cTipId: 'shouldShow',
		bubbleComp: 'shouldShow',
	},

	mounted() {
		this.shouldShow();
	},

	beforeDestroy() {
		this.closeBubble();
	},

	methods: {
		createBubble(target) {
			const { $slots } = this;
			return {
				name: `schooltip-wrap-${this.cTipId}`,
				functional: true,
				render: () => (
					<SchooltipBubble
						key={this.key}
						targetEl={target.elm}
						privatePopperConfigBeware={this.popperConf}
					>
						<template slot="title">
							{$slots.title}
						</template>
						<template slot="message">
							{$slots.message}
						</template>
						<template slot="action">
							{$slots.action}
						</template>
					</SchooltipBubble>
				),
			};
		},

		shouldShow() {
			if (this.cActiveTip !== undefined && this.cTipId === this.cActiveTip) {
				this.openedBubble = this.layer.showBubble(this.bubbleComp);
			} else {
				this.closeBubble();
			}
		},

		closeBubble() {
			if (this.openedBubble) {
				this.openedBubble();
				this.openedBubble = null;
			}
		},
	},

	render() {
		const { $slots } = this;
		const defaultSlot = ($slots.default || []).filter((vnode) => vnode.tag);

		assert.error(defaultSlot.length === 1, 'SchooltipBubble', 'You must wrap one target element');

		const [target] = defaultSlot;

		this.bubbleComp = this.createBubble(target);

		return target;
	},

	supportedPlacements,
	supportedOverflowElements,
};
</script>
