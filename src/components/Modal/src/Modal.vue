<template>
	<div
		:class="[
			$s.Wrapper,
			$s[`size_${size}`],
		]"
	>
		<pseudo-window @resize.passive="onWindowResize" />
		<div
			:class="[
				$s.Modal,
				$s[`size_${size}`],
			]"
		>
			<section
				:class="[
					$s.Header,
					{ [$s.hasTabs]: hasTabs },
				]"
			>
				<div
					:class="$s.HeaderDetails"
				>
					<o-button
						:key="modal.paneIdx"
						:class="$s.CloseBtn"
						variant="muted"
						@click="handleBackAndClose"
					>
						<o-icon :name="backOrCloseIconName" />
					</o-button>
					<h1 :class="$s.Title">
						{{ modal.title }}
					</h1>
					<div :class="$s.RightSpacer" />
				</div>
				<modal-tabs :modal="modal" />
			</section>

			<subslot
				:offset="modal.paneIdx"
				:element="ModalPane"
				limit="1"
			/>

			<div
				v-if="hasActions"
				:class="$s.Footer"
			>
				<modal-actions
					:modal="modal"
					:class="$s.Actions"
					@close="close"
					@forward="forward"
					@back="back"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Subslot from 'vue-subslot';
import PseudoWindow from 'vue-pseudo-window';
import throttle from 'lodash/throttle';
import { OLayer } from '@square/orbit/components/Layer';
import { OIcon } from '@square/orbit/components/Icon';
import { OButton } from '@square/orbit/components/Button';
import { OTabs, TabKey } from '@square/orbit/components/Tabs';
import { throwError } from '@square/orbit/utils/debug';
import Spacer from '@square/orbit/utils/Spacer.vue';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import Key from './Key';
import ModalPane from './ModalPane.vue';

// @vue/component
const ModalActions = {
	props: {
		modal: {
			type: Object,
			required: true,
		},
	},

	render() {
		let { actionsSlot = this.$slots.default } = this.modal;

		if (typeof actionsSlot === 'function') {
			actionsSlot = actionsSlot(this.$listeners);
		}

		return (
			<div key={this.modal.paneIdx}>
				<Spacer>
					{actionsSlot}
				</Spacer>
			</div>
		);
	},
};

// @vue/component
const ModalTabs = {
	components: {
		VnodeFilter,
	},

	props: {
		modal: {
			type: Object,
			required: true,
		},
	},

	provide() {
		return {
			[TabKey]: {
				controllerFlush: true,
			},
		};
	},

	render() {
		const { tabsSlot } = this.modal;

		if (tabsSlot) {
			return (
				<div>
					<VnodeFilter
						enforce-component={OTabs}
						onComponentMismatch={() => throwError('OModalPane', 'You can only use the OTabs component within the tabs slot.')}
					>
						{tabsSlot}
					</VnodeFilter>
				</div>
			);
		}
		return null;
	},
};

export default {
	name: 'OModal',

	components: {
		Subslot,
		OButton,
		OIcon,
		ModalActions,
		ModalTabs,
		PseudoWindow,
	},

	inject: {
		layer: OLayer.key,
	},

	provide() {
		return {
			[Key]: this.modal,
		};
	},

	props: {
		beforeClose: {
			type: Function,
			default: undefined,
		},

		size: {
			type: String,
			default: 'medium',
			validator: (sizeVal) => ['medium', 'large'].includes(sizeVal),
		},

		backdrop: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			ModalPane,
			modal: {
				title: '',
				actionsSlot: undefined,
				tabsSlot: undefined,
				showClose: null,
				paneIdx: 0,
				backdrop: undefined,
			},
			hasActions: false,
			hasTabs: false,
			originalScrollPosition: 0,
			isMobile: window.innerWidth < 600,
		};
	},

	computed: {
		numPanes() {
			const { default: defaultSlot = [] } = this.$slots;

			return defaultSlot.filter((vnode) => vnode.tag).length;
		},
		userCanGoBack() {
			return this.modal.paneIdx !== 0 && !this.modal.showClose;
		},
		backOrCloseIconName() {
			return this.userCanGoBack ? 'arrow-left' : 'x';
		},
		layerPosition() {
			return this.isMobile ? '' : 'top center';
		},
	},

	watch: {
		beforeClose(fn) {
			this.layer.configure({ beforeClose: fn });
		},
		'modal.actionsSlot': function hasActions(actions) {
			this.hasActions = !!actions;
		},
		'modal.tabsSlot': function hasTabs(tabs) {
			this.hasTabs = !!tabs;
		},
		backdrop(hasBackdrop) {
			this.modal.backdrop = hasBackdrop;
		},
		layerPosition(position) {
			this.layer.configure({ position });
		},
		isMobile() {
			this.toggleBodyOverflowClass();
		},
	},

	created() {
		this.layer.configure({
			position: this.layerPosition,
			cancelable: true,
			beforeClose: this.beforeClose,
			afterClose: (exitVal) => this.$emit('close', exitVal),
		});

		this.modal.backdrop = this.backdrop;

		this.onWindowResize = throttle(this.onWindowResize, 100);
	},

	mounted() {
		this.toggleBodyOverflowClass();
	},

	destroyed() {
		if (this.isMobile) {
			this.removeBodyOverflowClass();
		}
	},

	methods: {
		handleBackAndClose() {
			if (this.userCanGoBack) {
				this.back();
			} else {
				this.close(false);
			}
		},
		close(exitVal) {
			return this.layer.close(exitVal)
				// can get rejected by user's before-close hook
				.catch(() => { /* no-op */ });
		},
		forward() {
			if (this.modal.paneIdx < this.numPanes - 1) {
				this.modal.paneIdx += 1;
			} else {
				this.close();
			}
		},
		back() {
			if (this.modal.paneIdx === 0) {
				this.close();
			} else {
				this.modal.paneIdx -= 1;
			}
		},
		onWindowResize() {
			this.isMobile = window.innerWidth < 600;
		},
		toggleBodyOverflowClass() {
			if (this.isMobile) {
				this.originalScrollPosition = window.scrollY;
				document.body.classList.add(this.$s.fix_browser_bar);
			} else {
				this.removeBodyOverflowClass();
			}
		},
		removeBodyOverflowClass() {
			if (document.body.classList.contains(this.$s.fix_browser_bar)) {
				document.body.classList.remove(this.$s.fix_browser_bar);
				window.scrollTo({ top: this.originalScrollPosition });
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";
@import "@square/orbit/styles/vars-layer.css";
@import "@square/orbit/styles/vars-modal.css";

/*
IE11 Hack :-/
The Wrapper exists to resolve an issue in IE11 where the vertically stacked modal elements extend
outside of the max-height specified by the parent. This can cause the footer actions to be hidden.

Details on this fix/hack: https://github.com/philipwalton/flexbugs/issues/216#issuecomment-359042902
*/
.Wrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;

	@media (--for-tablet-portrait-up) {
		height: auto;
	}
}

.Modal {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	box-shadow: var(--box-shadow-foreground);
	overflow: hidden;
	z-index: 0;

	@media (--for-tablet-portrait-up) {
		max-width: 640px;
		max-height: var(--layer-max-height);
	}
}

.CloseBtn,
.RightSpacer {
	flex: 0 1 var(--modal-close-btn-width);
}

.Header {
	flex: 0 0 auto;
	border-bottom: var(--divider-border);
	background-color: var(--color-white);
	z-index: 1;
}

.HeaderDetails {
	display: flex;
	align-items: center;
	padding: var(--space-x2) var(--modal-padding-horizontal-mobile);

	@media (--for-tablet-portrait-up) {
		padding: var(--space-x2) var(--modal-padding-horizontal);
	}
}

.Footer {
	flex: 0 0 auto;
	padding: 12px var(--modal-padding-horizontal-mobile);
	border-top: var(--divider-border);
	text-align: right;

	@media (--for-tablet-portrait-up) {
		padding: var(--space-x2) var(--modal-padding-horizontal);
	}
}

.Title {
	composes: title-1 from "@square/orbit/styles/headings.css";
	flex: 0 0 calc(100% - var(--modal-close-btn-width) * 2);
	box-sizing: border-box;
	margin: 0;
	padding: 0 var(--modal-padding-horizontal-mobile);
	color: var(--heading-color);
	font-weight: var(--font-weight-medium);
	text-align: center;

	@media (--for-tablet-portrait-up) {
		padding: 0 var(--modal-padding-horizontal);
	}
}

.Header.hasTabs {
	border-bottom: 0;

	& .HeaderDetails {
		/* Reduce the spacing between the title and the tabs below. */
		padding-bottom: var(--space-half);
	}
}

.Actions {
	white-space: nowrap;
}

@media (--for-tablet-portrait-up) {
	.size_medium {
		max-width: 620px;
	}

	.size_large {
		max-width: 960px;
	}
}

/* iOS Safari/Chrome Mobile fix.
 * https://www.eventbrite.com/engineering/mobile-safari-why/
 */
@media screen and (max-width: 600px) {
	.fix_browser_bar {
		position: fixed;
	}
}
</style>
