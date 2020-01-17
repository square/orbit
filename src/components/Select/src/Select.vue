<template>
	<div :class="[$s.Select, $s[`size_${size}`]]">
		<select
			v-model="selected"
			:class="[
				$s.SelectInput,
				$s[`size_${size}`],
				{
					[$s.selected]: optionSelected,
					[$s.invalid]: formItem && formItem.invalid,
					[$s.has_prefix]: hasIcon,
				},
			]"
			v-bind="$attrs"
			v-on="$listeners"
		>
			<option
				v-if="placeholder"
				:value="placeholderValue"
				disabled
			>
				{{ placeholder }}
			</option>
			<template v-for="(option, idx) in options">
				<slot
					v-if="!option.options"
					v-bind="option"
					:idx="idx"
				>
					<option
						:key="idx"
						:value="option.value"
						:disabled="option.disabled"
					>
						{{ option.label }}
					</option>
				</slot>
				<optgroup
					v-else
					:key="idx"
					:label="option.label"
					:disabled="option.disabled"
				>
					<slot
						v-for="(option2, idx2) in option.options"
						v-bind="option2"
						:idx="idx2"
					>
						<option
							:key="idx2"
							:value="option2.value"
							:disabled="option2.disabled"
						>
							{{ option2.label }}
						</option>
					</slot>
				</optgroup>
			</template>
		</select>
		<component
			:is="dropdownIcon"
			:class="[$s.Icon, $s.dropdown]"
			name="arrow-down"
		/>
		<o-icon
			v-if="hasIcon"
			:class="[$s.Icon, $s.prefix]"
			:name="optionSelected.icon"
		/>
	</div>
</template>

<script>
import { FormItemKey } from '@square/orbit/components/Form';
import { OIcon } from '@square/orbit/components/Icon';
import ArrowDownSmall from './icons/arrow-down-small.svg';

export default {
	name: 'OSelect',

	components: {
		OIcon,
		ArrowDownSmall,
	},

	inheritAttrs: false,

	model: {
		event: 'select:update',
	},

	inject: {
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	props: {
		// The default select value
		value: {
			type: null,
			default: undefined,
		},
		// The placeholder type
		placeholder: {
			type: String,
			default: undefined,
		},
		/* Array of options for the select value
		 * @demoValue [{label: 'Option 1', value: 1}, {label: 'Option 2', value: 2}]
		*/
		options: {
			type: Array,
			required: true,
		},
		size: {
			type: String,
			default: 'medium',
			validator: value => ['small', 'medium'].includes(value),
		},
	},

	computed: {
		selected: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('select:update', val);

				return val;
			},
		},

		optionSelected() {
			return this.options.find(
				opt => (
					Array.isArray(opt.options)
					? opt.options.find(item => item.value === this.value)
					: opt.value === this.value
				),
			);
		},

		hasIcon() {
			return !!this.optionSelected && !!this.optionSelected.icon;
		},

		placeholderValue() {
			// This will return the current value if its not a valid option
			return !this.optionSelected ? this.value : null;
		},

		dropdownIcon() {
			return this.size === 'small' ? 'ArrowDownSmall' : 'OIcon';
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.Select {
	position: relative;

	&.size_medium {
		height: var(--form-height);
	}

	&.size_small {
		height: var(--form-small-height);
	}
}

.Select .Icon {
	position: absolute;
	top: calc(50%);
	transform: translateY(-50%);
	pointer-events: none;
	transition: color var(--transition-base);
	color: var(--form-color);

	&.dropdown {
		right: var(--space-x2);
	}

	&.prefix {
		left: var(--space-x2);
	}
}

.Select.size_small .Icon.dropdown {
	height: 10px;
}

.SelectInput {
	composes: font-base from "@square/orbit/styles/util.css";
	width: 100%;
	transition:
		background var(--transition-base),
		border var(--transition-base),
		color var(--transition-base);
	border-radius: var(--form-border-radius);
	background: var(--form-bg-color);
	color: var(--form-placeholder-color);
	cursor: pointer;
	appearance: none;

	&.size_medium {
		height: var(--form-height);

		/* for padding-right: width of select icon is (24px) */
		padding:
			var(--form-padding-vertical)
			calc(var(--form-padding-horizontal) + 24px)
			var(--form-padding-vertical)
			var(--form-padding-horizontal);
		border: var(--form-border);
		font-size: var(--form-font-size);
	}

	&.size_small {
		height: var(--form-small-height);

		/* for padding-right: width of select icon is (24px) */
		padding:
			calc(var(--form-small-padding) / 2)
			calc(var(--form-padding-horizontal) + 24px)
			calc(var(--form-small-padding) / 2)
			var(--form-padding-horizontal);
		border: var(--form-small-border);
		font-size: var(--form-small-font-size);
	}

	&.has_prefix {
		padding-left: calc(var(--form-padding-horizontal) + 24px);
	}

	&.selected {
		color: var(--form-color);

		&:disabled {
			color: var(--form-disabled-color);
		}
	}

	&::-ms-expand {
		display: none;
	}

	&:--form-invalid-selector {
		border-color: var(--danger-border-color);
		box-shadow: var(--danger-box-shadow);
	}

	&:disabled {
		border-color: var(--form-disabled-border-color);
		background: var(--form-disabled-bg-color);
		color: var(--form-disabled-placeholder-color);
		cursor: default;

		& + .dropdown {
			color: var(--form-disabled-placeholder-color);
		}
	}

	&:hover:not(:disabled) {
		border-color: var(--form-hover-border-color);
	}

	&:active:not(:disabled),
	&:focus:not(:disabled) {
		border-color: var(--focus-border-color);
		outline: none;
		box-shadow: var(--focus-box-shadow);
	}

	& option {
		color: var(--form-color);

		&:disabled,
		&:disabled:hover {
			color: var(--form-disabled-color);
			cursor: default;
		}
	}
}
</style>
