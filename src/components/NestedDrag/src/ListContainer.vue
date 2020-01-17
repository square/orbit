<template>
	<div :class="$s.ListContainer">
		<nested-list
			:items="value"
			:depth="0"
			:path="[]"
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
	</div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import ListAPIKey from './ListAPIKey';
import NestedList from './NestedList.vue';
import { moveTo } from './utils';

export default {
	name: 'ListContainer',

	components: {
		NestedList,
	},

	model: {
		prop: 'value',
		event: 'drag:update',
	},

	provide() {
		const vm = this;
		return {
			[ListAPIKey]: {
				onDragStart: (draggingItem, draggingFrom) => {
					Object.assign(this, { draggingItem, draggingFrom });
					this.$emit('drag:start');
				},

				// called when the user drops item outside of a dropzone
				onDragEnd: () => this.cleanupDrag(),

				// called when the user drops item inside of a dropzone
				onDrop: (draggingTo) => {
					const newList = moveTo(
						cloneDeep(this.value),
						this.draggingFrom,
						draggingTo,
					);

					this.$emit('drag:update', newList);
					this.cleanupDrag();
				},

				get list() {
					return vm.value;
				},

				get draggingItem() {
					return vm.draggingItem;
				},

				get draggingFrom() {
					return vm.draggingFrom;
				},

				get maxDepth() {
					return vm.maxDepth;
				},

				get accordionMode() {
					return vm.accordion;
				},

				get onDragOver() {
					return vm.onDragOver;
				},
			},
		};
	},

	props: {
		value: {
			type: Array,
			required: true,
		},
		maxDepth: {
			type: Number,
			default: 5,
		},
		accordion: {
			type: Boolean,
			default: false,
		},
		onDragOver: {
			type: Function,
			default: null,
		},
	},

	data() {
		return {
			draggingFrom: null,
			draggingItem: null,
		};
	},

	methods: {
		cleanupDrag() {
			Object.assign(this, {
				draggingFrom: null,
				draggingTo: null,
				draggingItem: null,
			});
			this.$emit('drag:end');
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.ListContainer {
	position: relative;
	border: var(--divider-border);
	border-bottom: none;
	border-radius: var(--border-radius-base);
	box-sizing: border-box;
	z-index: 0;
}
</style>
