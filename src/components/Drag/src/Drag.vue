<template>
	<div
		:class="[$s.Drag, {
			[$s.isDraggable]: isDraggable,
		}]"
	>
		<vnode-syringe
			:disabled!="disabled"
		>
			<slot />
		</vnode-syringe>
		<div
			v-if="$slots.footer"
			:class="$s.Footer"
		>
			<slot name="footer" />
		</div>
	</div>
</template>
<script>
import { ContainerMixin } from 'vue-slicksort';
import VnodeSyringe from 'vue-vnode-syringe';

export default {
	name: 'ODrag',

	components: {
		VnodeSyringe,
	},

	mixins: [ContainerMixin],

	props: {
		// private overwrite
		useDragHandle: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		distance: {
			type: Number,
			default: 5,
		},
		helperClass: {
			type: String,
			default() {
				return this.$s.isDragging;
			},
		},
	},

	computed: {
		isDraggable() {
			return !this.disabled && this.value.length > 1;
		},
	},

	created() {
		this.$on('input', (val) => {
			this.$emit('drag:update', val);
		});

		this.$on('sortStart', (val) => {
			this.$emit('drag:sort-start', this.stripUnusedProps(val));
		});

		this.$on('sortEnd', (val) => {
			this.$emit('drag:sort-end', this.stripUnusedProps(val));
		});
	},

	methods: {
		stripUnusedProps(obj) {
			const newObj = { ...obj };
			delete newObj.event;
			delete newObj.collection;
			return newObj;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";
@import "@square/orbit/styles/vars-row.css";

.Drag {
	overflow-y: auto;
	border-top: var(--divider-border);
	border-bottom: var(--divider-border);
	border-radius: 0;
	background-color: var(--color-gray-10);
	user-select: none;

	&.isDraggable {
		border-right: var(--divider-border);
		border-left: var(--divider-border);
		border-radius: var(--border-radius-base);
	}
}

.Footer {
	background-color: var(--color-white);
}

.isDragging {
	/* !important is required to override the border radius values set on the first and last items
	in DragItem.vue */
	border-radius: var(--border-radius-base) !important;
	box-shadow:
		0 0 0 2px var(--brand-color),
		0 4px 10px 0 rgba(0, 0, 0, 0.1),
		0 3px 10px rgba(0, 0, 0, 0.15);
}

</style>
