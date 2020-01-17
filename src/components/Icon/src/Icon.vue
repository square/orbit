<template>
	<smart-link
		:class="[
			$s.Icon,
			api && api.class,
			{ [$s.clickable] : isClickable },
		]"
		:href="href"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<component
			:is="icon"
			:class="$s.Svg"
			:role="label ? 'img' : 'presentation'"
			:aria-label="label"
			width="16"
			height="16"
		/>
	</smart-link>
</template>

<script>
import SmartLink from '@square/orbit/utils/SmartLink.vue';
import { assert } from '@square/orbit/utils/debug';
import kebabCase from 'lodash/kebabCase';
import * as Icons from 'orbit-icons';
import IconKey from './IconKey';

const iconMap = Object.keys(Icons).reduce((agg, key) => {
	const kebabName = kebabCase(key.replace(/Icon$/, ''));
	agg[kebabName] = Icons[key];
	return agg;
}, {});

const getIcon = (name) => {
	if (!name) { return false; }
	return iconMap[name] || false;
};

const deprecatedIcons = [];

export default {
	name: 'OIcon',

	inject: {
		api: {
			from: IconKey,
			default: undefined,
		},
	},

	components: {
		SmartLink,
	},

	props: {
		/**
		 * The name of the icon to show
		 * @demoValue 'bolt'
		*/
		name: {
			type: String,
			required: true,
			validator(name) {
				const icon = getIcon(name);

				assert.warn(icon, 'Icon', `"${name}" not found`);
				assert.warn(!deprecatedIcons.includes(name), 'Icon', `"${name}" is deprecated and will be removed in the next major`);

				return icon;
			},
		},
		/**
		 * The `href` prop accepts external URLs and the same values a
		 * [`router-link` `to` prop](https://router.vuejs.org/en/api/router-link.html)
		 * would. Will make the icon render as an `<a>` or `<router-link>` as needed.
		*/
		href: {
			type: String,
			default: undefined,
		},
		/**
		 * If set, a label with the value. It also updates the `role` attribute from `presentation`
		 * to `img`.
		*/
		label: {
			type: String,
			default: '',
		},
	},

	computed: {
		icon() {
			return getIcon(this.name);
		},

		isClickable() {
			return this.$listeners.click || this.href;
		},
	},

	icons: Object.keys(iconMap).sort(),

	exists(iconName) {
		return !!getIcon(iconName);
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--icon-size: 16px;
	--clickable-icon-color: var(--color-gray-50);
	--clickable-icon-active-color: var(--color-gray-60);
}

.Icon {
	display: inline-block;
	line-height: 100%;
	vertical-align: middle;

	& polygon,
	& path,
	& circle {
		fill: currentColor;
	}
}

.clickable {
	composes: button-reset from "@square/orbit/styles/util.css";
	height: 24px;
	padding: 0;
	transition: color var(--transition-base);
	border: none;
	background: transparent;
	color: var(--clickable-icon-color);
	line-height: 24px;

	&:hover,
	&:active,
	&:focus {
		color: var(--clickable-icon-active-color);
	}

	&:disabled {
		color: var(--disabled-color);
		cursor: default;
	}
}

.Svg {
	display: block;
	vertical-align: middle;
}
</style>
