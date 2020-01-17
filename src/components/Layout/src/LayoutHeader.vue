<template>
	<header
		:class="[
			$s.LayoutHeader,
			{
				[$s.sticky]: sticky,
				[$s.hasShadow]: hasShadow,
				[$s.flush]: flush,
			},
		]"
		v-on="$listeners"
	>
		<div
			v-if="$slots['back-action'] || centered"
			:class="[
				$s.BackAction,
				{ [$s.centered]: centered },
			]"
		>
			<slot name="back-action" />
		</div>
		<div
			v-if="$slots.default"
			:class="[
				$s.Content,
				{ [$s.left]: !centered },
			]"
		>
			<slot />
		</div>
		<div
			v-if="$slots.actions || centered"
			:class="[
				$s.Actions,
				{ [$s.centered]: centered },
			]"
		>
			<spacer>
				<slot name="actions" />
			</spacer>
		</div>
		<o-popover-layer :id="popoverLayer" />
		<o-schooltip-layer :id="schooltipLayer" />
	</header>
</template>

<script>
import { OPopoverLayer, PopoverAPIProvider } from '@square/orbit/components/Popover';
import { OSchooltipLayer, SchooltipAPIProvider } from '@square/orbit/components/Schooltip';
import Spacer from '@square/orbit/utils/Spacer.vue';
import Key from './Key';

// eslint-disable-next-line global-require
const Stickyfill = (typeof window !== 'undefined') && require('stickyfilljs');

export default {
	name: 'OLayoutHeader',

	components: {
		OPopoverLayer,
		OSchooltipLayer,
		Spacer,
	},

	mixins: [
		PopoverAPIProvider,
		SchooltipAPIProvider,
	],

	props: {
		flush: {
			type: Boolean,
			default: false,
		},
		sticky: {
			type: Boolean,
			default: false,
		},
		raised: {
			type: Boolean,
			default: false,
		},
		centered: {
			type: Boolean,
			default: false,
		},
	},

	inject: {
		layout: Key,
	},

	data() {
		const vm = this;
		return {
			api: {
				get sticky() {
					return vm.sticky;
				},
			},
		};
	},

	computed: {
		hasShadow() {
			return (
				this.raised
				|| this.layout.topVisible === false
			);
		},
	},

	watch: {
		sticky: 'stickyPolyfill',
	},

	created() {
		this.layout.header = this.api;
	},

	mounted() {
		this.stickyPolyfill();
	},

	destroyed() {
		this.layout.header = null;
	},

	methods: {
		stickyPolyfill() {
			if (this.sticky) {
				Stickyfill.addOne(this.$el);
			} else {
				Stickyfill.removeOne(this.$el);
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--layout-header-bg-color: var(--color-white);
	--layout-header-shadow-height: 4px;
}

.LayoutHeader {
	display: flex;
	position: relative;
	flex: 0 0 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: var(--layout-header-bg-color);
	/* z-index: 2 is required to make sure Popovers and Schooltips opened from the header are on top
	* !important is required to overrides stickybits inline z-index value.
	*/
	z-index: 2 !important;
	box-sizing: border-box;

	&::before {
		position: absolute;
		bottom: calc(var(--layout-header-shadow-height) * -1);
		left: 0;
		width: 100%;
		height: var(--layout-header-shadow-height);
		transition: opacity var(--transition-base);
		background-image: none;
		content: "";
		opacity: 0;
		pointer-events: none;
	}

	&.sticky {
		position: sticky;
		top: 0;
	}

	&:not(.flush) {
		padding: var(--space-x2) var(--space-x4);
	}

	&.hasShadow {
		&::before {
			background-image:
				linear-gradient(
					color(var(--color-black) a(0.2)),
					transparent
				);
			opacity: 1;
		}
	}
}

.BackAction.centered {
	flex: 1;
}

.Content {
	display: flex;
	align-items: center;
	justify-content: space-between;

	&.left {
		flex: 1;
	}
}

.Actions.centered {
	flex: 1;
	text-align: right;
	white-space: nowrap;
}
</style>
