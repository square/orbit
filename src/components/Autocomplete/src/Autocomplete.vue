<template>
	<div :class="$s.Autocomplete">
		<pseudo-window @resize.passive="resizeDropdown" />
		<o-popover
			flush
			@open="onOpen"
			@close="onClose"
		>
			<div
				slot="action"
				slot-scope="popover"
			>
				<autocomplete-multi
					v-if="isMultiSelect"
					ref="input"
					:value="value"
					v-bind="$attrs"
					:allow-custom-values="allowCustomValues"
					:validator="validator"
					:value-separator="valueSeparator"
					:value-key="valueKey"
					v-on="$listeners"
					@autocomplete:input="setNewValue"
					@autocomplete:multi:update="$emit('autocomplete:update', $event)"
					@click.stop
					@focus="popover.open()"
					@blur="popover.close()"
				/>
				<o-input
					v-else
					ref="input"
					:value="inputVal"
					v-bind="$attrs"
					@click.stop
					@focus="popover.open()"
					@blur="popover.close()"
					@keydown.enter="API.enter"
					@keydown.down="API.focusNextOrPrevItem('next', $event)"
					@keydown.up="API.focusNextOrPrevItem('prev', $event)"
					@keydown.esc="blurTarget"
					@input:update="setNewValue"
					v-on="$listeners"
				>
					<o-icon
						v-if="hasSearchIcon"
						slot="prefix"
						name="search"
					/>
				</o-input>
				<fade-transition>
					<o-loading
						v-show="loading"
						:class="$s.LoadingIcon"
						variant="spinner"
					/>
				</fade-transition>
			</div>

			<autocomplete-dropdown
				v-if="isDropdownActive"
				:style="dropdownStyle"
				:api="API"
				@mouseleave.native="API.setFocusedOption(-1)"
			>
				<autocomplete-item
					v-if="showEmptyState"
					:option="{}"
					disabled
				>
					{{ emptyStr }}
				</autocomplete-item>

				<slot
					v-for="(option, idx) in options"
					v-bind="option"
				>
					<autocomplete-item
						:key="idx"
						:option="option"
					>
						{{ option[valueKey] }}
					</autocomplete-item>
				</slot>

				<autocomplete-item
					v-if="hasCustomSuggestion"
					:option="customOption"
				>
					{{ allowCustomValues }} <strong>{{ customOption[valueKey] }}</strong>...
				</autocomplete-item>
				<div
					v-if="$slots.footer"
					:class="$s.DropdownFooter"
					@mousedown.prevent
					@mouseover="API.setFocusedOption(-1)"
				>
					<slot name="footer" />
				</div>
			</autocomplete-dropdown>
		</o-popover>
	</div>
</template>

<script>
import throttle from 'lodash/throttle';
import PseudoWindow from 'vue-pseudo-window';
import { throwError } from '@square/orbit/utils/debug';
import { OPopover, PopoverAPIKey } from '@square/orbit/components/Popover';
import { OInput } from '@square/orbit/components/Input';
import { OIcon } from '@square/orbit/components/Icon';
import { OLoading } from '@square/orbit/components/Loading';
import FadeTransition from '@square/orbit/transitions/FadeTransition.vue';
import AutocompleteItem from './AutocompleteItem.vue';
import AutocompleteMulti from './AutocompleteMulti.vue';
import AutocompleteDropdown from './AutocompleteDropdown.vue';
import AutocompleteKey from './AutocompleteKey';

export default {
	name: 'OAutocomplete',

	components: {
		OPopover,
		OInput,
		OIcon,
		OLoading,
		FadeTransition,
		AutocompleteMulti,
		AutocompleteItem,
		AutocompleteDropdown,
		PseudoWindow,
	},

	inheritAttrs: false,

	model: {
		event: 'autocomplete:update',
	},

	props: {
		value: {
			type: [Object, Array],
			default: undefined,
		},
		multiSelect: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Array,
			validator: arr => arr.every(obj => obj && (typeof obj === 'object')),
			required: true,
		},
		emptyStr: {
			type: String,
			default: undefined,
		},
		valueKey: {
			type: String,
			default: 'value',
		},
		valueSeparator: {
			type: [String, Array],
			default: ',',
		},
		allowCustomValues: {
			type: String,
			default: undefined,
		},
		validator: {
			type: Function,
			default: undefined,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		hasSearchIcon: {
			type: Boolean,
			default: false,
		},
		disableSuggestedMatch: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			dropdownStyle: {
				width: 'auto',
				maxHeight: '400px',
				overflow: 'auto',
			},
			popoverConfig: {
				placement: 'bottom-start',

				modifiers: {
					offset: {
						offset: '0, 4',
					},
					flip: {
						enabled: false,
					},
					preventOverflow: {
						boundariesElement: 'window',
					},
				},
			},
			API: {
				focusedOption: null,
				isInputFocused: false,
				selectOption: (itemObj) => {
					if (!itemObj) { return; }

					const newVal = itemObj[this.valueKey];
					if (this.isMultiSelect) {
						this.$refs.input.addPill(newVal);
					} else {
						this.setNewValue(newVal, itemObj);
						this.blur();
					}
					this.$emit('option-select', newVal, itemObj);
				},
				enter: () => {
					if (this.API.focusedOption) {
						this.API.selectOption(this.API.focusedOption);
					} else if (this.isMultiSelect) {
						this.$refs.input.addPill(this.newValue);
					} else {
						const optionMatch = this.API.findValidOptionMatch(this.newValue);
						if (optionMatch) {
							this.$emit('autocomplete:update', optionMatch);
							this.$emit('option-select', this.newValue, optionMatch);
						}
						this.blur();
					}
				},
				focusNextOrPrevItem: (direction, e) => {
					if (!this.isDropdownActive) { return; }

					e.preventDefault();

					if (direction === 'prev' && this.focusedOptionIndex > -1) {
						this.API.setFocusedOption(this.focusedOptionIndex - 1);
					} else if (direction === 'next' && this.focusedOptionIndex < this.lengthOfOptions) {
						this.API.setFocusedOption(this.focusedOptionIndex + 1);
					}

					if (this.API.focusedOption && this.API.focusedOption.disabled) {
						this.API.focusNextOrPrevItem(direction, e);
					}
				},
				focusOption: (option) => {
					if (
						this.hasCustomSuggestion
						&& JSON.stringify(option) === JSON.stringify(this.customOption)
					) {
						// They hovered the custom option suggestion
						this.API.setFocusedOption(this.options.length);
					} else {
						const index = this.options.map(originalOption => JSON.stringify(originalOption))
							.indexOf(JSON.stringify(option));
						this.API.setFocusedOption(index);
					}
				},
				setFocusedOption: (index) => {
					this.focusedOptionIndex = index;
					if (this.hasCustomSuggestion && this.focusedOptionIndex === this.options.length) {
						this.API.focusedOption = this.customOption;
					} else {
						this.API.focusedOption = this.options[index];
					}
				},
				findValidOptionMatch: (newValue) => {
					const match = this.options.find((validOption) => {
						const optionVal = validOption[this.valueKey];
						if (optionVal && newValue.toLowerCase() === optionVal.toLowerCase()) {
							return true;
						}
						return false;
					});
					return match;
				},
			},
			newValue: null,
			focusedOptionIndex: -1,
		};
	},

	provide() {
		return {
			[AutocompleteKey]: this.API,
			[PopoverAPIKey]: {
				config: this.popoverConfig,
			},
		};
	},

	computed: {
		hasSuggestions() {
			return this.options && this.lengthOfOptions;
		},
		showEmptyState() {
			return this.emptyStr && !this.hasSuggestions && this.newValue;
		},
		isDropdownActive() {
			return this.API.isInputFocused
				&& (this.hasSuggestions || this.showEmptyState);
		},
		isMultiSelect() {
			return Array.isArray(this.value) && this.multiSelect;
		},
		customOption() {
			if (this.allowCustomValues) {
				const customOption = {};
				customOption[this.valueKey] = this.newValue;
				return customOption;
			}
			return null;
		},
		hasCustomSuggestion() {
			return this.allowCustomValues && this.newValue && !this.hasOption(this.newValue);
		},
		lengthOfOptions() {
			return this.hasCustomSuggestion ? this.options.length + 1 : this.options.length;
		},
		inputVal() {
			return this.value[this.valueKey];
		},
	},

	watch: {
		value(val) {
			if (Array.isArray(val)) {
				this.validateProps();
			}
		},
		options() {
			this.API.focusedOption = this.options[this.focusedOptionIndex];
		},
		multiSelect() {
			this.validateProps();
		},
		newValue() {
			this.focusFirstMatch();
		},
	},

	created() {
		this.validateProps();
		this.resizeDropdown = throttle(this.resizeDropdown, 100);
	},

	methods: {
		focus() {
			this.$refs.input.focus();
		},

		blur() {
			this.$refs.input.blur();
		},

		blurTarget(e) {
			e.target.blur();
		},

		validateProps() {
			if (!this.multiSelect && this.validator) {
				throwError('Autocomplete', 'The validator prop can only be used when multi-select is enabled.');
			}
			if (this.multiSelect && this.hasSearchIcon) {
				throwError('Autocomplete', 'The `has-search-icon` prop can only be used with single-select Autocompletes.');
			}
			if (this.multiSelect && !Array.isArray(this.value)) {
				throwError('Autocomplete', 'The v-model value for a autocomplete with multi-select must be of type Array.');
			} else if (!this.multiSelect && Array.isArray(this.value)) {
				throwError('Autocomplete', 'The v-model value found was of type Array, but the multi-select property was not set. Please set the multi-select property to true if you\'re using an array for v-model');
			}
		},
		setNewValue(val, objVal) {
			this.newValue = val;

			if (!this.isMultiSelect) {
				if (!objVal) {
					objVal = Object.assign({}, this.value);
				}

				let dataObj = {};
				dataObj = objVal;

				dataObj[this.valueKey] = val;

				this.$emit('autocomplete:input', val);
				this.$emit('autocomplete:update', dataObj);
			}
		},
		hasOption(option) {
			const optionVal = option && option.toLowerCase();
			if (optionVal) {
				return this.options.find((currentOption) => {
					const value = currentOption[this.valueKey]
						&& currentOption[this.valueKey].toLowerCase();
					return value === optionVal.toLowerCase();
				});
			}
			return false;
		},

		onOpen() {
			this.resizeDropdown();
			this.API.isInputFocused = true;

			this.focusFirstMatch();
		},

		focusFirstMatch() {
			if (
				(!this.disableSuggestedMatch && this.newValue)
				|| (this.hasCustomSuggestion && this.lengthOfOptions === 1)
			) {
				this.API.setFocusedOption(0);
			} else {
				this.API.setFocusedOption(-1);
			}
		},

		onClose() {
			this.API.isInputFocused = false;
			this.API.setFocusedOption(-1);
		},

		resizeDropdown() {
			const { $el } = (this.$refs.input || this.$refs.multi);
			this.dropdownStyle.width = `${$el.clientWidth}px`;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.Autocomplete {
	position: relative;
}

.DropdownFooter {
	border-top: var(--divider-border);
}

.LoadingIcon {
	position: absolute;
	top: 12px;
	right: 18px;
	color: var(--form-control-icon-color);
	z-index: 1;
}
</style>
