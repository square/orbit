<template>
	<div
		:class="[
			$s.Layout,
			{ [$s.hasSider]: hasSider || state.hasSider },
		]"
		v-on="$listeners"
	>
		<div
			ref="scrollDetector"
			:class="$s.ScrollDetector"
		/>
		<slot />
		<template v-if="hasLayers">
			<o-blade-layer
				:id="bladeLayer"
				:class="$s.aboveLayoutHeader"
			/>
			<o-popover-layer
				:id="popoverLayer"
			/>
			<o-schooltip-layer
				:id="schooltipLayer"
			/>
			<o-layer
				:id="layerKey"
				:class="$s.aboveLayoutHeader"
			/>
			<o-toast-layer
				:id="toastLayer"
				:class="$s.aboveLayoutHeader"
			/>
		</template>
	</div>
</template>

<script>
import { OBladeLayer, BladeAPIProvider } from '@square/orbit/components/Blade';
import { OPopoverLayer, PopoverAPIProvider } from '@square/orbit/components/Popover';
import { OLayer, LayerAPIProvider } from '@square/orbit/components/Layer';
import { OToastLayer, ToastAPIProvider } from '@square/orbit/components/Toast';
import { OSchooltipLayer, SchooltipAPIProvider } from '@square/orbit/components/Schooltip';
import Key from './Key';

// https://github.com/w3c/IntersectionObserver/pull/279#issuecomment-382741031
if (typeof window !== 'undefined') {
	require('intersection-observer'); // eslint-disable-line global-require
}

export default {

	name: 'OLayout',

	components: {
		OBladeLayer,
		OPopoverLayer,
		OLayer,
		OToastLayer,
		OSchooltipLayer,
	},

	mixins: [
		BladeAPIProvider,
		PopoverAPIProvider,
		LayerAPIProvider,
		ToastAPIProvider,
		SchooltipAPIProvider,
	],

	props: {
		hasLayers: {
			type: Boolean,
			default: false,
		},
		hasSider: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			state: {
				header: null,
				hasSider: false,
				stickySider: false,
				topVisible: null,
			},
		};
	},

	watch: {
		'state.header.sticky': 'detectScroll',
	},

	provide() {
		return {
			[Key]: this.state,
		};
	},

	mounted() {
		this.detectScroll();
	},

	methods: {
		detectScroll() {
			const { sticky } = this.state.header || {};

			if (!sticky && this.io) {
				this.state.topVisible = null;
				this.io.disconnect();
				this.io = undefined;
			}

			if (sticky) {
				this.io = new IntersectionObserver(([{ isIntersecting }]) => {
					this.state.topVisible = isIntersecting;
				});
				this.io.observe(this.$refs.scrollDetector);
			}
		},
	},
};
</script>

<style module="$s">

.Layout {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	position: relative;
	flex: auto;
	flex-direction: column;
	z-index: 0;

	&.hasSider {
		flex-direction: row;
	}
}

.aboveLayoutHeader {
	z-index: 2;
}

.ScrollDetector {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
