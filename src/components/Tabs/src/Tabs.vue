<template>
	<div
		:class="[
			$s.Tabs,
			$s[`position_${position}`]
		]"
	>
		<pseudo-window @resize.passive="onResize" />
		<nav
			:class="[
				$s.Controller,
				$s[`align_${align}`],
				$s[`position_${position}`],
				{ [$s.flush]: api && api.controllerFlush },
			]"
		>
			<tab-control
				v-for="(tab, idx) in state.tabRegister"
				ref="tabLabel"
				:key="idx"
				:active="idx === state.currentTabIdx"
				:label-node="tab.labelSlot"
				:position="position"
				:align="align"
				@click="state.currentTabIdx = idx"
				@keypress.space.prevent="state.currentTabIdx = idx"
			/>
			<div
				:class="$s.ControllerSlider"
				:style="slider"
			/>
		</nav>
		<div :class="$s.Content">
			<slot />
		</div>
	</div>
</template>

<script>
import throttle from 'lodash/throttle';
import PseudoWindow from 'vue-pseudo-window';
import TabControl from './TabControl.vue';
import TabKey from './TabKey';

export default {
	name: 'OTabs',

	inject: {
		api: {
			from: TabKey,
			default: undefined,
		},
	},

	components: {
		TabControl,
		PseudoWindow,
	},

	model: {
		prop: 'tabIdx',
		event: 'tabs:change',
	},

	props: {
		align: {
			type: String,
			default: 'left',
			validator: (value) => ['left', 'center', 'right', 'stretch'].includes(value),
		},
		tabIdx: {
			type: Number,
			validator: (n) => Number.isInteger(n) && n >= 0,
			default: undefined,
		},
		position: {
			type: String,
			default: 'top',
			validator: (value) => ['top', 'left'].includes(value),
		},
	},

	data() {
		const vm = this;
		return {
			state: {
				tabRegister: [],
				_tabIdx: 0,
				position: this.position,
				get currentTabIdx() {
					return (vm.tabIdx !== undefined) ? vm.tabIdx : this._tabIdx;
				},
				set currentTabIdx(newIdx) {
					vm.$emit('tabs:change', newIdx);
					this._tabIdx = newIdx;
				},
			},
			slider: {
				width: 0,
				top: 'auto',
				height: 'auto',
				right: 'auto',
			},
		};
	},

	provide() {
		return {
			[TabKey]: this.state,
		};
	},

	watch: {
		'state.currentTabIdx': 'updateSlider',
	},

	created() {
		this.onResize = throttle(this.updateSlider, 100);
	},

	updated() {
		// in case child tab pane updates its label slot
		this.updateSlider();
	},

	methods: {
		updateSlider() {
			const tabLabels = this.$refs.tabLabel;
			const tabLabelEl = tabLabels[this.state.currentTabIdx].$el;
			let sliderPositionProperty;
			let sliderWidthProperty;

			if (this.position === 'top') {
				this.slider.left = `${tabLabelEl.offsetLeft}px`;
				this.slider.width = `${tabLabelEl.offsetWidth}px`;
				sliderPositionProperty = 'bottom';
				sliderWidthProperty = 'height';
			} else {
				this.slider.top = `${tabLabelEl.offsetTop}px`;
				this.slider.height = `${tabLabelEl.offsetHeight}px`;
				sliderPositionProperty = 'right';
				sliderWidthProperty = 'width';
			}

			this.slider[`${sliderPositionProperty}`] = '-1px';
			this.slider[`${sliderWidthProperty}`] = '4px';
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--tab-border-size: 1px;
	--tab-border-color: var(--color-gray-30);
	--tab-border-size-active: 4px;
	--tab-gutter: var(--space-x3);
}

.Tabs {
	composes: font-base from "@square/orbit/styles/util.css";
	text-align: left;

	&.position_left {
		display: flex;

		& .Content {
			width: 100%;
		}
	}
}

.Controller {
	display: block;
	position: relative;

	&.position_left {
		flex: 0 0 auto;
		margin-right: var(--tab-gutter);
		border-right: var(--tab-border-size) solid var(--tab-border-color);

		&.align_stretch {
			display: flex;
			flex-direction: column;
			align-content: stretch;
		}
	}

	&.position_top {
		margin-bottom: var(--tab-gutter);
		border-bottom: var(--tab-border-size) solid var(--tab-border-color);

		&:not(.align_left) {
			display: flex;
		}

		&.align_center {
			justify-content: center;
		}

		&.align_right {
			justify-content: flex-end;
		}
	}

	/* Injected by Modal for tabs put in header  */
	&.flush {
		margin-bottom: 0;
	}
}

.ControllerSlider {
	position: absolute;
	transition:
		left var(--transition-base),
		top var(--transition-base),
		width var(--transition-base);
	background-color: var(--brand-color);
}
</style>
