<template>
	<div
		:class="[
			$s.Pill,
			{
				[$s.focused]: focused,
				[$s.invalid]: invalid,
				[$s.disabled]: disabled,
			}
		]"
	>
		<div
			:class="$s.PillLabel"
			@click="$emit('click', value)"
		>
			{{ value[valueKey] }}
		</div>
		<o-icon
			v-if="deleteable"
			:class="[
				$s.CloseIcon,
				{
					[$s.invalid]: invalid,
					[$s.disabled]: disabled,
				}
			]"
			name="circle-x"
			@click.stop="deletePill(value)"
		/>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';

export default {
	name: 'AutocompletePill',

	components: {
		OIcon,
	},

	model: {
		event: 'pill:update',
	},

	props: {
		value: {
			type: Object,
			required: true,
		},
		valueKey: {
			type: String,
			default: 'value',
		},
		deleteable: {
			type: Boolean,
			default: false,
		},
		focused: {
			type: Boolean,
			default: false,
		},
		invalid: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		pillVal: {
			get() {
				return this.value;
			},
			set(newVal) {
				this.$emit('pill:update', newVal);
			},
		},
	},

	methods: {
		deletePill(value) {
			if (!this.disabled) {
				this.$emit('deleted', value);
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

:root {
	--pill-bg: color(var(--brand-color) tint(90%));
	--pill-color: var(--brand-color-dark);
	--pill-disabled-color: var(--color-gray-40);
	--pill-disabled-bg-color: var(--color-gray-20);
	--pill-disabled-icon-color: var(--color-gray-40);
}

.Pill {
	display: flex;
	position: relative;
	align-items: center;
	margin-right: var(--space);
	padding: var(--space-half) var(--space);
	border: 1px solid transparent;
	border-radius: var(--border-radius-base);
	background-color: var(--pill-bg);
	color: var(--pill-color);

	&.focused {
		border-color: var(--focus-border-color);
		box-shadow: var(--focus-box-shadow);
	}

	&.invalid {
		background-color: var(--danger-bg-color);
		color: var(--danger-color);
	}

	&.invalid.focused {
		border-color: var(--danger-border-color);
		box-shadow: var(--danger-focus-box-shadow);
	}

	&.disabled {
		background-color: var(--pill-disabled-bg-color);
		color: var(--pill-disabled-color);
		cursor: default;
		pointer-events: none;
	}

	/*
	Set a height smaller than the close icon button's natural height to
	prevent it from increasing the height of its parent element (the pill).
	Use a negative margin to re-center the icon after the height override.
	*/
	& .CloseIcon {
		position: relative;
		height: 16px;
		margin-left: var(--space);
		transition: color var(--transition-base);
		color: var(--pill-color);
		cursor: pointer;

		&:hover {
			color: var(--brand-color);
		}

		&.invalid {
			color: var(--danger-color);
		}

		&.invalid:hover {
			color: color(var(--danger-color) blackness(-10%));
		}

		&.disabled {
			color: var(--pill-disabled-icon-color);
			cursor: default;
			pointer-events: none;
		}
	}
}

.PillLabel {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: var(--form-font-size);
	line-height: 16px;
	cursor: pointer;
}
</style>
