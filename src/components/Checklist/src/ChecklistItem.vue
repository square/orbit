<template>
	<smart-link
		:href="route"
		:class="[
			$s.Item,
			{ [$s.completed]: completed }
		]"
		v-on="$listeners"
	>
		<no-click-focus :class="$s.InnerItem">
			<div :class="$s.IconWrapper">
				<o-icon
					v-if="completed"
					:class="[
						$s.Icon,
						$s.complete
					]"
					name="check"
				/>
				<div
					v-else
					:class="[
						$s.Icon,
						$s.incomplete
					]"
				/>
			</div>
			<span :class="$s.Title">
				{{ title }}
			</span>
		</no-click-focus>
	</smart-link>
</template>
<script>
import { OIcon } from '@square/orbit/components/Icon';
import SmartLink from '@square/orbit/utils/SmartLink.vue';
import NoClickFocus from '@square/orbit/utils/NoClickFocus.vue';

export default {
	name: 'OChecklistItem',

	components: {
		OIcon,
		SmartLink,
		NoClickFocus,
	},

	props: {
		title: {
			type: String,
			required: true,
		},
		to: {
			type: [String, Object],
			default: undefined,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		route() {
			return !this.completed ? this.to : null;
		},
	},
};
</script>
<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.IconWrapper {
	display: flex;
	align-items: center;
	height: var(--form-control-line-height);
}

.Icon {
	flex: 0 0 auto;

	&.incomplete {
		width: var(--form-control-dimension);
		height: var(--form-control-dimension);
		border: var(--form-border);
		border-radius: 2px;
		box-sizing: border-box;
		background-color: var(--form-bg-color);
	}
}

.Item {
	composes: font-base from "@square/orbit/styles/util.css";
	margin-bottom: var(--space);
	transition: color var(--transition-base);
	border: none; /* in case it gets rendered as a button tag */
	outline: none;
	color: var(--brand-color);
	line-height: var(--form-control-line-height);
	text-decoration: none;
	cursor: pointer;

	&:hover:not(.completed) {
		color: var(--brand-color-dark);
	}

	&.completed {
		color: var(--disabled-color);
		cursor: default;
	}
}

.InnerItem {
	display: flex;
}

.Title {
	margin-left: var(--space-x2);
}
</style>
