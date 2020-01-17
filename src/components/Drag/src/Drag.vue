<script>
import { ContainerMixin } from 'vue-slicksort';


export default {
	name: 'ODrag',

	mixins: [ContainerMixin],
	props: {
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
			const newObj = Object.assign({}, obj);
			delete newObj.event;
			delete newObj.collection;
			return newObj;
		},
	},

	render() {
		const { $s } = this;

		if (this.$slots.default) {
			this.$slots.default.filter(vnode => vnode.tag).forEach((vnode) => {
				vnode.componentOptions.propsData.disabled = !this.isDraggable;
			});
		}

		let footer = null;
		if (this.$slots.footer) {
			footer = (
				<div class={ $s.Footer }>
					{this.$slots.footer}
				</div>
			);
		}

		return (
			<div class={[
				$s.Drag,
				{ [$s.isDraggable]: this.isDraggable },
			]}>
				{this.$slots.default}
				{ footer }
			</div>
		);
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
