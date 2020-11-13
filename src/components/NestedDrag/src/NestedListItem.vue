<template>
	<div
		v-droppable
		:class="[
			$s.ItemContainer,
			{ [$s.isGhost]: isDragging },
		]"
		@dragenter="peekAccordion"
		@dragleave="cancelPeek"
		@drop="onDrop"
	>
		<div
			v-draggable="!(anchored || dragDisabled) && {
				shadowClass: $s.dragging,
				docBodyClass: $s.bodyCursor,
				dragHandleSelector: isMobile && `.${$s.HandleContainer}`,
			}"
			:class="[
				$s.Item,
				{
					[$s.anchored]: anchored,
					[$s.undraggable]: dragDisabled,
					[$s.isDropParent]: isDropParent,
					[$s.bottomBorderless]: listApi.isListBorderless && isVeryLastChild,
				},
			]"
			:style="itemStyle"
			@dragstart="listApi.onDragStart(item, path)"
			@dragend="listApi.onDragEnd"
		>
			<div
				v-if="!dragDisabled"
				:class="$s.HandleContainer"
			>
				<o-icon name="drag-bars" />
			</div>
			<div
				:class="$s.ContentContainer"
			>
				<div :class="$s.LabelContainer">
					<slot
						:parent="parent"
						:item="item"
						:depth="depth"
						name="label"
					>
						{{ item.label }}
					</slot>
				</div>

				<div :class="$s.ActionsContainer">
					<div
						v-if="hasActions"
						:class="$s.ActionsSlot"
					>
						<slot
							:parent="parent"
							:item="item"
							:depth="depth"
							name="actions"
						/>
					</div>
					<div
						v-if="listApi.accordionMode && hasChildren"
						:class="$s.AccordionArrow"
					>
						<o-icon
							:name="item.expanded ? 'arrow-up' : 'arrow-down'"
							@click="toggleAccordion()"
						/>
					</div>
				</div>
				<div
					v-if="hasChildren"
					:class="$s.DragBadge"
				>
					{{ descendantsSize }}
				</div>
			</div>
		</div>

		<template v-if="!listApi.accordionMode || item.expanded">
			<nested-list
				v-if="hasChildren"
				:path="path"
				:depth="depth + 1"
				:items="item.children"
			>
				<!-- proxy scoped slots down to child -->
				<template
					v-for="slot in Object.keys($scopedSlots)"
					:slot="slot"
					slot-scope="scope"
				>
					<slot
						:name="slot"
						v-bind="scope"
					/>
				</template>
			</nested-list>
			<dropzone
				v-else
				:depth="depth + 1"
				:to="path.concat(0)"
			/>
		</template>
		<pseudo-window @resize.passive="checkMobile" />
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import PseudoWindow from 'vue-pseudo-window';
import ListAPIKey from './ListAPIKey';
import Dropzone from './Dropzone.vue';
import { draggable, droppable } from './v-draggable';
import { itemCount, itemDepth, canDrop } from './utils';

export default {
	name: 'NestedListItem',

	directives: {
		draggable,
		droppable,
	},

	components: {
		Dropzone,
		OIcon,
		PseudoWindow,
	},

	inject: {
		parentListItem: {
			from: 'listItem',
			default: () => ({}),
		},
		listApi: ListAPIKey,
	},

	provide() {
		const vm = this;
		return {
			listItem: {
				get isDragging() {
					return vm.parentListItem.isDragging || vm.isDragging;
				},
				set dropHighlight(val) {
					vm.isDropParent = val;
				},
				get isLastChild() {
					return vm.isLastChild;
				},
			},
		};
	},

	props: {
		item: {
			type: Object,
			required: true,
		},
		parent: {
			type: Array,
			required: true,
		},
		depth: {
			type: Number,
			required: true,
		},
		path: {
			type: Array,
			required: true,
		},
		anchored: {
			type: Boolean,
			default: false,
		},
		dragDisabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			isMobile: false,
			isDropParent: false,
		};
	},

	computed: {
		hasActions() {
			return this.$slots.actions || this.$scopedSlots.actions;
		},

		hasChildren() {
			return this.item.children && this.item.children.length > 0;
		},

		isDragging() {
			return this.item === this.listApi.draggingItem;
		},

		descendantsSize() {
			return itemCount(this.item).toLocaleString();
		},

		itemStyle() {
			const basePadding = 16;
			const paddingPerDepth = 32;
			return {
				paddingLeft: `${this.depth * paddingPerDepth + basePadding}px`,
			};
		},

		isLastChild() {
			const parentRootOrLastChild = !('isLastChild' in this.parentListItem) || this.parentListItem.isLastChild;
			const isLastChild = (this.parent.length - 1) === this.parent.indexOf(this.item);
			return parentRootOrLastChild && isLastChild;
		},

		isVeryLastChild() {
			return this.isLastChild && !this.hasChildren;
		},
	},

	mounted() {
		this.checkMobile();
	},

	beforeCreate() {
		// eslint-disable-next-line global-require, import/no-dynamic-require
		this.$options.components.NestedList = require('./NestedList.vue').default;
	},

	methods: {
		toggleAccordion(val = !this.item.expanded) {
			if (this.listApi.accordionMode) {
				this.$set(this.item, 'expanded', val);
			}
		},

		peekAccordion() {
			this.peek = setTimeout(() => {
				if (this.hasChildren) {
					this.toggleAccordion(true);
				}
			}, 500);
		},

		cancelPeek() {
			clearTimeout(this.peek);
		},

		onDrop(e) {
			if (e.originalEvent.dropped) { return; }
			e.originalEvent.dropped = true;

			this.toggleAccordion(true);

			const lastIdx = this.item.children ? this.item.children.length : 0;
			const to = this.path.concat(lastIdx);
			const totalDepth = itemDepth(this.listApi.draggingItem) + this.depth;

			if (totalDepth >= this.listApi.maxDepth) { return; }
			if (canDrop({ to, listApi: this.listApi }) === false) { return; }

			this.listApi.onDrop(to);
		},

		checkMobile() {
			this.isMobile = window.innerWidth < 600;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.ItemContainer {
	position: relative;
	user-select: none;

	&.isGhost {
		opacity: 0.2;
		pointer-events: none;
	}
}

.ActionsContainer {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.ActionsSlot {
	margin-left: var(--space-x2);

	@media (--for-tablet-portrait-up) {
		visibility: hidden;
	}
}

.HandleContainer {
	display: flex;
	align-items: center;
	margin-right: calc(var(--space) + var(--space-half));
	color: var(--color-gray-40);
	touch-action: none;
}

.AccordionArrow {
	margin-left: 8px;
}

.Item {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	height: var(--space-x6); /* 48px */
	box-sizing: border-box;
	padding: 0 var(--space-x2); /* 16px */
	border-bottom: var(--divider-border);
	cursor: grab;

	&.bottomBorderless {
		border-bottom: none;
	}

	&.isDropParent {
		background: var(--color-gray-20);
	}

	&:hover .ActionsSlot {
		visibility: visible;
	}

	&:hover:not(.undraggable) {
		background: var(--color-gray-10);
	}

	&.dragging {
		min-width: 200px;
		max-width: 300px;
		padding: 0 var(--space-x2) !important;
		border: 2px solid var(--brand-color);
		border-radius: var(--border-radius-base);
		background-color: var(--color-white);
		box-shadow: var(--box-shadow-interactive);
		opacity: 0.95;

		& .ActionsContainer {
			display: none;
		}
	}

	&.anchored,
	&.undraggable {
		cursor: default;
	}
}

.LabelContainer {
	composes: overflow-ellipsis from "@square/orbit/styles/util.css";
	flex: 1;
}

.ContentContainer {
	display: flex;
	flex: 1;
	align-items: center;
	overflow: hidden;
}

.DragBadge {
	display: none;
	position: absolute;
	top: -16px;
	right: -16px;
	box-sizing: border-box;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: var(--brand-color);
	color: var(--color-white);
	font-size: 12px;
	line-height: 32px;
	text-align: center;
}

.Item.dragging .DragBadge {
	display: block;
}

.bodyCursor {
	cursor: grabbing !important;
}
</style>
