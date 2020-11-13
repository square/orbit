<template>
	<div
		:class="[
			$s.MultiSelect,
			{
				[$s.focused]: autocomplete.isInputFocused,
				[$s.disabled]: disabled,
				[$s.invalid]: formItem && formItem.invalid,
			},
		]"
		@click="focus"
	>
		<pseudo-window @keydown.passive.delete="handleDeletePress" />
		<autocomplete-pill
			v-for="(item, idx) in value"
			:key="idx"
			v-model="value[idx]"
			:value-key="valueKey"
			:class="$s.Pill"
			:focused="focusedPillIdx === idx"
			:invalid="isInvalid(item)"
			:disabled="disabled"
			deleteable
			@deleted="removePill(idx)"
			@click="focusingPill(idx)"
		/>
		<input
			ref="input"
			v-model="newPillVal"
			:class="$s.MultiSelectHiddenInput"
			:disabled="disabled"
			:placeholder="!value.length && placeholder"
			type="text"
			@blur="handleBlur"
			@keydown="handleInputKeydown"
			@keydown.up="autocomplete.focusNextOrPrevItem('prev', $event)"
			@keydown.down="autocomplete.focusNextOrPrevItem('next', $event)"
			@keydown.left="focusPill('left', $event)"
			@keydown.right="focusPill('right', $event)"
			@keydown.esc="blur"
			@keydown.enter="autocomplete.enter"
			v-on="$listeners"
		>
	</div>
</template>

<script>
import { FormItemKey } from '@square/orbit/components/Form';
import PseudoWindow from 'vue-pseudo-window';
import AutocompletePill from './AutocompletePill.vue';
import AutocompleteKey from './AutocompleteKey';

export default {
	name: 'AutocompleteMulti',

	components: {
		AutocompletePill,
		PseudoWindow,
	},

	model: {
		event: 'autocomplete:multi:update',
	},

	props: {
		value: {
			type: Array,
			required: true,
		},
		valueKey: {
			type: String,
			default: 'value',
		},
		placeholder: {
			type: String,
			default: undefined,
		},
		allowCustomValues: {
			type: String,
			default: undefined,
		},
		validator: {
			type: Function,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		delimiter: {
			type: [String, Array],
			default: ',',
		},
	},

	inject: {
		autocomplete: AutocompleteKey,
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	data() {
		return {
			focusedPillIdx: this.value.length,
			newPillVal: '',
		};
	},

	computed: {
		delimitersArray() {
			if (Array.isArray(this.delimiter)) {
				return this.delimiter;
			}

			return [this.delimiter];
		},
	},

	watch: {
		value() {
			this.resetPillIndex();
		},
		newPillVal(val) {
			if (val) {
				this.filterNewValues();
			}
			this.$emit('autocomplete:input', val);
		},
	},

	created() {
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
		blur() {
			this.$refs.input.blur();
		},
		filterNewValues() {
			const separatedValues = this.filterByDelimiters();
			if (separatedValues.length > 1) {
				this.addPill(separatedValues);
			}
		},
		formatNewValue(newValue) {
			return { [this.valueKey]: newValue };
		},
		filterByDelimiters() {
			const escapedDelimiters = this.delimitersArray.map((delimiter) => `\\${delimiter}`);
			const delimiterRegexString = `[${escapedDelimiters.join('')}]+`;
			return this.separateValueBy(this.newPillVal, delimiterRegexString);
		},
		separateValueBy(value, delimiters) {
			return value.trim().split(new RegExp(delimiters, 'g'))
				.filter(Boolean).map((string) => string.trim());
		},
		focus() {
			this.$refs.input.focus();
		},
		removePill(idx) {
			const [removed] = this.value.splice(idx, 1);
			this.$emit('autocomplete:multi:delete', removed);
			this.$emit('autocomplete:multi:update', this.value);
			this.focus();
		},
		addPill(newValue) {
			if (!newValue) { return; }
			let newArr = [];

			if (!Array.isArray(newValue)) {
				newValue = [newValue];
			}
			for (let i = 0; i < newValue.length; i += 1) {
				const newOption = newValue[i];
				const validPill = this.filterNewValue(newOption);
				if (validPill) {
					newArr.push(validPill);
				}
			}

			if (newArr.length) {
				this.newPillVal = '';
			}

			newArr = this.value.concat(newArr);
			this.$emit('autocomplete:multi:update', newArr);
		},
		filterNewValue(newValue) {
			let validPill = false;

			validPill = this.autocomplete.findValidOptionMatch(newValue);
			if (!validPill && this.allowCustomValues) {
				validPill = this.formatNewValue(newValue);
			}

			return validPill;
		},
		focusingPill(idx) {
			if (!this.disabled) {
				this.focus();
				this.focusedPillIdx = idx;
			}
		},
		focusPill(direction, e) {
			const movingCursorRightAfterSelection = this.focusedPillIdx === this.value.length && direction === 'right';
			if (this.$refs.input.selectionStart === 0 && !movingCursorRightAfterSelection) {
				if (e) {
					e.preventDefault();
				}
				if (direction === 'left' && this.focusedPillIdx > 0) {
					this.focusedPillIdx -= 1;
				} else if (direction === 'right' && this.focusedPillIdx < this.value.length) {
					this.focusedPillIdx += 1;
				}
			}
		},
		removeLastOrFocusedPill() {
			if (!this.newPillVal) {
				if (this.focusedPillIdx > this.value.length - 1) {
					this.focusPill('left');
				} else {
					this.removePill(this.focusedPillIdx);
				}
			}
		},
		handleDeletePress() {
			if (this.autocomplete.isInputFocused) {
				this.removeLastOrFocusedPill();
			}
		},
		handleInputKeydown(e) {
			if (this.autocomplete.isInputFocused) {
				// If the key pressed was one of the delimiters
				const matchesDelimiter = this.delimitersArray.includes(e.key);

				if (matchesDelimiter) {
					e.preventDefault();
					this.addPill(this.newPillVal);
				}

				// 8: backspace, 37: arrow-left, 39: arrow-right, 118: comma
				const invalidKeyCodes = [8, 37, 39, 188];
				if (!invalidKeyCodes.includes(e.keyCode)) {
					this.resetPillIndex();
				}
			}
		},
		handleBlur() {
			this.resetPillIndex();
		},
		resetPillIndex() {
			this.focusedPillIdx = this.value.length;
		},
		isInvalid(item) {
			return (typeof this.validator === 'function') && !this.validator(item);
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

:root {
	--reduced-padding: 6px;
	--pill-margin-top: 5px;
}

.MultiSelect {
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
	min-height: var(--form-height);
	padding: 0 var(--form-padding-horizontal) var(--reduced-padding);
	transition:
		border var(--transition-base),
		background-color var(--transition-base),
		color var(--transition-base);
	border: var(--form-border);
	border-radius: var(--form-border-radius);
	background-color: var(--form-bg-color);
	color: var(--form-color);
	line-height: normal;
	cursor: text;

	&::placeholder {
		color: var(--form-placeholder-color);
	}

	&:hover {
		border-color: var(--form-hover-border-color);
		color: var(--form-hover-color);
	}

	&.disabled,
	&.disabled:hover {
		border-color: var(--form-disabled-border-color);
		background-color: var(--form-disabled-bg-color);
		color: var(--form-disabled-color);
		cursor: default;
	}

	&.focused:not(.disabled) {
		border-color: var(--focus-border-color);
		outline: none;
		box-shadow: var(--focus-box-shadow);
	}

	/* Invalid
	------------------------- */
	&:--form-invalid-selector:not(.disabled) {
		border-color: var(--danger-border-color);
		box-shadow: var(--danger-box-shadow);
	}
}

.MultiSelectHiddenInput {
	composes: form-font-base from "@square/orbit/styles/util.css";
	flex: 1;
	margin: var(--pill-margin-top) 0 0 0;
	border: 0;
	background: none;
	box-shadow: none;
	overflow: hidden;

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: var(--form-placeholder-color);
	}

	&:disabled::placeholder {
		color: var(--form-disabled-placeholder-color);
	}
}

.Pill {
	margin-top: var(--pill-margin-top);
}
</style>
