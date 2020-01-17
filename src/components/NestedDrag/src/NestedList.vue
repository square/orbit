<template>
	<div :class="$s.NestedList">
		<dropzone
			:depth="depth"
			:to="path.concat(0)"
		/>
		<template v-for="(item, index) in items">
			<nested-list-item
				:key="key('item', depth, index)"
				:item="item"
				:parent="items"
				:depth="depth"
				:path="path.concat(index)"
				:anchored="isSoleRoot"
				:drag-disabled="item.dragDisabled"
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
			</nested-list-item>
			<dropzone
				:key="key('dz', depth, index)"
				:depth="depth"
				:to="path.concat(index + 1)"
			/>
		</template>
	</div>
</template>

<script>
import Dropzone from './Dropzone.vue';
import NestedListItem from './NestedListItem.vue';

export default {
	name: 'NestedList',

	components: {
		Dropzone,
		NestedListItem,
	},

	props: {
		path: {
			type: Array,
			required: true,
		},

		depth: {
			type: Number,
			required: true,
		},

		items: {
			type: Array,
			required: true,
		},
	},

	computed: {
		isSoleRoot() {
			return this.path.length === 0 && this.items.length === 1;
		},
	},

	methods: {
		key(...args) {
			return args.join('-');
		},
	},
};
</script>

<style module="$s">
.NestedList {
	position: relative;
}
</style>
