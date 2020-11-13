<template>
	<textarea
		v-model="textareaVal"
		:class="[
			$s.Textarea,
			{
				[$s.resizable]: resizable,
				[$s.invalid]: formItem && formItem.invalid,
			},
			$s[`theme_${theme}`]
		]"
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>
<script>
import { FormItemKey } from '@square/orbit/components/Form';

export default {
	name: 'OTextarea',

	model: {
		event: 'textarea:update',
	},

	props: {
		value: {
			type: null,
			default: undefined,
		},
		resizable: {
			type: Boolean,
			default: false,
		},
		theme: {
			type: String,
			default: 'normal',
			validator: (theme) => ['normal', 'monospace'].includes(theme),
		},
	},

	inject: {
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	computed: {
		textareaVal: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('textarea:update', val);
			},
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

:root {
	--textarea-min-height: 120px;
}

.Textarea {
	composes: form-font-base from "@square/orbit/styles/util.css";
	box-sizing: border-box;
	width: 100%;
	min-height: var(--textarea-min-height);
	padding: var(--form-padding-vertical) var(--form-padding-horizontal);
	transition:
		border var(--transition-base),
		background-color var(--transition-base),
		color var(--transition-base);
	border: var(--form-border);
	border-radius: var(--form-border-radius);
	background-color: var(--form-bg-color);
	color: var(--form-color);
	resize: none;

	&::placeholder {
		color: var(--form-placeholder-color);
	}

	&:hover {
		border-color: var(--form-hover-border-color);
		color: var(--form-hover-color);
	}

	&:--form-invalid-selector {
		border-color: var(--danger-border-color);
		box-shadow: var(--danger-box-shadow);
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

	&:--form-invalid-selector:focus {
		border-color: var(--danger-border-color);
		box-shadow: var(--danger-box-shadow), var(--danger-focus-box-shadow);
	}

	&:active:not(:disabled),
	&:focus:not(:disabled) {
		border-color: var(--focus-border-color);
		outline: none;
		box-shadow: var(--focus-box-shadow);
	}

	&.resizable {
		resize: vertical;
	}
}

.theme_monospace {
	/* https://www.client9.com/css-system-font-stack-monospace-v2/ */
	font-family:
		SFMono-Regular,
		Consolas,
		"Liberation Mono",
		Menlo,
		Courier,
		monospace;
}
</style>
