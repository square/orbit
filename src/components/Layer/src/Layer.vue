<template>
	<transition
		:enter-active-class="$s.fading"
		:leave-active-class="$s.fading"
		:enter-class="$s.transparent"
		:leave-to-class="$s.transparent"
	>
		<div
			v-if="state.currentView"
			:class="[
				$s.Layer,
				$s[`background_${settings.background}`],
				{[$s.cancelable]: settings.cancelable}
			]"
			@mousedown.self="fromLayer"
			@mouseup.self="fromLayer"
			@click.self="handleClick"
		>
			<layer-mounter
				:class="[
					$s.MountedComponent,
					positionClasses
				]"
				:component="state.currentView"
				:data="state.viewData"
			/>
			<o-blade-layer :id="bladeLayer" />
			<o-popover-layer :id="popoverLayer" />
			<o-schooltip-layer :id="schooltipLayer" />
			<o-layer :id="layerKey" />
		</div>
	</transition>
</template>

<script>
import { throwError, assert } from '@square/orbit/utils/debug';
import { OPopoverLayer, PopoverAPIProvider } from '@square/orbit/components/Popover';
import { OBladeLayer, BladeAPIProvider } from '@square/orbit/components/Blade';
import { OSchooltipLayer, SchooltipAPIProvider } from '@square/orbit/components/Schooltip';
import { layers, API } from './Layers';
import LayerAPIProvider from './LayerAPIProvider';

// @vue/component
const LayerMounter = {
	functional: true,
	props: {
		component: {
			type: Object,
			required: true,
		},
		data: {
			type: Object,
			default: undefined,
		},
	},
	render: (h, { props, data }) => h(
		props.component,
		{
			...props.data,
			class: data.class,
		},
	),
};

const key = Symbol('Layer');

function defaultSettings() {
	return {
		position: null,
		background: 'dark',
		cancelable: null,
		beforeClose: null,
		afterClose: null,
	};
}

export default {
	name: 'OLayer',

	key,

	components: {
		LayerMounter,
		OPopoverLayer,
		OBladeLayer,
		OSchooltipLayer,
	},

	mixins: [
		LayerAPIProvider,
		PopoverAPIProvider,
		BladeAPIProvider,
		SchooltipAPIProvider,
	],

	props: {
		id: {
			type: null,
			required: true,
		},
	},

	data() {
		const vm = this;
		return {
			settings: defaultSettings(),
			state: {
				currentView: null,
				viewData: undefined,
			},
			API: {
				isChildLayerOpen: false,
				close(...args) {
					return vm.close(...args);
				},
				configure(opts) {
					Object.assign(vm.settings, opts);
				},
			},
			clickSrc: 0,
		};
	},

	provide() {
		return {
			[key]: this.API,
		};
	},

	inject: {
		parentLayer: {
			from: key,
			default: undefined,
		},
	},

	computed: {
		isOpen() {
			return !!this.state.currentView;
		},

		positionClasses() {
			const { position: positions } = this.settings;
			if (!positions) { return null; }

			const validPositions = ['top', 'center'];

			return positions.split(' ')
				.filter(position => validPositions.includes(position))
				.map(position => this.$s[`position_${position}`]);
		},
	},

	watch: {
		'state.currentView': function openToggled(hasView) {
			if (hasView) {
				if (this.parentLayer) {
					this.parentLayer.isChildLayerOpen = true;
				}
				document.body.classList.add(this.$s.disable_scroll);
				document.addEventListener('keyup', this.handleEscKey);
				this.$emit('open');
			} else {
				if (this.parentLayer) {
					this.parentLayer.isChildLayerOpen = false;
				}
				document.body.classList.remove(this.$s.disable_scroll);
				document.removeEventListener('keyup', this.handleEscKey);
				this.$emit('close');
			}
		},
		id(newId, oldId) {
			layers.delete(oldId);
			this.registerLayer();
		},
	},

	beforeMount() {
		this.registerLayer();
	},

	beforeDestroy() {
		if (this.isOpen) {
			this.close();
		}
		layers.delete(this.id);
	},

	methods: {
		fromLayer() {
			this.clickSrc += 1;
		},

		handleClick() {
			const isClickFromLayer = this.clickSrc === 2;
			if (isClickFromLayer && this.settings.cancelable) {
				this.close();
			}
			this.clickSrc = 0;
		},

		registerLayer() {
			assert.error(!layers.has(this.id), 'Layer', `Layer with id ${String(this.id)} already exists`);
			layers.set(this.id, this);
		},

		_close(exitVal) {
			this.state.currentView = null;
			if (typeof this.settings.afterClose === 'function') {
				this.settings.afterClose(exitVal);
			}
			this.resetSettings();
			return exitVal;
		},

		// Called on external close
		close(exitVal) {
			return (new Promise((resolve, reject) => {
				if (!this.isOpen) {
					reject();
					return;
				}

				if (typeof this.settings.beforeClose === 'function') {
					this.settings.beforeClose(
						exitVal,
						(_exitVal = exitVal) => resolve(_exitVal),
						(_exitVal = exitVal) => reject(_exitVal),
					);
					return;
				}

				resolve(exitVal);
			})).then(
				this._close,
			);
		},

		handleEscKey(event) {
			if (
				!this.API.isChildLayerOpen
				&& event.key === 'Escape'
			) {
				this.close();
			}
		},

		mountComponent(component, data) {
			if (this.state.currentView) {
				throwError('Layer', `Layer ${this.id.toString()} is currently in use`);
			}

			Object.assign(this.state, {
				currentView: component,
				viewData: data,
			});
		},

		resetSettings() {
			this.settings = defaultSettings();
		},
	},

	openInLayer(layerId, ...args) {
		return API.open.apply({ layerId }, args);
	},
};
</script>

<style module="$s">
.Layer {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	cursor: default;
	z-index: 1;

	&.cancelable {
		cursor: pointer;
	}

	&.background_dark {
		background-color: rgba(0, 0, 0, 0.5);
	}

	&.background_light {
		background-color: rgba(255, 255, 255, 0.5);
	}

	&.background_transparent {
		background: transparent;
	}
}

.position_top {
	margin-top: 10vh;
}

.position_center {
	margin-right: auto;
	margin-left: auto;
}

.disable_scroll {
	overflow: hidden;
}

.MountedComponent {
	cursor: initial;
}

/* Fade Transition */
.fading {
	transition: opacity 0.3s ease-in-out;
}

.transparent {
	opacity: 0;
}
</style>
