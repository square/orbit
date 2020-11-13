<script>
import { assert, throwError } from '@square/orbit/utils/debug';
import {
	supportedPlacements,
	validatePlacement,
	validateOffset,
} from '@square/orbit/utils/popper';
import PopoverLayer from './PopoverLayer.vue';
import PopoverKey from './PopoverKey';
import PopoverAPIKey from './PopoverAPIKey';

function createPopperConfig(placement, offset) {
	return {
		placement,
		modifiers: {
			offset: {
				offset,
			},
			preventOverflow: {
				boundariesElement: 'viewport',
			},
		},
	};
}

export default {
	name: 'OPopover',

	inject: {
		detectedLayer: {
			from: PopoverKey,
			default: () => {
				throwError('Popover', 'No popover-layer detected. You must either have a Layout component as an ancestor or target a layer with the `layer` prop');
			},
		},
		api: {
			from: PopoverAPIKey,
			default: {
				config: null,
			},
		},
	},

	props: {
		flush: {
			type: Boolean,
			default: false,
		},
		placement: {
			type: String,
			default: 'bottom-start',
			validator: validatePlacement,
		},
		offset: {
			type: String,
			default: '0, 4',
			validator: validateOffset,
		},
	},

	data() {
		const vm = this;
		return {
			popoverData: {
				contentSlot: null,
				on: this.$listeners,
				props: {
					actionEl: null,
					flush: this.flush,
					popperConfig: this.api.config || createPopperConfig(this.placement, this.offset),
				},
			},

			actionAPI: {
				open() {
					if (this.isOpen) { return; }

					vm.popoverData.props.actionEl = vm.$el;

					const whenClosed = PopoverLayer.setPopover(vm.detectedLayer, vm.popoverData);
					this.isOpen = true;
					whenClosed.then(() => {
						this.isOpen = false;
					});
				},
				close() {
					PopoverLayer.setPopover(vm.detectedLayer, null);
				},
				toggle() {
					if (this.isOpen) {
						this.close();
					} else {
						this.open();
					}
				},
				isOpen: false,
			},
		};
	},

	watch: {
		'actionAPI.isOpen': function emitEvent(isOpen) {
			if (isOpen) {
				this.$emit('open');
			} else {
				this.$emit('close');
			}
		},
	},

	methods: {
		getActionVnode(actionSlot) {
			let actionVnode = actionSlot(this.actionAPI);

			if (!Array.isArray(actionVnode)) {
				return actionVnode;
			}

			actionVnode = actionVnode.flat(Infinity).filter((vnode) => vnode.tag);

			assert.error(actionVnode.length === 1, 'Popover', 'You must only pass in one element into the `action` scoped-slot');

			return actionVnode[0];
		},
	},

	render() {
		const { default: contentSlot } = this.$slots;
		const {
			default: contentSlotScoped,
			action: actionSlot,
		} = this.$scopedSlots;

		assert.error(actionSlot, 'Popover', 'You must pass in an element into the `action` scoped-slot to trigger the Popover with');

		this.popoverData.contentSlot = contentSlotScoped || contentSlot;

		return this.getActionVnode(actionSlot);
	},

	supportedPlacements,
};
</script>
