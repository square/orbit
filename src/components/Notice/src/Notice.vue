
<template>
	<div
		v-if="!closed"
		:class="[
			$s.Notice,
			$s[`type_${type}`],
			{[$s.subtle]: subtle},
		]"
	>
		<div :class="$s.IconContainer">
			<o-icon
				:class="$s.Icon"
				:name="isOrbitIcon ? icon : defaultIcon"
			/>
		</div>
		<div :class="$s.Content">
			<!-- Default slot -->
			<slot />
		</div>

		<o-button
			v-if="dismissible"
			:class="$s.DismissButton"
			variant="text"
			@click="dismiss"
		>
			<template v-if="dismissibleText">
				{{ dismissibleText }}
			</template>
			<o-icon
				v-else
				:class="$s.DismissIcon"
				name="x"
			/>
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	name: 'ONotice',

	components: {
		OButton,
		OIcon,
	},

	props: {
		/**
		 * Types of notices
		 * @validValues ['info', 'success', 'warning', 'error']
		*/
		type: {
			type: String,
			default: 'info',
			validator: typeVal => ['info', 'success', 'warning', 'error'].includes(typeVal),
		},
		// Show a close button in top-right corner.
		dismissible: {
			type: Boolean,
			default: false,
		},
		/**
		 * Replace default 'X' close icon with a text link.
		 * @requires 'dismissible'
		*/
		dismissibleText: {
			type: String,
			default: undefined,
		},
		// When set to true, the message has no background color or padding.
		subtle: {
			type: Boolean,
			default: false,
		},
		/**
		 * Replaces the circle with an icon. This should either be the name of
		 * an `o-icon` or the src an `<img />` thats 16x16.
		*/
		icon: {
			type: String,
			default: undefined,
		},
	},

	data() {
		return {
			closed: false,
		};
	},

	computed: {
		isOrbitIcon() {
			return this.icon && OIcon.exists(this.icon);
		},
		defaultIcon() {
			let icon;
			switch (this.type) {
			case 'success':
				icon = 'check';
				break;
			case 'warning':
			case 'error':
				icon = 'exclamation-triangle';
				break;
			default:
				icon = 'circle';
			}
			return icon;
		},
	},

	methods: {
		dismiss() {
			this.closed = true;
			// Dismiss button pressed
			this.$emit('dismiss');
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--notice-margin-top: var(--space-x2);
}

.Notice {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	padding: var(--space-x2) var(--space-x3);
	border-radius: var(--border-radius-base);
	font-weight: var(--font-weight-medium);

	& a {
		color: var(--brand-color);
		text-decoration: none;
	}

	& + .Notice {
		margin-top: var(--notice-margin-top);
	}
}

.IconContainer {
	display: inline-flex;
	flex: 0 0 auto;
	height: var(--line-height-base)em;
	margin-right: var(--space);
}

.Icon {
	align-self: center;
}

.Content {
	width: 100%;
}

.DismissButton {
	padding-left: var(--space-x2);
}

.DismissIcon {
	transition: color var(--transition-base);
	color: var(--color-gray-60);

	&:hover {
		color: var(--color-gray-60);
	}
}

/* Types
------------------------- */
.type_info {
	background-color: var(--info-bg-color);

	& + .type_info:not(.subtle) {
		margin-top: calc(-1 * var(--border-radius-base));
		padding-top: var(--border-radius-base);
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	& .Icon {
		color: var(--info-color);
	}

	&.subtle {
		color: var(--info-color);
	}

	&.subtle + .type_info {
		margin-top: var(--notice-margin-top);
	}
}

.type_success {
	background-color: var(--success-bg-color);

	& + .type_success:not(.subtle) {
		margin-top: calc(-1 * var(--border-radius-base));
		padding-top: var(--border-radius-base);
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	& .Icon {
		color: var(--success-color);
	}

	&.subtle {
		color: var(--success-color);
	}

	&.subtle + .type_success {
		margin-top: var(--notice-margin-top);
	}
}

.type_warning {
	background-color: var(--warning-bg-color);

	& + .type_warning:not(.subtle) {
		margin-top: calc(-1 * var(--border-radius-base));
		padding-top: var(--border-radius-base);
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	& .Icon {
		color: var(--warning-color);
	}

	&.subtle {
		color: var(--warning-color);
	}

	&.subtle + .type_warning {
		margin-top: var(--notice-margin-top);
	}
}

.type_error {
	background-color: var(--danger-bg-color);

	& + .type_error:not(.subtle) {
		margin-top: calc(-1 * var(--border-radius-base));
		padding-top: var(--border-radius-base);
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	& .Icon {
		color: var(--danger-color);
	}

	&.subtle {
		color: var(--danger-color);
	}

	&.subtle + .type_error {
		margin-top: var(--notice-margin-top);
	}
}

/* Subtle
------------------------- */
.subtle {
	padding: 0;
	background: none;
}

</style>
