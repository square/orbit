<template>
	<div
		:class="[$s.DragItem, { [$s.isDraggable]: !disabled }]"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<div
			v-if="!disabled"
			ref="handle"
			:class="$s.Handle"
		>
			<slot name="handle">
				<o-icon
					name="drag-bars"
				/>
			</slot>
		</div>
		<div
			:class="$s.Content"
		>
			<div :class="$s.ContentContainer">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
import { ElementMixin } from 'vue-slicksort';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	name: 'ODragItem',

	components: {
		OIcon,
	},

	mixins: [ElementMixin],

	props: {
		// private, for inheritence. vue-slicksort limitation.
		disabled: {
			type: Boolean,
			default: false,
		},
		item: {
			type: String,
			default: undefined,
		},
	},

	data() {
		return {
			isTouchDevice: false,
		};
	},

	mounted() {
		this.detectMobile();
		this.setSortable();
	},

	methods: {
		setSortable() {
			if (this.$refs.handle) {
				this.$refs.handle.sortableHandle = true;
			}
			this.$el.sortableHandle = this.isTouchDevice ? null : true;
		},
		detectMobile() {
			this.isTouchDevice = 'ontouchstart' in window;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";
@import "@square/orbit/styles/vars-row.css";

.Content {
	display: flex;
	align-items: center;
	width: 100%;
	padding:
		var(--row-padding-vertical)  var(--row-padding-last)
		var(--row-padding-vertical)  var(--row-padding-first);
}

.DragItem {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	position: relative;
	align-items: center;
	border-bottom: var(--divider-border);
	background-color: var(--color-white);
	user-select: none;

	&:first-of-type {
		border-radius: var(--border-radius-base) var(--border-radius-base) 0  0;
	}

	&:last-of-type {
		border-bottom: none;
		border-radius: var(--border-radius-base) var(--border-radius-base) 0 0;
	}

	&.isDraggable {
		&:hover {
			background-color: var(--color-gray-10);
		}

		& .Content {
			padding-left: 0;
		}
	}
}

.ContentContainer {
	width: 100%;

	/* Removes some of the white-space above and below the text rendering block. */
	margin: calc(0.5 * (1 - var(--line-height-base)))em 0;
}

.Handle {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	padding: var(--row-padding-vertical) var(--row-padding-horizontal);
	color: var(--color-gray-40);
	cursor: grab;
	touch-action: none;
}
</style>
