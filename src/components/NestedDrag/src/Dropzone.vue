<template>
	<div
		v-droppable
		:class="[
			$s.Dropzone,
			{
				[$s.hover]: isHovering,
				[$s.active]: isActive,
			}
		]"
		:style="dropzoneStyles"
		@dragenter="onDragEnter"
		@dragleave="onDragLeave"
		@dragover.prevent
		@drop="onDrop"
	/>
</template>

<script>
import ListAPIKey from './ListAPIKey';
import { itemDepth, canDrop } from './utils';
import { droppable } from './v-draggable';

export default {
	name: 'Dropzone',

	directives: {
		droppable,
	},

	props: {
		depth: {
			type: Number,
			required: true,
		},

		to: {
			type: Array,
			required: true,
		},
	},

	inject: {
		parentItem: {
			from: 'listItem',
			default: () => ({}),
		},
		listApi: ListAPIKey,
	},

	data() {
		return {
			isHovering: false,
		};
	},

	computed: {
		dropzoneStyles() {
			return {
				zIndex: this.depth + 1,
				left: `${this.depth * 32}px`,
			};
		},

		isImmediateSiblingDragged() {
			const to = this.to.toString();
			const { draggingFrom } = this.listApi;

			let after = draggingFrom.slice();
			after[after.length - 1] += 1;
			after = after.toString();

			return (draggingFrom.toString() === to) || (after === to);
		},

		isActive() {
			if (
				!this.listApi.draggingItem
				|| this.parentItem.isDragging
				|| this.isImmediateSiblingDragged
			) {
				return false;
			}
			const totalDepth = itemDepth(this.listApi.draggingItem) + this.depth;

			// can always drop items at root level
			return this.depth === 0 || totalDepth <= this.listApi.maxDepth;
		},
	},

	methods: {
		onDragEnter() {
			if (canDrop({ to: this.to, listApi: this.listApi }) === false) { return; }

			this.isHovering = true;
			this.parentItem.dropHighlight = true;
		},

		onDragLeave() {
			this.isHovering = false;
			this.parentItem.dropHighlight = false;
		},

		onDrop(e) {
			if (e.originalEvent.dropped) { return; }
			e.originalEvent.dropped = true;

			if (canDrop({ to: this.to, listApi: this.listApi }) === false) { return; }

			this.listApi.onDrop(this.to);
			this.isHovering = false;
			this.parentItem.dropHighlight = false;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--ball-size: var(--space-half);
}

.Dropzone {
	pointer-events: none;
	position: absolute;
	right: 0;
	height: var(--space-x3);
	margin-top: calc(-1 * var(--space-x3));
	z-index: 1;
}

.Dropzone.active {
	pointer-events: auto;
}

/* before and after styles for drawing drop cursor */
.Dropzone.hover::before {
	display: block;
	position: absolute;
	top: calc(var(--space-x3) - var(--ball-size) - 1px); /* 20px */

	/* space halves are 4px */
	left: calc(-1 * var(--ball-size));
	width: var(--ball-size);
	height: var(--ball-size);
	border: 2px solid var(--brand-color);
	border-radius: 50%;
	background: var(--color-white);
	content: "";
	z-index: 2;
}

.Dropzone.hover::after {
	display: block;
	position: absolute;
	top: calc(var(--space-x3) - 2px); /* 18px */
	left: 0;
	width: 100%;
	height: 2px;
	background: var(--brand-color);
	content: "";
	z-index: 1;
}
</style>
