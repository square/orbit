<template>
	<aside
		ref="sider"
		:class="[
			$s.LayoutSider,
			{
				[$s.collapsed]: collapsed,
				[$s.flush]: flush,
			},
		]"
		:style="siderStyle"
		v-on="$listeners"
	>
		<slot />
	</aside>
</template>

<script>
import stickybits from 'stickybits';
import Key from './Key';


export default {

	name: 'OLayoutSider',

	inject: {
		layout: Key,
	},

	props: {
		collapsed: {
			type: Boolean,
			default: false,
		},
		width: {
			type: Number,
			default: 216,
		},
		sticky: {
			type: Boolean,
			default: false,
		},
		flush: {
			type: Boolean,
			default: false,
		},
		stickyOffsetTop: {
			type: Number,
			default: 0,
		},
	},

	computed: {
		siderHeight() {
			return this.sticky ? `calc(100vh - ${this.stickyOffsetTop}px)` : 'auto';
		},
		siderStyle() {
			return {
				flexBasis: `${this.width}px`,
				marginLeft: this.collapsed ? `-${this.width}px` : 0,
				height: this.siderHeight,
			};
		},
	},

	watch: {
		/* TODO: Evaluate need for watch methods */
		sticky() {
			this.updateLayoutState();
		},
	},

	created() {
		this.layout.hasSider = true;
	},

	mounted() {
		if (this.sticky) {
			/*
			 * stickyBitStickyOffset is an undocumented, non-reactive property. This
			 * makes stickyOffsetTop also a non-reactive prop, unless we reinitialized
			 * stickybits every time the stickyOffsetTop property changed.
			*/
			stickybits(this.$refs.sider, {
				useStickyClasses: true,
				stickyBitStickyOffset: this.stickyOffsetTop,
			});
		}
	},

	destroyed() {
		Object.assign(this.layout, {
			stickySider: undefined,
			hasSider: false,
		});
	},

	methods: {
		updateLayoutState() {
			Object.assign(this.layout, {
				stickySider: this.sticky,
			});
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--layout-sider-max-width: 216px;
	--sider-slide-duration: 0.3s;
}

.LayoutSider {
	box-sizing: border-box;
	position: relative;
	flex: 0 0;
	padding: var(--space-x3);
	transition:
		margin-left var(--sider-slide-duration) var(--transition-easing),
		flex-basis var(--sider-slide-duration) var(--transition-easing);
	overflow: hidden;

	&.collapsed {
		flex-basis: 0;
	}

	&.flush {
		padding: 0;
	}

	@media (--for-tablet-portrait-up) {
		padding: var(--space-x4);
	}
}
</style>
