<template>
	<div
		:class="[
			flushClasses,
			{
				[$s.ButtonGroup]: !isNested,
				[$s.NestedButtonGroup]: isNested,
				[$s['full-width']]: _fullWidth
			},
		]"
	>
		<vnode-filter
			:enforce-component="[ButtonGroup, ButtonGroupItem]"
			remove-whitespace
			@componentMismatch="onComponentMismatch"
		>
			<slot />
		</vnode-filter>
	</div>
</template>
<script>
import { throwError } from '@square/orbit/utils/debug';
import { FormItemKey } from '@square/orbit/components/Form';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import ButtonGroupItem from './ButtonGroupItem.vue';
import ButtonGroupKey from './Key';

export default {
	name: 'OButtonGroup',

	components: {
		VnodeFilter,
	},

	model: {
		event: 'button-group:update',
	},

	inject: {
		parentButtonGroup: {
			from: ButtonGroupKey,
			default: undefined,
		},
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	provide() {
		return {
			[ButtonGroupKey]: this,
		};
	},

	props: {
		value: {
			type: null,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		mode: {
			type: String,
			default: 'normal',
			validator: modeVal => ['normal', 'multi-select', 'single-select', 'single-select-optional'].includes(modeVal),
		},
		size: {
			type: String,
			default: undefined,
			validator: value => ['small', 'medium', 'large'].includes(value),
		},
		fullWidth: {
			type: Boolean,
			default: false,
		},
		flush: {
			type: [String, Array],
			default: undefined,
			validator(values) {
				if (!Array.isArray(values)) {
					values = [values];
				}
				if (values.length < 1 || values.length > 4) {
					return false;
				}
				return values.every(value => ['top', 'left', 'bottom', 'right'].includes(value));
			},
		},
	},

	data() {
		return {
			ButtonGroupItem,
			ButtonGroup: this.constructor.extendOptions,
		};
	},

	computed: {
		isNested() {
			return !!this.parentButtonGroup;
		},
		_size() {
			return this.isNested ? this.parentButtonGroup.size : this.size;
		},
		_disabled() {
			return (this.isNested && this.parentButtonGroup.disabled) || this.disabled;
		},
		_fullWidth() {
			return this.isNested ? this.parentButtonGroup.fullWidth : this.fullWidth;
		},
		flushClasses() {
			let flush = this.flush || [];
			if (!Array.isArray(flush)) {
				flush = [flush];
			}
			return flush.map(side => this.$s[`flush-${side}`]);
		},
	},

	watch: {
		value() {
			this.validateProps();
		},
	},

	created() {
		this.validateProps();
		if (this.formItem) {
			this.formItem.addUnwrappedChild();
		}
	},

	destroyed() {
		if (this.formItem) {
			this.formItem.removeUnwrappedChild();
		}
	},

	methods: {
		onComponentMismatch() {
			if (this.isNested) {
				throwError('ButtonGroup', 'You can only use the ButtonGroupItem component within a nested ButtonGroup.');
			} else {
				throwError('ButtonGroup', 'You can only use the ButtonGroup and ButtonGroupItem components within a ButtonGroup.');
			}
		},

		updateSelected(newVal) {
			if (this.mode.startsWith('single-select')) {
				if (this.mode === 'single-select-optional' && this.value === newVal) {
					newVal = null;
				}
				if (this.value !== newVal) {
					this.$emit('button-group:update', newVal);
				}
			} else if (this.mode === 'multi-select') {
				const arr = this.value.slice();

				if (arr.includes(newVal)) {
					arr.splice(arr.indexOf(newVal), 1);
				} else {
					arr.push(newVal);
				}

				this.$emit('button-group:update', arr);
			}
		},

		validateProps() {
			if (this.mode === 'multi-select' && !Array.isArray(this.value)) {
				throwError('ButtonGroup', `The v-model value for a multi-select must be of type Array. "${this.value}" was found instead.`);
			}
			if (this.isNested && this.size) {
				throwError('ButtonGroup', 'Cannot individually set the size of nested ButtonGroups, can only set it from the parent.');
			}
			if (this.isNested && this.fullWidth) {
				throwError('ButtonGroup', 'Cannot individually set full-width on nested ButtonGroups, can only set it from the parent.');
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.ButtonGroup,
.NestedButtonGroup {
	display: inline-block;
	position: relative;
	z-index: 0;

	&.full-width {
		display: flex;
		width: 100%;
	}
}

.Button {
	border-radius: 0;
	z-index: 1;

	&:focus,
	&:active,
	&.selected {
		z-index: 2;
	}

	&.disabled,
	&.selected:disabled {
		z-index: 0;
	}
}

.ButtonWrapper {
	margin-right: -1px;
}

/* stylelint-disable selector-max-specificity  */
.ButtonGroup > .ButtonWrapper:last-child,
.ButtonGroup .NestedButtonGroup:last-child .ButtonWrapper:last-child {
	margin-right: 0;
}
/* stylelint-enable selector-max-specificity  */

.flush-top {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.flush-bottom {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.flush-left {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

.flush-right {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

/* stylelint-disable no-descending-specificity, selector-max-specificity  */
.ButtonGroup:not(.flush-left):not(.flush-top) {
	& > .ButtonWrapper:first-child .Button,
	& .NestedButtonGroup:first-child .ButtonWrapper:first-child .Button {
		border-top-left-radius: var(--border-radius-base);
	}
}

.ButtonGroup:not(.flush-right):not(.flush-top) {
	& > .ButtonWrapper:last-child .Button,
	& .NestedButtonGroup:last-child .ButtonWrapper:last-child .Button {
		border-top-right-radius: var(--border-radius-base);
	}
}

.ButtonGroup:not(.flush-left):not(.flush-bottom) {
	& > .ButtonWrapper:first-child .Button,
	& .NestedButtonGroup:first-child .ButtonWrapper:first-child .Button {
		border-bottom-left-radius: var(--border-radius-base);
	}
}

.ButtonGroup:not(.flush-right):not(.flush-bottom) {
	& > .ButtonWrapper:last-child .Button,
	& .NestedButtonGroup:last-child .ButtonWrapper:last-child .Button {
		border-bottom-right-radius: var(--border-radius-base);
	}
}
/* stylelint-enable no-descending-specificity, selector-max-specificity  */
</style>
