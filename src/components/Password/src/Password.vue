<template>
	<div :class="$s.PasswordWrapper">
		<input
			v-model="inputVal"
			:class="[
				$s.Password,
				$s[`size_${size}`],
				{ [$s.invalid]: formItem && formItem.invalid },
			]"
			v-bind="$attrs"
			type="password"
			v-on="$listeners"
		>
	</div>
</template>
<script>
import { FormItemKey } from '@square/orbit/components/Form';

export default {
	name: 'OPassword',

	inheritAttrs: false,

	model: {
		event: 'password:update',
	},

	inject: {
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	props: {
		size: {
			type: String,
			default: 'medium',
			validator: (sizeVal) => ['small', 'medium'].includes(sizeVal),
		},
		value: {
			type: String,
			default: undefined,
		},
	},

	computed: {
		inputVal: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('password:update', val);
			},
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.PasswordWrapper {
	composes: form-font-base from "@square/orbit/styles/util.css";
	display: flex;
}

.Password {
	width: 100%;
	height: var(--form-height);
	box-sizing: border-box;
	padding: var(--form-padding-vertical) var(--form-padding-horizontal);
	transition:
		border var(--transition-base),
		background-color var(--transition-base),
		color var(--transition-base);
	border: var(--form-border);
	border-radius: var(--form-border-radius);
	background-color: var(--form-bg-color);
	color: var(--form-color);
	font-family: inherit;
	font-size: inherit;
	line-height: normal;

	&::placeholder {
		color: var(--form-placeholder-color);
	}

	&:hover {
		border-color: var(--form-hover-border-color);
	}

	&:disabled,
	&:disabled:hover {
		border-color: var(--form-disabled-border-color);
		background-color: var(--form-disabled-bg-color);
		color: var(--form-disabled-color);

		&::placeholder {
			color: var(--form-disabled-placeholder-color);
		}
	}

	&:focus:not(:disabled),
	&:active:not(:disabled) {
		border-color: var(--focus-border-color);
		outline: none;
		box-shadow: var(--focus-box-shadow);
	}

	/* Invalid
	------------------------- */
	&:--form-invalid-selector:not(:disabled) {
		border-color: var(--danger-border-color);
		box-shadow: var(--danger-box-shadow);
	}

	&:--form-invalid-selector:focus {
		border-color: var(--danger-border-color);
		box-shadow: var(--danger-box-shadow), var(--danger-focus-box-shadow);
	}

	&.size_small {
		height: var(--form-small-height);
		padding: var(--form-small-padding) var(--form-padding-horizontal);
	}
}

</style>
