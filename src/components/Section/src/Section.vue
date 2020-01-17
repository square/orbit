<template>
	<section
		:class="[
			$s.Section,
			$s[`variant_${variant}`],
			{
				[$s.flush]: flush,
				[$s['uses-custom-header']]: usesCustomHeader,
			},
		]"
	>
		<template v-if="usesCustomHeader">
			<div
				ref="scrollDetector"
				:class="$s.ScrollDetector"
			/>
			<subslot name="sectionHeader">
				<section-header
					v-if="title || $slots.actions"
					:title="title"
				>
					<slot
						slot="actions"
						name="actions"
					/>
				</section-header>
			</subslot>

			<collapse-transition v-if="$subslots.default">
				<div
					v-show="!collapsed"
					:class="[
						$s.Content,
						$s[`variant_${variantClass}`],
						{
							[$s['uses-custom-header']]: usesCustomHeader,
							[$s.flushTop]: hasHeader,
							[$s.flush]: flush,
						}
					]"
					:aria-hidden="collapsed"
				>
					<subslot />
				</div>
			</collapse-transition>
		</template>
		<template v-else>
			<div
				:class="[
					$s.TitleContainer,
					{ [$s['responsive-actions']]: responsiveActions },
					{ [$s['has-content']]: hasContent },
				]"
			>
				<div v-if="$slots.title">
					<slot name="title" />
				</div>
				<o-heading
					v-else-if="title"
					:class="$s.Title"
					size="title-2"
					flush
				>
					{{ title }}
				</o-heading>
				<div
					v-if="$slots.description"
					:class="$s.Description"
				>
					<slot name="description" />
				</div>
			</div>
			<div
				v-if="$slots.actions"
				:class="[
					$s.Actions,
					{ [$s['responsive-actions']]: responsiveActions },
				]"
			>
				<spacer>
					<slot name="actions" />
				</spacer>
			</div>
			<div
				:class="[
					$s.Content,
					{ [$s['responsive-actions']]: responsiveActions },
				]"
			>
				<slot />
			</div>
		</template>
	</section>
</template>

<script>
import Subslot from 'vue-subslot';
import Spacer from '@square/orbit/utils/Spacer.vue';
import { OHeading } from '@square/orbit/components/Heading';
import CollapseTransition from '@square/orbit/transitions/CollapseTransition.vue';
import SectionHeader from './SectionHeader.vue';
import Key from './Key';

// https://github.com/w3c/IntersectionObserver/pull/279#issuecomment-382741031
if (typeof window !== 'undefined') {
	require('intersection-observer'); // eslint-disable-line global-require
}

export default {
	name: 'OSection',

	components: {
		Subslot,
		Spacer,
		OHeading,
		CollapseTransition,
		SectionHeader,
	},

	mixins: [
		Subslot.define({
			sectionHeader: '@SectionHeader:1',
		}),
	],

	props: {
		title: {
			type: String,
			default: undefined,
		},
		variant: {
			type: String,
			default: 'normal',
			validator: value => ['normal', 'bordered', 'raised'].includes(value),
		},
		flush: {
			type: Boolean,
			default: false,
		},
		collapsed: {
			type: Boolean,
			default: undefined,
		},
		responsiveActions: {
			type: Boolean,
			default: undefined,
		},
	},

	provide() {
		return {
			[Key]: this.state,
		};
	},

	data() {
		const vm = this;
		return {
			state: {
				header: null,
				topVisible: null,
				toggleCollapse: () => {
					this.$emit('update:collapsed', !this.collapsed);
				},
				get collapsed() {
					return vm.collapsed;
				},
				get variantClass() {
					return vm.variantClass;
				},
				get flush() {
					return vm.flush;
				},
			},
			hasContent: !!this.$slots.default,
		};
	},

	computed: {
		variantClass() {
			if (this.bordered && this.variant !== 'raised') {
				return 'bordered';
			}
			return this.variant;
		},
		hasHeader() {
			return this.title || this.$slots.actions || this.$subslots.sectionHeader;
		},
		hasStickyHeader() {
			return this.state.header && this.state.header.sticky;
		},
		usesCustomHeader() {
			return this.$subslots.sectionHeader
			|| typeof this.state.collapsed === 'boolean'
			|| this.hasStickyHeader;
		},
	},

	watch: {
		'state.header.sticky': 'detectScroll',
	},

	mounted() {
		this.detectScroll();
	},

	updated() {
		this.hasContent = !!this.$slots.default;
	},

	methods: {
		detectScroll() {
			const { sticky } = this.state.header || {};

			if (!sticky && this.io) {
				this.state.topVisible = null;
				this.io.disconnect();
				this.io = undefined;
			}

			if (sticky) {
				this.io = new IntersectionObserver(([{ isIntersecting }]) => {
					this.state.topVisible = isIntersecting;
				});
				this.io.observe(this.$refs.scrollDetector);
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "./vars.css";

.Section {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	background: var(--color-white);

	&.variant_bordered {
		border: var(--divider-border);
		border-radius: var(--border-radius-base);
	}

	&.variant_raised {
		border-radius: var(--border-radius-base);
		box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
	}

	&:not(.flush) {
		&.variant_bordered,
		&.variant_raised {
			padding: var(--section-padding-y) var(--section-padding-x);
		}
	}
}

.TitleContainer {
	flex: 1;

	&.responsive-actions {
		order: 0;
	}

	&.has-content {
		margin-bottom: var(--space-x4);
	}
}

.Description {
	max-width: 90ch;
	color: var(--color-gray-50);

	&.responsive-actions {
		order: 0;
	}
}

.Title + .Description {
	margin-top: 0.5rem;
}

.Actions {
	flex: 0 0 auto;
	margin: 0 0 0 var(--space-x2);

	&.responsive-actions {
		order: 1;
		margin: var(--space-x3) 0 0 0;

		@media (--for-tablet-landscape-up) {
			order: 0;
			margin: 0 0 0 var(--space-x2);
		}
	}
}

.Content {
	flex: 0 0 100%;

	&.responsive-actions {
		order: 0;
	}
}

/* Section - Custom Header
---------------------------------------------- */
.Section.uses-custom-header {
	display: block;
	position: relative;
	z-index: 0;

	&.variant_bordered,
	&.variant_raised {
		padding: 0;
	}
}

/* Content - Custom Header
---------------------------------------------- */
.Content.uses-custom-header {
	flex: none;
	margin-top: 0;

	&.variant_bordered,
	&.variant_raised {
		padding: var(--section-padding-y) var(--section-padding-x);
	}

	&.flush {
		padding: 0;
	}

	&.flushTop {
		padding-top: 0;
	}
}

/* Scroll
---------------------------------------------- */
.ScrollDetector {
	position: absolute;
	top: 0;
	left: 0;
}

</style>
