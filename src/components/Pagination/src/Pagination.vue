<template>
	<div :class="[$s.Pagination, { [$s.selectable]: selectable }]">
		<o-button
			:class="$s.Button"
			:disabled="disabled || (onPage === 1)"
			@click="prevPage"
		>
			<o-icon name="arrow-left" />
		</o-button>

		<o-select
			v-if="selectable"
			v-model="onPage"
			:class="$s.Select"
			:options="pageOptions"
			:disabled="disabled"
		/>

		<vnode-filter
			:enforce-component="$options.components.OButton"
			@componentMismatch="componentMismatch"
			@completed="checkSlotLen"
		>
			<slot
				:nextPage="nextPage"
				:disabled="nextDisabled"
				name="next"
			>
				<o-button
					:class="$s.Button"
					:disabled="nextDisabled"
					@click="nextPage"
				>
					<o-icon name="arrow-right" />
				</o-button>
			</slot>
		</vnode-filter>
	</div>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';
import { OSelect } from '@square/orbit/components/Select';
import VnodeFilter from '@square/orbit/utils/v-node-filter';

export default {
	name: 'OPagination',

	components: {
		VnodeFilter,
		OButton,
		OIcon,
		OSelect,
	},

	model: {
		prop: 'currentPage',
		event: 'pagination:update',
	},

	props: {
		currentPage: {
			type: Number,
			default: 1,
			validator: (n) => Number.isInteger(n) && n > 0,
		},
		pages: {
			type: Number,
			required: true,
			validator: (n) => Number.isInteger(n) && n > 0,
		},
		selectable: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		pageOptions() {
			const pagesArr = Array(this.pages).fill().map((_, i) => ({ value: i + 1, label: i + 1 }));
			return pagesArr;
		},

		onPage: {
			get() {
				return this.currentPage;
			},
			set(val) {
				if (this.currentPage === val) { return; }
				if (val > 0 && val <= this.pages) {
					this.$emit('pagination:update', val);
				}
			},
		},

		nextDisabled() {
			return this.disabled || (this.onPage === this.pages);
		},
	},

	watch: {
		currentPage() {
			this.enforceBound();
		},
		pages() {
			this.enforceBound();
		},
	},

	created() {
		this.enforceBound();
	},

	methods: {
		nextPage() {
			this.onPage += 1;
		},

		prevPage() {
			this.onPage -= 1;
		},

		enforceBound() {
			if (this.currentPage > this.pages) {
				this.$emit('pagination:update', this.pages);
			}
		},

		componentMismatch() {
			throwError('Pagination', 'You can only use OButton components in the next slot');
		},

		checkSlotLen(vnodes) {
			if (vnodes.length > 1) {
				throwError('Pagination', 'You can only include one element in the next slot');
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars-form.css";

.Pagination {
	display: inline-flex;
	position: relative;
	z-index: 0;
}

.Button {
	position: relative;
	z-index: 2;

	/* Ensures that the box shadow of the hovered button doesnt go over the
	other button */
	&:hover {
		z-index: 1;
	}

	&:first-child {
		margin-right: var(--space-x2);
	}
}

.Select {
	margin-right: var(--space-x2);
}
</style>
