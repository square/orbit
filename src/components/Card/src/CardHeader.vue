<template>
	<header
		v-if="title"
		:class="[
			$s.CardHeader,
			{
				[$s.disabled]: disabled,
				[$s.primary]: primary,
			},
		]"
	>
		<template v-if="titleIcon">
			<o-icon
				v-if="isOrbitIcon"
				:name="titleIcon"
				:class="$s.Icon"
			/>
			<img
				v-else
				:src="titleIcon"
				:class="[$s.Icon, $s.external]"
			>
		</template>
		<span :class="$s.Title">
			{{ title }}
		</span>
	</header>
	<header v-else>
		<slot />
	</header>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	name: 'OCardHeader',

	components: {
		OIcon,
	},

	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		titleIcon: {
			type: String,
			default: undefined,
		},
		title: {
			type: String,
			default: undefined,
		},
		primary: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		isOrbitIcon() {
			return OIcon.exists(this.titleIcon);
		},
	},

	created() {
		if (this.titleIcon && this.title === undefined) {
			throwError('Card', 'If you have a `title-icon`, you must also have a `title`.');
		}
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";
@import "@square/orbit/styles/vars-card.css";

.CardHeader {
	composes: title-3 from "@square/orbit/styles/headings.css";
	margin-bottom: var(--space-x2);
	color: var(--color-gray-60);

	&.disabled {
		color: var(--color-gray-60);
	}

	&.primary {
		color: var(--color-white);
	}
}

.Icon {
	margin-top: -2px;
	margin-right: var(--space);
	vertical-align: middle;

	&.external {
		max-width: 16px;
		max-height: 16px;
	}
}
</style>
