<script>
import { OCheckbox } from '@square/orbit/components/Checkbox';

function emit(ctx, eventName, ...args) {
	const eventHandler = ctx.listeners[eventName];
	if (typeof eventHandler === 'function') {
		eventHandler(...args);
	}
}


export default {
	name: 'OTr',

	functional: true,

	props: {
		rowData: {
			// Might be a bad assumption
			type: Object,
			required: true,
		},
		rowIndex: {
			type: Number,
			default: undefined,
		},
		columns: {
			type: Array,
			required: true,
		},
		isChecked: {
			type: Boolean,
			default: false,
		},
		clickable: {
			type: Boolean,
			default: false,
		},
	},

	render(h, ctx) {
		const { props, $s } = ctx;

		function updateChecked(checked) {
			if (checked) {
				emit(ctx, 'checked', props.rowData);
			} else {
				emit(ctx, 'unchecked', props.rowData);
			}
		}

		return (
			<tr
				class={[
					$s.Row,
					{
						[$s.clickable]: props.clickable,
						[$s.checked]: props.isChecked,
					},
				]}
				onClick={() => {
					if (props.clickable) {
						emit(ctx, 'click', props.rowData);
					}
				}}
			>
				{(() => {
					const { rowData, rowIndex, columns } = props;

					return columns.map(column => (
						<td
							class={{
								[$s[`align_${column.align}`]]: column.align,
								[$s.checkable]: column.checkable,
							}}
							onClick={(event) => {
								if (!column.checkable) { return; }
								event.stopPropagation();
								updateChecked(!props.isChecked);
							}}
						>
							<div class={$s.ContentWrapper}>
								{(() => {
									let tdContent;

									// Handle Empty columns
									if (column.property) {
										tdContent = rowData[column.property];
									} else if (column.checkable) {
										const listeners = {};
										listeners['checkbox:update'] = updateChecked;
										tdContent = (
											<OCheckbox
												class={$s.Checkbox}
												checked={props.isChecked}
												nativeOnClick={evnt => evnt.stopPropagation()}
												{...{ on: listeners }}
											/>
										);
									}

									if (typeof column.formatter === 'function') {
										tdContent = column.formatter({
											content: tdContent,
											data: rowData,
											index: rowIndex,
										});
									}

									return tdContent;
								})()}
							</div>
						</td>
					));
				})()}
			</tr>
		);
	},
};
</script>

<style module="$s">
@import "./vars.css";
@import "@square/orbit/styles/vars-row.css";

.Row {
	composes: font-base from "@square/orbit/styles/util.css";

	& td {
		box-sizing: border-box;
		padding: var(--row-padding-vertical) var(--row-padding-horizontal);
		border: none;
		border-bottom: var(--divider-border);
		color: var(--table-color);
		font-size: var(--table-font-size);

		&:first-child {
			padding-left: var(--row-padding-first);
		}

		&:last-child {
			padding-right: var(--row-padding-last);
		}

		&.align_left {
			text-align: left;
		}

		&.align_right {
			text-align: right;
		}

		&.align_center {
			text-align: center;
		}
	}

	&.checked {
		background-color: var(--table-checked-bg-color);
	}

	& td.checkable {
		width: var(--table-cell-checkable-width);
	}

	&.clickable,
	& td.checkable {
		transition: background var(--transition-base);
		cursor: pointer;

		&:hover {
			background-color: var(--hover-bg-color);

			& td {
				color: var(--table-hover-color);
			}
		}
	}
}

.ContentWrapper {
	margin: calc(0.5 * (1 - var(--line-height-base)))em 0;
}

/* Overide orbit setting the height of checkbox inner element ControlContainer to 24px */
.Checkbox * {
	max-height: 18px;
}
</style>
