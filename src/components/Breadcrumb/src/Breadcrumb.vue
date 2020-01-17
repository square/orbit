<template>
	<transition-group
		:class="[
			$s.Breadcrumb,
			{
				[$s.stacked]: stacked,
				[$s.singleStackedCrumb]: isSingleStackedCrumb,
			},
		]"
		:enter-active-class="enableTransition ? $s.fadingActive : ''"
		:leave-active-class="enableTransition ? $s.fadingActive : ''"
		:enter-class="$s.enterFrom"
		:enter-to-class="$s.enterTo"
		:leave-class="$s.leaveFrom"
		:leave-to-class="$s.leaveTo"
		tag="div"
	>
		<div
			v-for="(item, idx) in visibleCrumbs"
			:key="`${item.label}${idx}`"
			:class="[
				$s.CrumbContainer,
				{
					[$s.stacked]: stacked,
					[$s.prevCrumb]: isStackedBackLink(idx),
					[$s.currentCrumb]: isLastCrumb(idx),
				}
			]"
		>
			<o-icon
				v-if="!stacked && idx > 0"
				:class="$s.Delimiter"
				name="arrow-right"
			/>
			<crumb-link
				:class="[
					$s.Crumb,
					{
						[$s.stacked]: stacked,
						[$s.parentLink]: isStackedBackLink(idx),
						[$s.lastCrumb]: isLastCrumb(idx),
					}
				]"
				:to="item.to"
			>
				<o-icon
					v-if="isStackedBackLink(idx)"
					:class="$s.BackArrow"
					name="arrow-left"
				/>
				{{ item.label }}
			</crumb-link>
		</div>
	</transition-group>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import CrumbLink from './CrumbLink.vue';


export default {
	name: 'OBreadcrumb',

	components: {
		OIcon,
		CrumbLink,
	},

	props: {
		crumbs: {
			type: Array,
			required: true,
		},
		stacked: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			enableTransition: false,
		};
	},

	computed: {
		isSingleStackedCrumb() {
			return this.stacked && this.crumbs.length === 1;
		},

		visibleCrumbs() {
			return this.stacked ? this.crumbs.slice(-2) : this.crumbs;
		},
	},

	watch: {
		crumbs(to, from) {
			this.enableTransition = !(from.length === 1 && from.length === to.length);
		},
	},

	methods: {
		isStackedBackLink(idx) {
			return this.stacked && (idx === 0) && this.crumbs.length > 1;
		},
		isLastCrumb(idx) {
			return (idx + 1) === this.visibleCrumbs.length;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";

:root {
	--crumb-font-size: var(--heading-t1-size);
	--stacked-prev-crumb-font-size: var(--font-size-base);
	--stacked-prev-crumb-height: calc(var(--stacked-prev-crumb-font-size) * 1.5);
	--stacked-crumb-height: calc(var(--heading-t1-size) * 1.5);
	--stacked-breadcrumb-height: calc(var(--stacked-prev-crumb-height) + var(--stacked-crumb-height));
	--stacked-breadcrumb-transition-distance: 40px;
}

.Breadcrumb {
	display: inline-flex;

	&.stacked {
		position: relative;
		height: var(--stacked-breadcrumb-height);

		&.singleStackedCrumb {
			height: var(--stacked-crumb-height);
		}
	}
}

.CrumbContainer {
	display: inline-flex;

	&.stacked {
		position: absolute;

		&.prevCrumb {
			top: 0;
		}

		&.currentCrumb {
			bottom: 0;
		}
	}
}

.Crumb {
	composes: font-base from "@square/orbit/styles/util.css";
	display: inline-flex;
	transition: font-size var(--transition-base);
	color: var(--color-gray-60);
	font-size: var(--crumb-font-size);
	text-decoration: none;
	cursor: default;
	vertical-align: middle;

	&.stacked {
		white-space: nowrap;
	}

	&.parentLink {
		color: var(--brand-color);
		font-size: var(--stacked-prev-crumb-font-size);
		font-weight: var(--font-weight-medium);
		line-height: 16px; /* size of the icon */
	}

	&.lastCrumb {
		color: var(--color-gray-60);
		font-size: var(--crumb-font-size);
		font-weight: var(--font-weight-medium);
	}
}

a.Crumb {
	color: var(--brand-color);
	cursor: pointer;

	&:hover,
	&:active {
		color: color(var(--brand-color) blackness(20%));
	}
}

.Breadcrumb .Delimiter {
	align-self: center;
	margin: 0 10px;
	color: var(--color-gray-30);
}

.BackArrow {
	color: var(--brand-color);
	vertical-align: text-bottom;
}

/* Transition */
.fadingActive {
	transition:
		opacity 0.3s var(--transition-easing),
		transform 0.3s var(--transition-easing);
}

.enterFrom {
	transform: translateX(var(--stacked-breadcrumb-transition-distance));
	opacity: 0;
}

.enterTo,
.leaveFrom {
	transform: translateX(0);
	opacity: 1;
}

.leaveTo {
	opacity: 0;
}

</style>
