<template>
	<th
		:class="[
			$s.TableHeader,
			{
				[$s.clickable]: !disabled && (columnData.checkable || isSortable),
				[$s.checkable]: columnData.checkable,
				[$s['no-header']]: table.noHeader,
			},
		]"
		@click="handleSort"
	>
		<div
			:class="[
				$s.ContentWrapper,
				$s[`align_${align}`],
				{ [$s.sortable]: isSortable },
			]"
		>
			<div>
				<slot />
			</div>
			<o-icon
				v-if="isSortable"
				key="icon"
				:class="[
					$s.SortIcon,
					$s[`align_${align}`],
					{ [$s.sorted]: isSorted },
				]"
				:name="sortIcon"
			/>
		</div>
	</th>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import { OIcon } from '@square/orbit/components/Icon';
import Key from './Key';


export default {

	name: 'OTableCol',

	components: {
		OIcon,
	},

	props: {
		property: {
			type: String,
			default: undefined,
		},
		align: {
			type: String,
			default: 'left',
			validator: alignVal => ['left', 'right', 'center'].includes(alignVal),
		},
		sortable: {
			type: [String, Boolean],
			default: false,
			validator: sortVal => [false, true, '', 'asc', 'desc'].includes(sortVal),
		},
		checkable: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	inject: {
		table: Key,
	},

	data() {
		return {
			formatter: undefined,
			columnData: {
				property: this.property,
				align: this.align,
				sortable: this.sortable,
				checkable: this.checkable,
				formatter: this.formatter,
			},
			sortIcon: 'indicator-arrow-down',
			isSorted: false,
			isSortable: false,
		};
	},

	watch: {
		'columnData.sortable': function update(sortable) {
			this.updateSortable(sortable);
		},
		sortable(sortable) {
			this.updateSortable(sortable);
		},
	},

	mounted() {
		if (this.$scopedSlots.formatter) {
			this.columnData.formatter = this.$scopedSlots.formatter;
		}

		// $scopedSlots are not available until after mount
		const idx = this.$parent.$slots.default.indexOf(this.$vnode);

		// If no vnode we can assume this is the checkbox column
		if (idx === -1) {
			this.table.columns.unshift(this.columnData);
		} else {
			const isCheckable = this.table.columns.find(column => column.checkable);
			this.table.columns.splice(isCheckable ? (idx + 1) : idx, 0, this.columnData);
		}

		this.updateSortable(this.sortable);
	},

	created() {
		if (typeof this.sortable === 'string' && this.sortable) {
			if (this.table.sortBy !== null) {
				throwError('TableCol', 'You cannot instantiate a table with multiple columns sorted by default');
			}

			this.table.sortBy = this.columnData;
		}
	},

	beforeDestroy() {
		this.table.columns.splice(this.table.columns.indexOf(this.columnData), 1);
	},

	methods: {
		handleSort() {
			if (this.sortable === false) { return; }

			if (this.table.sortBy && this.table.sortBy !== this.columnData) {
				this.table.sortBy.sortable = '';
			}

			this.columnData.sortable = this.columnData.sortable === 'desc' ? 'asc' : 'desc';

			this.table.sortBy = this.columnData;
			this.table.$emit('sort', this.columnData.property, this.columnData.sortable);
		},
		updateSortable(sortable) {
			this.sortIcon = sortable === 'asc' ? 'indicator-arrow-up' : 'indicator-arrow-down';
			this.isSorted = ['asc', 'desc'].includes(sortable);
			this.isSortable = sortable !== false;
		},
	},
};
</script>

<style module="$s">
@import "./vars.css";

.ContentWrapper {
	display: flex;
	align-items: center;
	margin: calc(0.5 * (1 - var(--line-height-base)))em 0;

	&.align_center {
		justify-content: center;
	}

	&.align_right {
		flex-direction: row-reverse;
	}
}

.TableHeader {
	composes: font-base from "@square/orbit/styles/util.css";
	box-sizing: border-box;
	height: var(--table-header-height);
	padding: var(--row-padding-vertical) var(--row-padding-horizontal);
	transition: background var(--transition-base);
	border: none;
	border-top: var(--divider-border);
	border-bottom: var(--divider-border);
	background-color: var(--table-header-bg-color);
	color: var(--table-header-color);
	font-size: var(--table-header-font-size);
	font-weight: var(--table-header-font-weight);

	&:first-child {
		padding-left: var(--row-padding-first);
	}

	&:last-child {
		padding-right: var(--row-padding-last);
	}

	&.clickable {
		cursor: pointer;

		&:hover {
			background-color: var(--table-header-hover-bg-color);
		}
	}

	&.checkable {
		width: var(--table-cell-checkable-width);
	}
}

.no-header {
	height: 0;
	padding: 0;
	border: 0;

	/*
	Only display content to screen readers

	Taken from Bootstrap 4. More info:
	- http://a11yproject.com/posts/how-to-hide-content
	- http://hugogiraudel.com/2016/10/13/css-hide-and-seek/
	*/
	& .ContentWrapper {
		position: absolute;
		white-space: nowrap;
		overflow: hidden;
		/* stylelint-disable plugin/no-unsupported-browser-features */
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
		/* stylelint-enable plugin/no-unsupported-browser-features */
	}
}

.SortIcon {
	transition: color var(--transition-base);
	color: transparent;

	&.sorted {
		color: var(--table-sort-color);
	}

	&.align_left,
	&.align_center {
		margin-left: var(--space-half);
	}

	&.align_right {
		margin-right: var(--space-half);
	}
}
</style>
