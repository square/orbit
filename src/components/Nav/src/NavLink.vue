<template>
	<li
		:class="[
			$s.NavLinkLi,
			$s[`theme_${nav.theme}`],
			{
				[$s.isSecondary]: nav.variant === 'secondary' || isChild,
				[$s.isMenuLink]: nav.variant === 'menu',
				[$s.isHorizontal]: nav.horizontal,
			}
		]"
	>
		<smart-link
			v-if="!hasChildren"
			:class="[
				$s.NavLink,
				$s[`theme_${nav.theme}`],
				{
					[$s.isActive]: isActive,
					[$s.isSmallerFont]: ['secondary', 'menu'].includes(nav.variant) || isChild,
					[$s.isVertical]: !nav.horizontal,
					[$s.isMenuLink]: nav.variant === 'menu',
					[$s.hasIndicator]: hasIndicator,
				},
			]"
			:href="to"
			v-bind="$attrs"
			v-on="$listeners"
		>
			<no-click-focus :class="$s.InnerLink">
				<spacer>
					<slot />
				</spacer>
			</no-click-focus>
		</smart-link>
		<button
			v-else
			:class="[
				$s.NavLink, $s.isSmallerFont, $s.isVertical, $s.hasChildren,
				$s[`theme_${nav.theme}`],
				{
					[$s.hasIndicator]: hasIndicator,
					[$s.isExpanded]: isExpanded,
				}
			]"
			@click="isExpanded = !isExpanded"
		>
			<no-click-focus :class="$s.InnerLink">
				<spacer>
					<slot />
				</spacer>
			</no-click-focus>
		</button>

		<nav-list
			v-if="hasChildren"
			:class="[
				$s.Children,
				{ [$s.isExpanded]: isExpanded, }
			]"
		>
			<slot name="children" />
		</nav-list>
	</li>
</template>

<script>
import { showWarning } from '@square/orbit/utils/debug';
import Spacer from '@square/orbit/utils/Spacer.vue';
import SmartLink from '@square/orbit/utils/SmartLink.vue';
import NoClickFocus from '@square/orbit/utils/NoClickFocus.vue';
import Key from './Key';
import NavList from './NavList.vue';

export default {
	name: 'ONavLink',

	components: {
		SmartLink,
		NavList,
		Spacer,
		NoClickFocus,
	},

	inheritAttrs: false,

	props: {
		to: {
			type: [String, Object],
			default: undefined,
		},
		active: {
			type: Boolean,
			default: undefined,
		},
	},

	inject: {
		nav: Key,
	},

	data() {
		const vm = this;
		return {
			secondaryState: {
				topNav: this.nav,
				childLinks: [],
			},
			tertiaryState: {
				get isActive() { return vm.isActive; },
			},
			isExpanded: this.hasActiveChild,
		};
	},

	provide() {
		return {
			[Key]: this.secondaryState,
		};
	},

	computed: {
		isChild() {
			return Array.isArray(this.nav.childLinks);
		},

		hasIndicator() {
			const { nav } = this;
			const hasIndicator = nav.hasIndicator || (nav.topNav && nav.topNav.hasIndicator);

			if (!hasIndicator) { return false; }

			const isSecondary = this.nav.variant === 'secondary' || this.nav.topNav.variant === 'secondary';

			if (!isSecondary) {
				showWarning('NavLink', 'Indicators can only be added to secondary navs.');
			}

			return isSecondary;
		},

		hasChildren() {
			const hasChildren = this.$slots.children && this.$slots.children.length;

			if (!hasChildren) { return false; }

			if (this.nav.variant !== 'secondary') {
				showWarning('NavLink', 'Children will only render for secondary navs.');
			}

			if (this.to) {
				showWarning('NavLink', 'Children will not render when linked.');
			}

			const canHaveChildren = this.nav.variant === 'secondary' && !this.to;

			return canHaveChildren;
		},

		hasActiveChild() {
			return (
				this.hasIndicator
				&& this.secondaryState
				&& this.secondaryState.childLinks.some(child => child.isActive)
			);
		},

		isActive() {
			if (typeof this.active === 'boolean') {
				return this.active;
			}

			return this.to && this.matchCurrentVueRoute(this.to);
		},
	},

	watch: {
		$route() {
			if (this.hasChildren) {
				this.isExpanded = this.hasActiveChild;
			}
		},
		hasActiveChild(hasActiveChild) {
			if (this.hasChildren) {
				this.isExpanded = hasActiveChild;
			}
		},
	},

	created() {
		if (this.isChild) {
			this.nav.childLinks.push(this.tertiaryState);
		}
		if (!this.hasChildren && !this.$props.to && !this.$listeners.click) {
			showWarning('NavLink', 'Must have a `to` attribute or click handler.');
		}
	},

	destroyed() {
		if (this.isChild) {
			this.nav.childLinks.splice(this.nav.childLinks.indexOf(this.tertiaryState), 1);
		}
	},

	methods: {
		resolveRoute(route) {
			if (!this.$router) { return undefined; }
			const resolvedPath = this.$router.resolve(route);
			const { path } = resolvedPath.resolved;
			return path;
		},

		matchCurrentVueRoute(route) {
			if (!this.$route) { return false; }

			const resolved = this.resolveRoute(route);

			if (!resolved) { return false; }

			const currentRoute = this.checkTrailingSlashes(this.$route.path);
			const resolvedRoute = this.checkTrailingSlashes(resolved);

			return currentRoute === resolvedRoute;
		},

		checkTrailingSlashes(route) {
			const lastChar = route.substr(route.length - 1);

			// Remove the trailing slash from the route if it's the last character
			return lastChar === '/'
				? route.slice(0, -1)
				: route;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.NavLinkLi {
	font-weight: var(--font-weight-medium);

	&.theme_normal {
		color: var(--color-gray-50);
	}

	&.theme_light {
		color: var(--color-white);
	}

	&.theme_dark {
		color: var(--color-gray-60);
	}

	&.isHorizontal + .isHorizontal {
		margin-left: var(--space-x2);
	}

	&.isSecondary {
		font-weight: var(--font-weight-regular);

		&.theme_normal {
			color: var(--color-gray-60);
		}

		&.theme_light {
			color: var(--color-white);
		}

		&.theme_dark {
			color: var(--color-gray-60);
		}

		&.isHorizontal + .isHorizontal {
			margin-left: var(--space-x3);
		}
	}

	&.isMenuLink {
		color: var(--color-gray-60);

		&:not(:first-child) {
			border-top: var(--divider-border);
		}

		&:hover {
			background-color: var(--hover-bg-color);
		}

		&.theme_light {
			background: var(--color-black-80);

			&:not(:first-child) {
				border-color: var(--color-black-70);
			}

			&:hover {
				background-color: var(--color-black-70);
			}
		}
	}
}

.NavLink {
	composes: title-3 from "@square/orbit/styles/headings.css";
	display: block;
	width: 100%;
	padding: 0;
	transition: var(--transition-base) color;
	border: none;
	background: transparent; /* Safari browser reset */
	color: inherit;
	line-height: var(--line-height-base);
	text-align: left;
	text-decoration: none;
	cursor: pointer;
	box-sizing: border-box;
	overflow-wrap: break-word;

	&:focus {
		outline: none;
	}

	&.theme_normal {
		&:hover {
			color: var(--brand-color);
		}
	}

	&.theme_light {
		&:hover {
			color: color(var(--color-white) a(0.7));
		}
	}

	&.isVertical {
		& .InnerLink {
			padding: var(--space) 0;
		}

		&.isSmallerFont .InnerLink {
			padding-top: 10px;
			padding-bottom: 10px;
		}
	}

	&.isSmallerFont {
		position: relative;
		font-size: var(--font-size-base);
		font-weight: 400;
	}

	&.isActive {
		font-weight: var(--font-weight-medium);

		&.theme_normal {
			color: var(--color-gray-60);
		}

		&.theme_light {
			color: var(--color-white);
		}
	}

	&.hasIndicator {
		& .InnerLink {
			padding-left: var(--space-x2);

			&::before {
				display: block;
				position: absolute;
				top: var(--space);
				bottom: var(--space);
				left: 0;
				width: 4px;
				transition: background-color var(--transition-base);
				background-color: transparent;
				content: "";
			}

			&:hover::before {
				background-color: var(--color-gray-30);
			}
		}

		&.isActive .InnerLink {
			font-weight: var(--font-weight-medium);

			&::before {
				background-color: var(--brand-color);
			}
		}
	}

	&.isMenuLink {
		& .InnerLink {
			padding: var(--space) var(--space-x2);
			color: var(--color-gray-60);

			&::before {
				content: none;
			}
		}

		&.theme_light .InnerLink {
			color: var(--color-white);
		}

		&.isActive .InnerLink {
			font-weight: var(--font-weight-medium);
		}
	}

	&.hasChildren {
		padding: 0;

		& .InnerLink {
			display: flex;
			align-items: center;

			&::after {
				display: inline-block;
				position: relative;
				top: -2px;
				width: 5px;
				min-width: 5px;
				height: 5px;
				margin-left: var(--space);
				transform: rotate(45deg);
				transition: transform ease 250ms;
				border-width: 0 2px 2px 0;
				border-style: solid;
				border-color: var(--color-gray-60);
				content: "";
			}
		}

		&.isActive .InnerLink,
		&.isExpanded .InnerLink {
			&::after {
				top: 1px;
				transform: rotate(225deg);
			}
		}
	}
}

.Children {
	display: none;

	&.isExpanded {
		display: block;
	}

	& .NavLink .InnerLink {
		padding-left: var(--space);
	}

	& .NavLink.hasIndicator .InnerLink {
		padding-left: var(--space-x3);
	}
}
</style>
