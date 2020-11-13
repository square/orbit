<template>
	<div
		:class="[
			$s.PopoverBubble,
			{ [$s.flush]: flush },
		]"
	>
		<slot />
	</div>
</template>
<script>
import Popper from '@square/orbit/utils/popper';
import ResizeObserver from 'resize-observer-polyfill';

export default {
	name: 'OPopoverBubble',

	props: {
		actionEl: {
			type: null,
			required: true,
		},
		popperConfig: {
			type: Object,
			default: undefined,
		},
		flush: {
			type: Boolean,
			default: false,
		},
	},

	mounted() {
		this.popper = new Popper(
			this.actionEl,
			this.$el,
			this.popperConfig,
		);

		this.resizeObserver = this.followPopoverAction();
	},

	beforeDestroy() {
		this.resizeObserver.disconnect();
		this.popper.destroy();
		this.$emit('destroy');
	},

	methods: {
		followPopoverAction() {
			const resizeObserver = new ResizeObserver(() => {
				this.popper.scheduleUpdate();
				this.$emit('resize');
			});

			resizeObserver.observe(this.actionEl);
			resizeObserver.observe(document.body);

			return resizeObserver;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.PopoverBubble {
	composes: font-base from "@square/orbit/styles/util.css";
	position: absolute;
	padding: var(--space-x2);
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	box-shadow: var(--box-shadow-interactive);
	overflow: auto;
	z-index: 1;

	/* https://popper.js.org/popper-documentation.html#modifiers..hide */
	&[x-out-of-boundaries] {
		display: none;
	}
}

.flush {
	padding: 0;
}
</style>
