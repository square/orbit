<template>
	<div
		:class="[
			$s.Wrapper,
			{
				[$s.disabled]: disabled,
				[$s['full-height']]: fullHeight,
				[$s[`theme_${theme}`]]: !disabled,
			},
		]"
		@mouseover="api.hovering = true"
		@mouseleave="api.hovering = false"
	>
		<component
			:is="tag"
			ref="card"
			v-bind="$attrs"
			:href="route"
			:class="[
				$s.Card,
				{ [$s.disabled]: disabled, },
			]"
			:style="cardStyle"
			v-on="$listeners"
		>
			<card-header
				v-if="title"
				:title="title"
				:title-icon="titleIcon"
				:disabled="disabled"
				:primary="theme === 'primary'"
			/>
			<slot />
		</component>

		<footer
			v-if="$slots.actions"
			:class="$s.CardFooter"
		>
			<vnode-filter
				:enforce-component="OButton"
				remove-whitespace
				@componentMismatch="onComponentMismatch"
			>
				<slot name="actions" />
			</vnode-filter>
		</footer>
	</div>
</template>

<script>
import { throwError, assert } from '@square/orbit/utils/debug';
import { OIcon } from '@square/orbit/components/Icon';
import { OButton } from '@square/orbit/components/Button';
import SmartLink from '@square/orbit/utils/SmartLink.vue';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import PseudoWindow from 'vue-pseudo-window';
import CardKey from './CardKey';
import CardHeader from './CardHeader.vue';

export default {
	name: 'OCard',

	components: {
		OIcon,
		SmartLink,
		VnodeFilter,
		CardHeader,
		PseudoWindow,
	},

	inheritAttrs: false,

	provide() {
		return {
			[CardKey]: this.api,
		};
	},

	props: {
		// Disables click events and styles the card to look disabled.
		disabled: {
			type: Boolean,
			default: false,
		},
		// Makes the card 100% height.
		fullHeight: {
			type: Boolean,
			default: false,
		},
		/*
		 * Default theme for cards have a white background, gray box shadow.
		 * Primary theme has a blue gradient background.
		 * @validValues ['default', 'primary']
		*/
		theme: {
			type: String,
			default: 'default',
			validator: (themeVal) => ['default', 'primary'].includes(themeVal),
		},
		// Adds a title to the card using the heading component.
		title: {
			type: String,
			default: undefined,
		},
		/*
		 * Adds an icon in front of the `title`. This should either be the
		 * name of an `o-icon` or the src an `<img />` thats 32x32.
		 * @requires 'title'
		*/
		titleIcon: {
			type: String,
			default: undefined,
		},
		/*
		 * The value to be passed into the `to` attribute of router-link
		 * or the `href` attribute of the anchor tag. If your Card is an
		 * anchor, then you can also use
		 * [native anchor attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
		 * such as `target="_blank"`.
	 	*/
		to: {
			type: [String, Object],
			default: undefined,
		},
	},

	data() {
		return {
			cardStyle: {
				paddingBottom: null,
			},
			api: {
				lastElement: null,
				hovering: false,
			},
			OButton,
		};
	},

	computed: {
		isClickable() {
			return this.$listeners.click || this.to;
		},

		route() {
			return (!this.disabled && this.to) || null;
		},

		tag() {
			return this.to ? SmartLink : 'div';
		},
	},

	watch: {
		isClickable: {
			handler() {
				assert.warn(this.isClickable, 'Card', 'Cards must be clickable either with a "to" prop defined or a @click event. If your card does not need either of these, use a bordered Section component instead.');
			},
			immediate: true,
		},
	},

	created() {
		if (this.titleIcon && this.title === undefined) {
			throwError('Card', 'If you have a `titleIcon`, you must also have a `title`.');
		}
		this.checkMediaPosition();
	},

	updated() {
		this.checkMediaPosition();
	},

	methods: {
		checkMediaPosition() {
			if (this.$slots.default) {
				const defaultSlot = this.$slots.default
					.map((vnode) => {
						if (vnode.text !== undefined) {
							const vnodeText = vnode.text.trim();
							return vnodeText ? vnode : undefined;
						}
						return vnode;
					})
					.filter((vnode) => vnode !== undefined);
				this.api.lastElement = defaultSlot[defaultSlot.length - 1];
			}
		},

		onComponentMismatch() {
			throwError('Card', 'You can only put Button components in the actions slot.');
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";
@import "@square/orbit/styles/vars-card.css";

:root {
	--brand-color-hue-adjusted: color(var(--brand-color) hue(-10));
}

.Wrapper {
	display: flex;
	position: relative;
	flex-direction: column;
	width: 100%;
	transition: background-color var(--transition-base), box-shadow var(--transition-base);
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.04);
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	overflow: hidden;
	vertical-align: top;
	box-sizing: border-box;

	&::before,
	&::after {
		position: absolute;
		top: 0;
		width: 0.5px;
		height: 100%;
		background:
			linear-gradient(
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 0.02) calc(100% - 10px),
				rgba(0, 0, 0, 0.04) 100%
			);
		content: "";
	}

	&::before {
		left: 0;
	}

	&::after {
		right: 0;
	}

	&:not(.disabled):hover {
		background-color: color(var(--color-gray-10) a(0.5));
	}

	&.disabled {
		/*
		* Needs to be slightly darker than --disabled-color because we use an
		* opacity overlay to make all content inside look disabled
		*/
		box-shadow: 0 0 0 1px var(--divider-border-color);
		cursor: default;
		pointer-events: none;

		&:hover {
			box-shadow: 0 0 0 1px var(--divider-border-color);
		}

		&::after {
			content: none;
		}
	}

	&.full-height {
		height: 100%;
	}
}

.Card {
	composes: font-base from "@square/orbit/styles/util.css";
	display: block;
	flex: 1;
	width: 100%;
	padding: var(--card-padding);
	transition: opacity var(--transition-base);
	text-decoration: none;
	cursor: pointer;
	box-sizing: border-box;

	&.disabled {
		cursor: default;
		opacity: 0.5;
	}
}

.CardFooter {
	flex: 0 0 auto;
	padding: 0 var(--space) var(--space) var(--space);
}

/* Card Themes
- default
- blue
- Potentially 4 gradients (insights, store, website, marketing)
------------------------------------- */
.theme_default {
	box-shadow: var(--card-box-shadow);
}

.theme_primary {
	background: linear-gradient(45deg, var(--brand-color) 0%, var(--brand-color-hue-adjusted) 100%);
	box-shadow: 0 1px 3px 1px color(var(--brand-color) a(0.3));

	&:hover {
		box-shadow: 0 3px 6px 1px color(var(--brand-color) a(0.3));
	}

	& .Card {
		color: var(--color-white);
	}
}
</style>
