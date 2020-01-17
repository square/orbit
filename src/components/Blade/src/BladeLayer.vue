<template>
	<slide-transition>
		<div
			v-if="state.component"
			:class="$s.BladeLayer"
		>
			<component :is="state.component" />
		</div>
	</slide-transition>
</template>

<script>
import { assert } from '@square/orbit/utils/debug';
import SlideTransition from './SlideTransition.vue';
import { BladeKey } from './Keys';

const bladeLayers = new Map();

function defaultSettings() {
	return {
		afterClose: null,
	};
}

export default {
	name: 'OBladeLayer',

	components: {
		SlideTransition,
	},

	props: {
		id: {
			type: null,
			required: true,
		},
	},

	provide() {
		return {
			[BladeKey]: this.api,
		};
	},

	data() {
		const vm = this;
		return {
			state: {
				component: null,
			},
			settings: defaultSettings(),
			api: {
				close: vm.close,
				configure(opts) {
					Object.assign(vm.settings, opts);
				},
			},
		};
	},

	watch: {
		id(newId, oldId) {
			bladeLayers.delete(oldId);
			this.registerLayer();
		},
	},

	beforeMount() {
		this.registerLayer();
	},

	beforeDestroy() {
		bladeLayers.delete(this.id);
	},

	methods: {
		registerLayer() {
			assert.error(!bladeLayers.has(this.id), 'BladeLayer', `Layer with id ${String(this.id)} already exists`);
			bladeLayers.set(this.id, this);
		},
		close(exitVal) {
			this.state.component = null;
			if (typeof this.settings.afterClose === 'function') {
				this.settings.afterClose(exitVal);
			}
			this.resetSettings();
			return exitVal;
		},
		resetSettings() {
			this.settings = defaultSettings();
		},
	},

	open(layerId, renderFn) {
		const layerInst = bladeLayers.get(layerId);
		layerInst.state.component = { render: renderFn };
		return layerInst;
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";
@import "@square/orbit/styles/vars-layer.css";

.BladeLayer {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	width: 444px; /* not a multiple of 8 */
	box-shadow: var(--box-shadow-foreground);
}
</style>
