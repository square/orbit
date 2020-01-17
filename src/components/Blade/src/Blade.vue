<template>
	<div :class="[$s.Blade,	{[$s.backdrop]: backdrop }]">
		<header :class="$s.Header">
			<o-button
				:class="$s.CenteringBuffer"
				variant="muted"
				@click="close(false)"
			>
				<o-icon name="x" />
			</o-button>
			<o-heading
				:class="$s.Title"
				size="title-1"
				flush
			>
				{{ title }}
			</o-heading>
			<div :class="$s.CenteringBuffer" />
		</header>
		<header
			v-if="hasSubtitle"
			:class="[$s.Header, $s.Sub]"
		>
			<slot name="subtitle">
				<o-heading
					:class="$s.Subtitle"
					size="title-3"
					flush
				>
					{{ subtitle }}
				</o-heading>
			</slot>
		</header>
		<div :class="$s.Content">
			<slot />
		</div>

		<div
			v-if="$slots.actions"
			:class="$s.Footer"
		>
			<blade-actions>
				<slot name="actions" />
			</blade-actions>
		</div>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import { OButton } from '@square/orbit/components/Button';
import { OHeading } from '@square/orbit/components/Heading';
import { BladeKey } from './Keys';
import BladeActions from './BladeActions.vue';

export default {
	name: 'OBlade',

	components: {
		OButton,
		OIcon,
		OHeading,
		BladeActions,
	},

	inject: {
		bladeLayer: BladeKey,
	},

	props: {
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			default: undefined,
		},
		backdrop: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		hasSubtitle() {
			return this.$slots.subtitle || this.subtitle;
		},
	},

	created() {
		this.bladeLayer.configure({
			afterClose: exitVal => this.$emit('close', exitVal),
		});
	},

	methods: {
		close(exitVal) {
			return this.bladeLayer.close(exitVal);
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";
@import "@square/orbit/styles/vars-layer.css";

:root {
	--header-padding: var(--space-x2);
	--close-button-width: 40px;
	--buffer-width: calc(var(--close-button-width) + var(--header-padding));
}

.Blade {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: var(--color-white);

	&.backdrop {
		background-color: var(--color-gray-10);
	}
}

.Header {
	display: flex;
	position: relative;
	flex: 0 0 auto;
	align-items: center;
	justify-content: center;
	padding: var(--header-padding);
	border-bottom: 1px solid var(--color-gray-30);
	background-color: var(--color-white);
}

.Subtitle {
	color: var(--color-gray-50);
	text-align: center;
}

/*
 * This uses flex to smartly center the title so that the close icon does
 * not overlap with it. It is placed on either side of the title, and it's
 * flex basis is the same width as the width of the close icon button +
 * a 16px margin.
 */
.CenteringBuffer {
	flex: 0 0 var(--buffer-width);

	/*
	* The buffer on the right side is allowed to shrink to make more space
	* for the title. This allows the title character length to stretch as wide
	* as possible while still appearing centered. The min-width makes
	* sure the overflow does not exceed into the padding of the header
	*/
	&:last-child {
		flex: 0 10 var(--buffer-width);
		min-width: var(--header-padding);
	}
}

.Title {
	composes: overflow-ellipsis from "@square/orbit/styles/util.css";
	flex: 1 1 auto;
	text-align: center;
}

.Content {
	height: 100%;
	padding: var(--space-x3) var(--space-x2);
	overflow: auto;
}

.Footer {
	padding: var(--space-x2);
	border-top: var(--divider-border);
}
</style>
