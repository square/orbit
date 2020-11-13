<template>
	<fade-transition>
		<pseudo-window @blur.passive="handleBlur">
			<pseudo-window
				document
				@mousedown="trackClickSrc"
				@touchstart="trackClickSrc"
				@click.capture="handleClick"
				@touchend="handleClick"
			>
				<component
					:is="currentBubble"
					v-if="currentBubble"
					ref="bubble"
					@close="closePopover"
				/>
			</pseudo-window>
		</pseudo-window>
	</fade-transition>
</template>
<script>
import { assert } from '@square/orbit/utils/debug';
import PseudoWindow from 'vue-pseudo-window';
import FadeTransition from '@square/orbit/transitions/FadeTransition.vue';
import PopoverBubble from './PopoverBubble.vue';

// @vue/component
const newBubble = (popoverData, onDestroy) => ({
	render() {
		const { contentSlot, props, on } = popoverData;
		let content = contentSlot;

		if (typeof content === 'function') {
			content = content({ close: () => { this.$emit('close'); } });
		}

		return (<PopoverBubble onDestroy={onDestroy} {...{ props, on }}>{content}</PopoverBubble>);
	},
});

const layers = new Map();

export default {
	name: 'OPopoverLayer',

	components: {
		FadeTransition,
		PseudoWindow,
	},

	props: {
		id: {
			type: null,
			required: true,
		},
	},

	data() {
		return {
			currentBubble: null,
			actionEl: null,
			clickSrc: null,
			API: {
				setPopover: (popoverData) => {
					if (this.currentBubble) {
						this.closePopover();
					}

					if (!popoverData) {
						return undefined;
					}

					return new Promise((resolve) => {
						this.actionEl = popoverData.props.actionEl;
						this.currentBubble = newBubble(popoverData, resolve);
					});
				},
			},
		};
	},

	watch: {
		id(newId, oldId) {
			layers.delete(oldId);
			this.registerLayer();
		},
	},

	beforeMount() {
		this.registerLayer();
	},

	beforeDestroy() {
		layers.delete(this.id);
	},

	methods: {
		registerLayer() {
			assert.error(!layers.has(this.id), 'PopoverLayer', `Layer with id ${String(this.id)} already exists`);
			layers.set(this.id, this.API);
		},

		// To catch clicks in iframes that don't propagate up
		handleBlur() {
			if (document.activeElement !== document.body) {
				this.closePopover();
			}
		},

		trackClickSrc({ target }) {
			this.clickSrc = target;
		},

		/*
		 * This method checks if the click target of the original mousedown was inside
		 * the popover. It's possible for the content above the popover to force the popover
		 * to reposition, causing the mousedown and mouseup target to differ and errantly register
		 * as a click on the Layer even though the click originated within the popover.
		 * See #2624 and #2612
		 */
		handleClick() {
			const $bubble = this.$refs.bubble;
			if (!$bubble || !this.clickSrc) {
				return;
			}

			const clickInBubble = $bubble && $bubble.$el.contains(this.clickSrc);
			const clickInAction = this.actionEl && this.actionEl.contains(this.clickSrc);

			if (!clickInBubble && !clickInAction) {
				this.closePopover();
			}

			this.clickSrc = null;
		},

		closePopover() {
			this.currentBubble = null;
		},
	},

	setPopover(layerId, ...args) {
		const layer = layers.get(layerId);
		assert.error(layer, 'PopoverLayer', `Layer "${layerId.toString()}" not found`);
		return layer.setPopover(...args);
	},
};
</script>
