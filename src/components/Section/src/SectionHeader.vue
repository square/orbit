<template>
	<header
		:class="[
			$s.Header,
			{
				[$s.flush]: section.flush,
				[$s.collapsible]: collapsible,
				[$s.collapsed]: section.collapsed,
				[$s.sticky]: sticky,
				[$s.hasShadow]: section.topVisible === false,
				[$s.padded]: isPadded,
			},
		]"
		v-on="$listeners"
		@click="toggleCollapse"
	>
		<h2
			v-if="title"
			:class="$s.Heading"
		>
			{{ title }}
		</h2>
		<template v-else>
			<slot />
		</template>

		<div :class="$s.Spacer" />

		<!-- Will appear in the top right of the section -->
		<div
			v-if="$slots.actions"
			:class="$s.Actions"
			@click.stop
		>
			<spacer>
				<slot name="actions" />
			</spacer>
		</div>
	</header>
</template>

<script>
import Spacer from '@square/orbit/utils/Spacer.vue';
import Key from './Key';

// eslint-disable-next-line global-require
const Stickyfill = (typeof window !== 'undefined') && require('stickyfilljs');

export default {
	name: 'OSectionHeader',

	components: {
		Spacer,
	},

	inject: {
		section: Key,
	},

	props: {
		title: {
			type: String,
			default: undefined,
		},
		sticky: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		const vm = this;
		return {
			state: {
				get sticky() {
					return vm.sticky;
				},
			},
		};
	},

	computed: {
		collapsible() {
			return this.section.collapsed !== undefined;
		},
		isPadded() {
			return this.section.variantClass === 'bordered' || this.section.variantClass === 'raised';
		},
	},

	created() {
		this.section.header = this.state;
	},

	mounted() {
		this.stickyPolyfill();
	},

	destroyed() {
		this.section.header = null;
	},

	methods: {
		toggleCollapse() {
			if (this.collapsible) {
				this.section.toggleCollapse();
			}
		},

		stickyPolyfill() {
			if (this.sticky) {
				Stickyfill.addOne(this.$el);
			} else {
				Stickyfill.removeOne(this.$el);
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "./vars.css";

:root {
	--section-header-shadow-height: 4px;
}

.Header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: var(--space-x2);
	border: 1px solid transparent;
	background-clip: padding-box;
	background-color: var(--color-white);

	&::before {
		position: absolute;
		bottom: calc(var(--section-header-shadow-height) * -1);
		left: 0;
		width: 100%;
		height: var(--section-header-shadow-height);
		transition: opacity var(--transition-base);
		background-image: none;
		content: "";
		opacity: 0;
		pointer-events: none;
	}

	&.padded {
		padding-top: var(--section-padding-y);
		padding-right: var(--section-padding-x);
		padding-left: var(--section-padding-x);
	}

	&.flush {
		padding: 0;
	}

	&.collapsible {
		transition: margin-bottom var(--transition-base);
		cursor: pointer;
	}

	&.collapsed {
		margin-bottom: 0;
	}

	&.sticky {
		position: sticky;
		top: 0;
		padding-top: var(--space-x2);
		z-index: 1;

		&.padded {
			top: -8px;
		}
	}

	&.hasShadow {
		&::before {
			background-image:
				linear-gradient(
					color(var(--color-black) a(0.2)),
					transparent
				);
			opacity: 1;
		}
	}
}

.Heading {
	composes: title-2 from "@square/orbit/styles/headings.css";
}

.Spacer {
	flex: 1;
}

.Actions {
	white-space: nowrap;
}
</style>
