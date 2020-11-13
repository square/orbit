<template>
	<div>
		<table
			:class="[
				$s.Table,
				{
					[$s['no-header']]: noHeader,
					[$s.loading]: loading,
					[$s['is-empty']]: showEmptySlot,
				},
			]"
		>
			<o-thead
				:checked="allChecked"
				:disabled="disableChecked"
				@check="handleCheckAll"
			>
				<vnode-filter
					:enforce-component="TableCol"
					:map-fn="addMissingKeys"
					remove-whitespace
					@component-mismatch="onComponentMismatch"
				>
					<slot />
				</vnode-filter>
			</o-thead>
			<tbody>
				<tr v-if="loading">
					<td :class="$s.LoadingWrapper">
						<o-loading
							:variant="rowData && rowData.length > 2 ? 'spinner-large' : 'spinner'"
							:class="$s.Loader"
						/>
					</td>
				</tr>
				<o-tr
					v-for="(tr, idx) in rowData"
					:key="idx"
					:row-data="tr"
					:row-index="idx"
					:clickable="!!($listeners && $listeners.rowClick)"
					:columns="columns"
					:is-checked="checkedArr && checkedArr.includes(tr)"
					@click="propagateClick"
					@checked="checkRow"
					@unchecked="uncheckRow"
				/>
			</tbody>
		</table>

		<div
			v-if="showEmptySlot"
			:class="$s.EmptySlot"
		>
			<slot name="empty" />
		</div>

		<div
			v-if="showPaginationControls"
			:class="$s.Pagination"
		>
			<div>
				<o-button-group
					v-if="showPerPage"
					:value="rowsPerPage"
					:disabled="loading"
					mode="single-select"
					@button-group:update="$emit('update:rowsPerPage', $event)"
				>
					<o-button-group-item
						v-for="(perPageOpt, idx) in rowsPerPageOptions"
						:key="idx"
						:value="perPageOpt"
					>
						{{ perPageOpt }}
					</o-button-group-item>
				</o-button-group>
			</div>
			<o-pagination
				v-if="hasMultiplePages"
				:pages="numPages"
				:current-page="currentPage"
				:disabled="loading"
				selectable
				@pagination:update="$emit('update:currentPage', $event)"
			/>
		</div>
	</div>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import { OButtonGroup, OButtonGroupItem } from '@square/orbit/components/ButtonGroup';
import { OPagination } from '@square/orbit/components/Pagination';
import { OLoading } from '@square/orbit/components/Loading';

import Key from './Key';
import TableCol from './TableCol.vue';
import OThead from './Thead.vue';
import OTr from './Tr.vue';

export default {

	name: 'OTable',

	components: {
		OThead,
		OTr,
		OButtonGroup,
		OButtonGroupItem,
		OPagination,
		OLoading,
		VnodeFilter,
	},

	props: {
		rowData: {
			// Might be a bad assumption
			type: Array,
			required: true,
		},

		checked: {
			type: Array,
			default: undefined,
		},

		noHeader: {
			type: Boolean,
			default: false,
		},

		rowsPerPageOptions: {
			type: [Array, Boolean],
			default: () => [10, 25, 50],
		},

		rowsPerPage: {
			type: Number,
			validator: (n) => Number.isInteger(n) && n > 0,
			default: undefined,
		},

		currentPage: {
			type: Number,
			validator: (n) => Number.isInteger(n) && n > 0,
			default: undefined,
		},

		totalRows: {
			type: Number,
			validator: (n) => Number.isInteger(n) && n >= 0,
			default: undefined,
		},

		loading: {
			type: Boolean,
			default: false,
		},
	},

	provide() {
		return {
			[Key]: this,
		};
	},

	data() {
		return {
			TableCol,
			columns: [],
			sortBy: null,
		};
	},

	computed: {
		checkedArr() {
			return this.checked;
		},

		allChecked() {
			return this.checkedArr
				&& this.checkedArr.length > 0
				&& this.rowData.length > 0
				&& this.rowData.every((row) => this.checkedArr.includes(row));
		},

		disableChecked() {
			return this.rowData && this.rowData.length === 0;
		},

		numPages() {
			return Math.ceil(this.totalRows / this.rowsPerPage);
		},

		hasMultiplePages() {
			return this.numPages > 1;
		},

		showEmptySlot() {
			return (this.$slots.empty && !this.loading && this.rowData.length === 0);
		},

		showPaginationControls() {
			return this.rowsPerPage && this.totalRows && this.currentPage;
		},

		showPerPage() {
			return this.rowsPerPageOptions && this.rowsPerPageOptions.length;
		},
	},

	watch: {
		rowsPerPage() {
			this.resetPagination();
		},
	},

	methods: {
		onComponentMismatch() {
			throwError('Table', 'You can only use the TableCol component inside Table');
		},

		addMissingKeys(columnVnode) {
			columnVnode.key = columnVnode.key || columnVnode.componentOptions.propsData.property;
			return columnVnode;
		},

		propagateClick(rowData) {
			this.$emit('rowClick', rowData);
		},

		handleCheckAll(checkAll) {
			if (checkAll) {
				this.rowData.forEach((row) => !this.checkedArr.includes(row) && this.checkRow(row));
			} else {
				this.rowData.forEach((row) => this.uncheckRow(row));
			}
		},

		checkRow(row) {
			this.checkedArr.push(row);
			this.$emit('row:checked', row);
		},

		uncheckRow(row) {
			const idx = this.checkedArr.indexOf(row);
			this.checkedArr.splice(idx, 1);
			this.$emit('row:unchecked', row);
		},

		resetPagination() {
			if (this.currentPage !== 1) {
				this.$emit('update:currentPage', 1);
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-row.css";
@import "./vars.css";

.Table {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	border: none;
	border-collapse: collapse;
	z-index: 0;

	&.no-header:not(.is-empty) {
		border-top: var(--divider-border);
	}

	&.loading {
		height: calc(14 * var(--space));
		overflow: hidden;
	}
}

.Pagination {
	display: flex;
	align-items: baseline; /* Prevents items from stretching to the full height */
	justify-content: space-between;
	margin-top: 24px;
}

.PerPageSelect {
	display: inline-block;
	margin-left: 10px;
}

.LoadingWrapper {
	position: absolute;
	box-sizing: border-box;
	width: 100%;
	height: calc(100% - var(--table-header-height));
	background-color: color(var(--table-header-bg-color) a(0.9));
	z-index: 1;
}

.no-header .LoadingWrapper {
	height: 100%;
}

.Loader {
	position: absolute;
	top: 50%;
	left: 50%;
	margin: 0 auto;
	transform: translateX(-50%) translateY(-50%);
}

.EmptySlot {
	padding: var(--space-x4) var(--row-padding-last) var(--space-x4) var(--row-padding-first);
	background-color: var(--disabled-bg-color);
	text-align: center;
}

</style>
