<template>
	<o-section
		:class="[
			$s.ZeroState,
			$s[`variant_${variant}`],
			{ [$s['no-actions']]: !$slots.actions, }
		]"
		:variant="$slots.actions ? 'bordered' : null"
	>
		<div
			:class="[
				$s.Container,
				$s[`variant_${variant}`],
				{ [$s['no-actions']]: !$slots.actions, }
			]"
		>
			<div
				v-if="$slots.media"
				:class="[$s.Media, $s[`variant_${variant}`]]"
			>
				<slot name="media" />
			</div>
			<div :class="[$s.Content, $s[`variant_${variant}`]]">
				<o-heading
					v-if="title"
					:class="$s.Title"
					:size="$slots.actions ? 'title-2' : 'title-4'"
				>
					{{ title }}
				</o-heading>
				<slot />
			</div>
			<zero-state-actions
				v-if="$slots.actions"
				:class="[$s.Actions, $s[`variant_${variant}`]]"
			>
				<slot name="actions" />
			</zero-state-actions>
		</div>
		<o-divider
			v-if="$slots.footer"
			:spacing="48"
		/>
		<slot name="footer" />
	</o-section>
</template>

<script>
import { OSection } from '@square/orbit/components/Section';
import { OHeading } from '@square/orbit/components/Heading';
import { ODivider } from '@square/orbit/components/Divider';

import ZeroStateActions from './ZeroStateActions.vue';

export default {
	name: 'OZeroState',

	components: {
		OSection,
		OHeading,
		ODivider,
		ZeroStateActions,
	},

	props: {
		title: {
			type: String,
			default: undefined,
		},
		variant: {
			type: String,
			default: 'normal',
			validator: type => ['normal', 'secondary'].includes(type),
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.ZeroState {
	&.variant_normal {
		padding: var(--space-x3) var(--space-x2);
		background: var(--color-white);
	}

	&.variant_secondary {
		background: var(--color-white);
	}

	&.no-actions {
		padding: var(--space-x6);
		border-radius: var(--border-radius-base);
		background: var(--color-gray-10);
	}
}

.Container {
	&.variant_normal,
	&.no-actions {
		max-width: 480px;
		margin: 0 auto;
		text-align: center;
	}

	&.variant_secondary {
		display: flex;
	}
}

.Content {
	&.variant_secondary {
		flex: 1;
	}
}

.Media {
	&.variant_normal {
		margin-bottom: var(--space-x2);
	}

	&.variant_secondary {
		margin-right: var(--space-x2);
	}
}

.Actions {
	&.variant_normal {
		margin-top: var(--space-x3);
		text-align: center;
	}

	&.variant_secondary {
		flex: 0 0 auto;
		margin-left: var(--space-x3);
	}
}
</style>
