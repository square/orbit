<template>
	<div
		:class="$s.Wrapper"
		@click="focus"
	>
		<fieldset
			:class="$s.HiddenFieldset"
			:disabled="disabledAttr"
		/>
		<div
			:class="[
				$s.InputWrapper,
				$s[`size_${size}`],
				$s[`type_${type}`],
				{
					[$s.invalid]: formItem && formItem.invalid,
					[$s.focused]: isFocused,
				},
			]"
		>
			<span
				v-if="prefix || $slots.prefix"
				:class="[$s.Prefix, { [$s.flush]: flushPrefix }]"
			>
				<slot name="prefix">{{ prefix }}</slot>
			</span>
			<!--
				size="1" needed to prevent overlapping inputs Firefox when placed in in small containers.
			-->
			<input
				ref="input"
				:class="[
					$s.Input,
					$s[`align_${align}`],
				]"
				:type="type"
				:placeholder="placeholder"
				v-bind="inputProps"
				size="1"
				v-on="inputListeners"
				@focus="onFocus"
				@blur="onBlur"
			>
			<span
				v-if="suffix || $slots.suffix"
				:class="$s.Suffix"
			>
				<slot name="suffix">{{ suffix }}</slot>
			</span>
		</div>
	</div>
</template>

<script>
import { assert } from '@square/orbit/utils/debug';
import { FormItemKey } from '@square/orbit/components/Form';

export default {
	name: 'OInput',

	inheritAttrs: false,

	model: {
		event: 'input:update',
	},

	inject: {
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	props: {
		/*
		 * Aligns text inside the input.
		 * @validValues ['left', 'right']
		*/
		align: {
			type: String,
			default: 'left',
			validator: (alignVal) => ['left', 'right'].includes(alignVal),
		},
		// The prefix value type
		prefix: {
			type: String,
			default: undefined,
		},
		flushPrefix: {
			type: Boolean,
			default: false,
		},
		/**
		 * Size of input text
		 * @validValues ['small', 'medium']
		*/
		size: {
			type: String,
			default: 'medium',
			validator: (sizeVal) => ['small', 'medium'].includes(sizeVal),
		},
		// The suffix value type
		suffix: {
			type: String,
			default: undefined,
		},
		/*
		 * The default value type
		 * @validValues ['email', 'number', 'tel', 'text', 'url']
		 * @demoValue 'text'
		*/
		type: {
			type: String,
			default: 'text',
			validator: (typeVal) => ['email', 'number', 'tel', 'text', 'url'].includes(typeVal),
		},
		/**
		 * Starting value
		 * @model
		*/
		value: {
			type: [String, Number],
			default: undefined,
		},
		// Placeholder for the input.
		placeholder: {
			type: String,
			default: undefined,
		},

		/**
		 * Internal prop. Use with extreme caution.
		 * This will be replaced w/provide inject shortly.
		 * @dontDocument
		 * @dontDemo
		 */
		allowRerender: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			horizontalPadding: 24,
			isFocused: false,
			value_: '',
		};
	},

	computed: {
		inputVal: {
			get() {
				return this.$props.value !== undefined ? this.value : this.value_;
			},
			set(val) {
				if (this.$props.value === undefined) {
					this.value_ = val;
				}
				this.$emit('input:update', val);
			},
		},
		disabledAttr() {
			return this.$attrs.disabled;
		},
		inputProps() {
			const props = {
				...this.$attrs,
			};
			if (this.allowRerender) {
				props.value = this.inputVal;
			}
			return props;
		},
		inputListeners() {
			const listeners = {
				...this.$listeners,
			};
			if (this.allowRerender) {
				const vm = this;
				const originalInputFn = listeners.input;
				listeners.input = function handleInput(...args) {
					// eslint not smart enough to see that the following line gets
					// executed as part of a callback and not within the computed
					// prop itself so we have to disable it
					const [event] = args;
					// eslint-disable-next-line vue/no-side-effects-in-computed-properties
					vm.inputVal = event.target.value;
					if (typeof originalInputFn === 'function') {
						originalInputFn.apply(this, args);
					}
				};
			}
			return listeners;
		},
	},

	created() {
		this.validateProps();
	},

	methods: {
		focus() {
			if (this.$refs.input) {
				this.$refs.input.focus();
			}
		},

		blur() {
			if (this.$refs.input) {
				this.$refs.input.blur();
			}
		},

		onBlur() {
			this.isFocused = false;
		},

		onFocus() {
			this.isFocused = true;
		},

		validateProps() {
			assert.warn(!this.prefix || !this.$slots.prefix, 'Input', 'You cannot use the prefix prop and the prefix slot simultaneously.');
			assert.warn(!this.suffix || !this.$slots.suffix, 'Input', 'You cannot use the suffix prop and the suffix slot simultaneously.');
		},
	},
};
</script>

<style module="$s">

@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.input-box-model {
	box-sizing: border-box;
}

.Input {
	composes: input-box-model;
	composes: form-font-base from "@square/orbit/styles/util.css";
	flex: 1;
	min-width: 0;
	padding: 0;
	border: none;
	outline: none;
	background-color: transparent;
	line-height: var(--form-control-line-height);
	text-overflow: ellipsis;
	box-shadow: none; /* Firefox type="number" error handling override */

	/* IE/EDGE adds an X to focused inputs that clears the input. This removes that feature */
	&::-ms-clear {
		display: none;
	}

	&::placeholder {
		color: var(--form-placeholder-color);
	}

	/* Alignment
	------------------------- */
	&.align_left {
		text-align: left;
	}

	&.align_right {
		text-align: right;
	}
}

.Prefix,
.Suffix {
	composes: input-box-model;
	composes: form-font-base from "@square/orbit/styles/util.css";
	display: flex;
	flex: 0 1 auto;
	align-items: center;
	transition: color var(--transition-base);
	color: var(--form-prefix-suffix-color);
	line-height: var(--form-control-line-height);
}

.Prefix {
	padding-right: var(--space);
}

.Suffix {
	padding-left: var(--space);
}

.flush {
	padding: 0;
}

.InputWrapper {
	composes: input-box-model;
	composes: form-font-base from "@square/orbit/styles/util.css";
	display: flex;
	align-items: center;
	width: 100%;
	height: var(--form-height);
	padding: var(--form-padding-vertical) var(--form-padding-horizontal);
	transition:
		border var(--transition-base),
		background-color var(--transition-base),
		color var(--transition-base);
	border: var(--form-border);
	border-radius: var(--form-border-radius);
	background-color: var(--form-bg-color);
	color: var(--form-color);
	line-height: normal;
	line-height: var(--form-control-line-height);

	/* IE/EDGE adds an X to focused inputs that clears the input. This removes that feature */
	&::-ms-clear {
		display: none;
	}

	&:hover {
		border-color: var(--form-hover-border-color);
		color: var(--form-hover-color);
	}

	/* Sizes
	------------------------- */
	&.size_small {
		height: var(--form-small-height);
		padding: var(--form-small-padding) var(--form-padding-horizontal);
	}

	/* Type
	------------------------- */
	&.type_number .Input {
		appearance: textfield; /* For firefox */

		/* Chrome/Safari */
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			appearance: none;
		}
	}
}

.Wrapper {
	display: flex;
	position: relative;
	cursor: text;
}

.HiddenFieldset {
	display: none;

	&:disabled + .InputWrapper {
		border-color: var(--form-disabled-border-color);
		background-color: var(--form-disabled-bg-color);
		cursor: default;

		& .Input {
			color: var(--form-disabled-color);

			&::placeholder {
				color: var(--form-disabled-placeholder-color);
			}
		}

		& .Prefix,
		& .Suffix {
			color: var(--form-disabled-placeholder-color);
		}
	}

	&:not(:disabled) + .InputWrapper {
		&:focus,
		&:active,
		&.focused {
			border-color: var(--focus-border-color);
			outline: none;
			box-shadow: var(--focus-box-shadow);
		}

		/* Invalid
		------------------------- */
		&:--form-invalid-selector {
			border-color: var(--danger-color);
			box-shadow: var(--danger-box-shadow);
		}

		&:--form-invalid-selector:focus,
		&:--form-invalid-selector.focused {
			border-color: var(--danger-color);
			box-shadow: var(--danger-focus-box-shadow-inset), var(--danger-focus-box-shadow);
		}
	}
}

</style>
