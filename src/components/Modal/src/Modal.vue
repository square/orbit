<template>
	<div
		:class="[
			$s.Wrapper,
			$s[`size_${size}`],
		]"
	>
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
				<h1	:class="$s.Title">
					{{ modal.title }}
				</h1>
				<o-button
					:key="modal.paneIdx"
					:class="$s.CloseBtn"
					variant="muted"
					@click="handleBackAndClose"
				>
					<o-icon :name="backOrCloseIconName" />
				</o-button>

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
			validator: sizeVal => ['medium', 'large'].includes(sizeVal),
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
		};
	},

	computed: {
		numPanes() {
			const { default: defaultSlot = [] } = this.$slots;

			return defaultSlot.filter(vnode => vnode.tag).length;
		},
		userCanGoBack() {
			return this.modal.paneIdx !== 0 && !this.modal.showClose;
		},
		backOrCloseIconName() {
			return this.userCanGoBack ? 'arrow-left' : 'x';
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
	},

	created() {
		this.layer.configure({
			position: 'top center',
			cancelable: true,
			beforeClose: this.beforeClose,
			afterClose: exitVal => this.$emit('close', exitVal),
		});

		this.modal.backdrop = this.backdrop;
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
				this.modal.paneIdx = this.modal.paneIdx + 1;
			} else {
				this.close();
			}
		},
		back() {
			if (this.modal.paneIdx === 0) {
				this.close();
			} else {
				this.modal.paneIdx = this.modal.paneIdx - 1;
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";
@import "@square/orbit/styles/vars-layer.css";

:root {
	--modal-padding-horizontal: var(--space-x4);
}

/*
IE11 Hack :-/
The Wrapper exists to resolve an issue in IE11 where the vertically stacked modal elements extend
outside of the max-height specified by the parent. This can cause the footer actions to be hidden.

Details on this fix/hack: https://github.com/philipwalton/flexbugs/issues/216#issuecomment-359042902
*/
.Wrapper {
	display: flex;
	flex-direction: row;
	max-width: 640px;
}

.Modal {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	position: relative;
	flex-direction: column;
	width: 100%;
	max-width: 640px;
	max-height: var(--layer-max-height);
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	box-shadow: var(--box-shadow-foreground);
	overflow: hidden;
	z-index: 0;
}

.size_medium {
	max-width: 620px;
}

.size_large {
	max-width: 960px;
}

.CloseBtn {
	position: absolute;
	top: 12px;
	left: 19px;
	z-index: 1;
}

.Header {
	flex: 0 0 auto;
	border-bottom: var(--divider-border);
	background-color: var(--color-white);
	z-index: 1;
}

.Footer {
	flex: 0 0 auto;
	padding: var(--space-x2) var(--modal-padding-horizontal);
	border-top: var(--divider-border);
	text-align: right;
}

.Title {
	composes: title-1 from "@square/orbit/styles/headings.css";
	margin: 0;
	padding: var(--space-x2) var(--modal-padding-horizontal);
	color: var(--heading-color);
	font-weight: var(--font-weight-medium);
	text-align: center;
}

.Header.hasTabs {
	border-bottom: 0;

	& .Title {
		/* Reduce the spacing between the title and the tabs below. */
		padding-bottom: var(--space-half);
	}
}

.Actions {
	white-space: nowrap;
}
</style>
