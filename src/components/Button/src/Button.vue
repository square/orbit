<template>
	<button-link
		:wrapper-class="[$s.ButtonWrap, {
			[$s['full-width']]: isFullWidth,
		}]"
		:class="[
			$s.Button,
			$s[`size_${size}`],
			{
				[$s.selected]: isSelected,
				[$s.icon]: isIconButton,
				[$s.loading]: loading,
				[$s[`variant_${variant}`]]: !isSelected,
			},
			api && api.className,
		]"
		:type="type"
		:href="href"
		:disabled="disabled || loading"
		v-bind="$attrs"
		v-on="$listeners"
		@click="selectButton"
	>
		<spacer>
			<slot />
		</spacer>
		<fade-transition>
			<o-loading
				v-if="loading"
				:class="$s.Spinner"
				variant="spinner"
			/>
		</fade-transition>
	</button-link>
</template>

<script>
import { showWarning } from '@square/orbit/utils/debug';
import Spacer from '@square/orbit/utils/Spacer.vue';
import { OIcon, IconKey } from '@square/orbit/components/Icon';
import { OLoading } from '@square/orbit/components/Loading';
import FadeTransition from '@square/orbit/transitions/FadeTransition.vue';
import ButtonLink from './ButtonLink.vue';
import Key from './Key';

export default {
	name: 'OButton',

	components: {
		OLoading,
		FadeTransition,
		ButtonLink,
		Spacer,
	},

	inheritAttrs: false,

	provide() {
		return {
			[IconKey]: {
				class: this.$s.Icon,
			},
		};
	},

	inject: {
		api: {
			from: Key,
			default: undefined,
		},
	},

	props: {
		/**
		 * Type of the button element. Ignored on buttons with `href`.
		 * @dontDemo true
		*/
		type: {
			type: String,
			default: 'button',
		},
		/**
		 * Changes button style.
		 * @validValues ['normal', 'primary', 'secondary', 'subtle', 'destructive',
		 'destructive-secondary', 'muted', 'text', 'text-upgrade', 'upgrade',
		 'upgrade-secondary', 'dark']
		*/
		variant: {
			type: String,
			default: 'normal',
			validator: variantVal => ['normal', 'primary', 'secondary', 'subtle', 'destructive', 'destructive-secondary', 'muted', 'muted-primary', 'text', 'text-upgrade', 'upgrade', 'upgrade-secondary', 'dark'].includes(variantVal),
		},
		/**
		 * Button size
		 * @validValues ['small', 'medium', 'large']
		*/
		size: {
			type: String,
			default: 'medium',
			validator: value => ['small', 'medium', 'large'].includes(value),
		},
		// Changes element to an `<a>`
		href: {
			type: [String, Object],
			default: undefined,
		},
		// Disables the button.
		disabled: {
			type: Boolean,
			default: false,
		},
		// Allows the button to grow to the width of its container.
		fullWidth: {
			type: Boolean,
			default: false,
		},
		// Hides the button content and shows a spinner.
		loading: {
			type: Boolean,
			default: false,
		},
		/**
		 * Whether or not the button appears selected.
		 * @requires "variant=normal"
	 	*/
		selected: {
			type: Boolean,
			default: null,
		},
	},

	computed: {
		isSelectable() {
			const isSelectable = typeof this.selected === 'boolean';
			return isSelectable;
		},

		isSelected() {
			return this.isSelectable && this.selected;
		},

		isIconButton() {
			const nodes = (
				this.$slots.default
				&& this.$slots.default.filter(vnode => vnode.tag || !vnode.text.match(/^\s*$/))
			);

			return nodes && (nodes.length === 1) && (
				nodes[0].componentOptions && nodes[0].componentOptions.Ctor.extendOptions === OIcon
			);
		},

		isFullWidth() {
			return (this.api && Object.prototype.hasOwnProperty.call(this.api, 'fullWidth'))
				? this.api.fullWidth
				: this.fullWidth;
		},
	},

	watch: {
		type: 'validateType',
		href: 'validateType',
	},

	created() {
		this.validateType();
	},

	methods: {
		validateType() {
			if (this.href && this.type !== 'button') {
				showWarning('Button', 'The "type" property is ignored when using "href".');
			}
		},
		selectButton() {
			if (this.isSelectable) {
				/*
				 * The selected property is updated.
				 * @argument 'New value'
			 	*/
				this.$emit('update:selected', !this.selected);
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.ButtonWrap {
	font-size: var(--font-size-base);
	vertical-align: top; /* inline-block fix different font sizes http://tinyurl.com/y6794aja */
}

.Button {
	composes: font-base from "@square/orbit/styles/util.css";
	composes: button-reset from "@square/orbit/styles/util.css";
	position: relative;
	width: inherit;
	transition:
		color var(--transition-base),
		background-color var(--transition-base),
		border-color var(--transition-base);
	border: var(--form-border);
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	font-size: inherit;
	font-weight: var(--font-weight-medium);

	&:disabled {
		cursor: default;
		opacity: 0.5;
	}

	&:not(:disabled) {
		&:focus {
			border-color: var(--focus-border-color);
			outline: none;
			box-shadow: var(--focus-box-shadow);
		}

		&:active {
			transition: none;
			border-color: inherit;
			box-shadow: none;
		}
	}

	/* Hack needed for icons. Could have un-intended effects. */
	& > * {
		line-height: 1em;
		vertical-align: middle;
	}

	& .Icon {
		margin-top: -3px;
	}
}

/* Button Spinner
------------------------- */
.Spinner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}

/* Sizes
------------------------- */

/*
	Why 7px instead of 8px for the vertical padding?
	---
	We switched from box-shadows to borders for button outlines. The addition of 1px border affects
	the height, which we discount by reducing the padding by 1px.
*/
.size_small {
	padding: 7px 8px;
	line-height: 16px;
}

.size_medium {
	padding: 7px 16px;
	line-height: var(--line-height-control);

	&.icon {
		padding-right: 11px;
		padding-left: 11px;
	}
}

.size_large {
	padding: 11px 32px;
	line-height: var(--line-height-control);
}

/* Variants
------------------------- */

/* Text */
.variant_text {
	padding: 0;
	border: 0;
	background: transparent;
	color: var(--brand-color);

	&:not(:disabled) {
		&:hover,
		&:active,
		&:focus {
			color: color(var(--brand-color) blackness(30%));
		}
	}

	& .Spinner {
		color: var(--brand-color);
	}
}

/* Upgrade Text */
.variant_text-upgrade {
	padding: 0;
	border: 0;
	background: transparent;
	color: var(--upgrade-color);

	&:not(:disabled) {
		&:hover,
		&:active,
		&:focus {
			color: color(var(--upgrade-color) blackness(30%));
		}
	}

	& .Spinner {
		color: var(--upgrade-color);
	}
}

/* Muted */
.variant_muted,
.variant_muted-primary {
	border-color: transparent;
	background-color: transparent;
}

/* Normal & Muted */
.variant_normal,
.variant_muted {
	color: var(--color-gray-50);

	&:hover {
		background: var(--hover-bg-color);
	}

	&:active {
		background: var(--active-bg-color);
	}

	&:disabled:hover {
		background-color: var(--color-white);
	}

	& .Spinner {
		color: var(--color-gray-50);
	}
}

.variant_muted-primary {
	color: var(--brand-color);

	&:hover {
		background: color(var(--brand-color) a(0.1));
	}

	&:disabled:hover {
		background-color: transparent;
	}

	& .Spinner {
		color: var(--brand-color);
	}
}

/* Secondary */
.variant_secondary {
	border-color: var(--brand-color);
	color: var(--brand-color);

	&:hover {
		border-color: color(var(--brand-color) blackness(+10%));
		background-color: color(var(--brand-color) tint(90%));
	}

	&:active {
		border-color: color(var(--brand-color) blackness(+20%));
		background-color: color(var(--brand-color) tint(80%));
	}

	&:disabled:hover {
		border-color: var(--brand-color);
		background-color: var(--color-white);
	}

	& .Spinner {
		color: var(--brand-color);
	}
}

.variant_upgrade-secondary {
	border-color: var(--upgrade-color);
	color: var(--upgrade-color);

	&:not(:disabled) {
		&:hover {
			border-color: var(--upgrade-hover-color);
			background-color: var(--upgrade-bg-color);
		}

		&:focus {
			border-color: var(--upgrade-focus-border-color);
			box-shadow: var(--upgrade-focus-box-shadow);
		}

		&:active {
			border-color: var(--upgrade-active-color);
			background-color: var(--upgrade-bg-color);
			color: var(--upgrade-active-color);
		}
	}

	& .Spinner {
		color: var(--upgrade-color);
	}
}

.variant_dark {
	border-color: var(--color-black-70);
	background-color: var(--color-black-70);
	color: var(--color-white);

	&:hover {
		background-color: var(--color-black-80);
	}

	&:active {
		background-color: var(--color-black-90);
	}

	&:disabled:hover {
		background-color: var(--color-black-70);
	}

	& .Spinner {
		color: var(--color-white);
	}
}

.variant_subtle {
	border-color: var(--color-gray-10);
	background-color: var(--color-gray-10);
	color: var(--color-gray-50);

	&:active {
		border-color: var(--color-gray-60);
	}

	&:not(:disabled):hover {
		color: var(--color-gray-60);
	}

	& .Spinner {
		color: var(--color-gray-50);
	}
}

.variant_upgrade {
	border-color: var(--upgrade-color);
	background-color: var(--upgrade-color);
	color: var(--color-white);

	&:hover {
		background-color: var(--upgrade-hover-color);
	}

	&:focus {
		border-color: var(--upgrade-focus-border-color);
		box-shadow: var(--upgrade-focus-box-shadow);
	}

	&:active {
		background-color: var(--upgrade-active-color);
	}

	&:disabled:hover {
		background-color: var(--upgrade-color);
	}

	& .Spinner {
		color: var(--color-white);
	}
}

/* Primary */
.variant_primary {
	border-color: var(--brand-color);
	background-color: var(--brand-color);
	color: var(--color-white);

	&:hover {
		background-color: color(var(--brand-color) blackness(+10%));
	}

	&:active {
		background-color: color(var(--brand-color) blackness(+20%));
	}

	&:disabled:hover {
		background-color: var(--brand-color);
	}

	& .Spinner {
		color: var(--color-white);
	}
}

/* Destructive */
.variant_destructive {
	border-color: var(--danger-color);
	background-color: var(--danger-color);
	color: var(--color-white);

	&:hover {
		background-color: color(var(--danger-color) blackness(+10%));
	}

	&:focus {
		border-color: var(--danger-color);
		box-shadow: var(--danger-focus-box-shadow);
	}

	&:active {
		border-color: inherit;
		background-color: color(var(--danger-color) blackness(+20%));
		box-shadow: none;
	}

	&:disabled:hover {
		background-color: var(--danger-color);
	}

	& .Spinner {
		color: var(--color-white);
	}
}

/* Destructive Secondary */
.variant_destructive-secondary {
	border-color: var(--danger-color);
	color: var(--danger-color);

	&:hover {
		border-color: color(var(--danger-color) blackness(+10%));
		background-color: color(var(--danger-color) tint(90%));
	}

	&:focus {
		border-color: var(--danger-color);
		box-shadow: var(--danger-focus-box-shadow);
	}

	&:active {
		border-color: color(var(--danger-color) blackness(+20%));
		background-color: color(var(--danger-color) tint(80%));
		box-shadow: none;
	}

	&:disabled:hover {
		border-color: var(--danger-color);
		background-color: var(--color-white);
	}

	& .Spinner {
		color: var(--danger-color);
	}
}

/* Selected */
.selected {
	border-color: var(--selected-color);
	box-shadow: var(--selected-box-shadow);

	&:disabled,
	&:disabled:hover {
		box-shadow: inset 0 0 0 1px var(--disabled-border-color);
	}

	&:not(:disabled):focus {
		border-color: var(--selected-color);
		outline: none;
		box-shadow:
			var(--selected-box-shadow),
			var(--focus-box-shadow);
	}
}

/* Fullwidth
------------------------- */
.full-width {
	width: 100%;
}

/* Loading
------------------------- */
.loading {
	color: transparent;
}
</style>
