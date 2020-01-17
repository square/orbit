<template>
	<div
		:class="
			[
				$s.SchooltipBubble,
				{ [$s.transformTransition]: afterMount },
			]
		"
	>
		<div
			ref="arrow"
			:class="$s.Arrow"
		/>
		<div :class="$s.Bubble">
			<div
				v-if="$slots.title"
				:class="$s.Title"
			>
				<slot name="title" />
			</div>

			<slot name="message" />

			<div
				v-if="$slots.action"
				:class="$s.Action"
			>
				<slot name="action" />
			</div>
		</div>
	</div>
</template>
<script>
import Popper from '@square/orbit/utils/popper';
import { ButtonKey } from '@square/orbit/components/Button';

export default {
	name: 'SchooltipBubble',

	props: {
		targetEl: {
			type: null,
			required: true,
		},
		privatePopperConfigBeware: {
			type: Object,
			default: undefined,
		},
	},

	provide() {
		return {
			[ButtonKey]: {
				className: this.$s.Button,
			},
		};
	},

	data() {
		return {
			config: this.privatePopperConfigBeware,
			afterMount: false,
			targetX: 0,
			targetY: 0,
		};
	},

	watch: {
		targetX: 'updateTipPosition',
		targetY: 'updateTipPosition',
	},

	mounted() {
		this.config.modifiers.arrow = {
			element: this.$refs.arrow,
		};

		this.popper = new Popper(
			this.targetEl,
			this.$el,
			this.config,
		);

		setInterval(this.calculateTargetPosition, 300);

		// We only want the tip to transition if it is moved after page load,
		// not on the original placement of the tip so we set a bit of a delay.
		setTimeout(() => {
			this.afterMount = true;
		}, 200);
	},

	beforeDestroy() {
		clearInterval(this.calculateTargetPosition);
		this.popper.destroy();
	},

	methods: {
		calculateTargetPosition() {
			this.targetX = this.targetEl.offsetTop;
			this.targetY = this.targetEl.offsetLeft;
		},
		updateTipPosition() {
			this.popper.scheduleUpdate();
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--schooltip-arrow-size: 8px;
}

.SchooltipBubble {
	composes: font-base from "@square/orbit/styles/util.css";
	min-width: 192px;
	max-width: 400px;
	z-index: 1;

	& .Arrow {
		display: block;
		position: absolute;
		width: 0;
		height: 0;
		border-right: var(--schooltip-arrow-size) solid transparent;
		border-bottom: var(--schooltip-arrow-size) solid var(--brand-color);
		border-left: var(--schooltip-arrow-size) solid transparent;
	}

	&[x-placement^="bottom"] .Arrow {
		top: calc(-1 * var(--schooltip-arrow-size));
	}

	&[x-placement^="left"] .Arrow {
		right: calc(-1.5 * var(--schooltip-arrow-size));
		transform: rotate(90deg);
	}

	&[x-placement^="top"] .Arrow {
		bottom: calc(-1 * var(--schooltip-arrow-size));
		transform: rotate(180deg);
	}

	&[x-placement^="right"] .Arrow {
		left: calc(-1.5 * var(--schooltip-arrow-size));
		transform: rotate(270deg);
	}
}

.transformTransition {
	transition: transform 0.4s var(--transition-easing);
}

.Bubble {
	padding: var(--space-x2) var(--space-x3);
	border-radius: 4px;
	background-color: var(--brand-color);
	color: var(--color-white);
	box-shadow: 0 2px 24px 2px rgba(0, 0, 0, 0.16);
}

.Title {
	composes: title-3 from "@square/orbit/styles/headings.css";
	margin-bottom: var(--space-x2);
	color: var(--color-white);
	font-weight: 500;
}

.Action {
	margin-top: var(--space-x2);
	text-align: right;
}

.Button {
	border-color: transparent;
	background-color: var(--color-white);
	color: var(--brand-color);

	&:hover,
	&:active {
		background-color: color(var(--brand-color) tint(90%));
		color: var(--brand-color);
	}
}
</style>
