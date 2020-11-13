<template>
	<div
		:class="[
			$s.AccordionItem,
			$s[`variant_${accordion.variant}`],
			{ [$s.open]: open }
		]"
	>
		<button
			:class="$s.HeaderButton"
			:aria-expanded="open ? true : false"
			type="button"
			@click="toggleOpen"
		>
			<no-click-focus
				:class="[
					$s.InnerHeaderButton,
					{ [$s.hasSubtitle]: subtitle },
				]"
			>
				<o-icon
					v-if="accordion.variant !== 'subtle'"
					:class="$s.CollapseIcon"
					name="arrow-right"
				/>
				<div :class="$s.LabelWrap">
					<div :class="$s.Label">
						{{ label }}
					</div>
					<div v-if="subtitle">
						{{ subtitle }}
					</div>
				</div>
				<o-icon
					v-if="accordion.variant === 'subtle'"
					:class="$s.CollapseIcon"
					name="arrow-down"
				/>
			</no-click-focus>
		</button>

		<collapse-transition>
			<div
				v-show="open"
				:aria-hidden="open ? false : true"
			>
				<div :class="$s.Container">
					<slot />
				</div>
			</div>
		</collapse-transition>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import NoClickFocus from '@square/orbit/utils/NoClickFocus.vue';
import CollapseTransition from '@square/orbit/transitions/CollapseTransition.vue';
import AccordionKey from './AccordionKey';

export default {
	name: 'OAccordionItem',

	components: {
		OIcon,
		NoClickFocus,
		CollapseTransition,
	},

	props: {
		label: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			default: undefined,
		},
	},

	data() {
		return {
			accordionId: Symbol('accordionId'),
		};
	},

	inject: {
		accordion: AccordionKey,
	},

	computed: {
		open() {
			return (this.accordion.children[this.accordion.openIdx] === this.accordionId);
		},
	},

	created() {
		this.accordion.children.push(this.accordionId);
	},

	beforeDestroy() {
		const idx = this.accordion.children.indexOf(this.accordionId);
		this.accordion.children.splice(idx, 1);
	},

	methods: {
		toggleOpen() {
			const idx = this.accordion.children.indexOf(this.accordionId);

			this.accordion.openIdx = (this.accordion.openIdx !== idx ? idx : -1);
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";

:root {
	/*  Default/Medium size buttons get a 7px left padding. */
	--button-padding-left: 7px;
	--accordion-button-padding-left: calc(var(--button-padding-left) + var(--space-x2));
	--accordion-icon-size: 16px;
	--accordion-label-padding-left: var(--space-x2);
}

.LabelWrap {
	composes: font-base from "@square/orbit/styles/util.css";
	text-align: left;
}

.Label {
	composes: title-3 from "@square/orbit/styles/headings.css";
}

.HeaderButton {
	composes: button-reset from "@square/orbit/styles/util.css";
	width: 100%;
	border: none;
	outline: none;
}

.AccordionItem {
	composes: font-base from "@square/orbit/styles/util.css";
	background-color: var(--color-white);

	& .CollapseIcon {
		min-width: 16px;
		margin-top: 4px;
		transition: transform var(--transition-base);
	}
}

.variant_contained {
	margin-bottom: var(--space);
	border-radius: var(--border-radius-base);

	/*
	Custom box-shadow only used for contained Accordions.
	TODO: Revisit our elevation guidelines and see if where this box shadow fits in.
	*/
	box-shadow:
		0 2px 2px rgba(27, 33, 38, 0.1),
		0 0 2px rgba(27, 33, 38, 0.25);

	& .HeaderButton {
		border-radius: var(--border-radius-base);
	}
}

.variant_contained,
.variant_normal {
	& .LabelWrap {
		padding-left: var(--accordion-label-padding-left);
	}

	&:not(.open):hover .HeaderButton {
		background-color: var(--hover-bg-color);
	}

	&.open {
		& .CollapseIcon {
			transform: rotate(90deg);
		}
	}

	& .Container {
		/* The left padding calc is used up to line up content area with the label in the button. */
		padding:
			0
			var(--space-x2)
			var(--space-x3)
			calc(
				var(--accordion-button-padding-left)
				+ var(--accordion-icon-size)
				+ var(--accordion-label-padding-left)
			);
	}
}

.variant_normal + .variant_normal {
	border-top: var(--divider-border);
}

.variant_subtle {
	padding: var(--space);

	& .HeaderButton,
	& .InnerHeaderButton {
		padding: 0;
	}

	& .HeaderButton,
	& .Label {
		color: var(--brand-color);
		line-height: 24px;
	}

	& .CollapseIcon {
		margin-left: var(--space-x2);
	}

	&.open {
		& .CollapseIcon {
			transform: rotate(-180deg);
		}
	}

	& .Container {
		padding: var(--space) 0;
	}
}

.InnerHeaderButton {
	display: flex;
	align-items: flex-start;
	padding: var(--space-x2);
	border: none;
	background-color: transparent;
	cursor: pointer;

	&.hasSubtitle {
		padding: var(--space-x2);
	}
}
</style>
