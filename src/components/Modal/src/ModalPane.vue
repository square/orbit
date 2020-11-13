<script>
import Key from './Key';

export default {
	name: 'ModalPane',

	inject: {
		modal: Key,
	},

	props: {
		title: {
			type: String,
			required: true,
		},
		backdrop: {
			type: Boolean,
			default: false,
		},
		showClose: {
			type: Boolean,
			default: false,
		},
		flush: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		hasBackdrop() {
			return this.backdrop || this.modal.backdrop;
		},
	},

	watch: {
		'modal.paneIdx': function scrollTop() {
			this.$refs.content.scrollTop = 0;
		},
	},

	render() {
		const {
			$s,
			$slots,
			$scopedSlots,
			showClose,
		} = this;
		const actionsSlot = $scopedSlots.actions || $slots.actions;
		const tabsSlot = $slots.tabs;

		Object.assign(this.modal, {
			title: this.title,
			actionsSlot,
			tabsSlot,
			showClose,
		});

		return (
			<section
				ref="content"
				class={[$s.Content, { [$s.backdrop]: this.hasBackdrop }]}
				{...{ on: this.$listeners }}
			>
				<div class={[$s.ModalPane, { [$s.flush]: this.flush }]}>
					{$slots.default}
				</div>
			</section>
		);
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-modal.css";

.ModalPane:not(.flush) {
	padding: var(--space-x2) var(--modal-padding-horizontal-mobile);

	@media (--for-tablet-portrait-up) {
		padding: var(--space-x4) var(--modal-padding-horizontal);
	}
}

.Content {
	overflow-y: auto;
	flex: 1 1 auto;

	&.backdrop {
		background-color: var(--color-gray-10);
	}
}
</style>
