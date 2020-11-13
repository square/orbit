<template>
	<div :class="[$s.Toast, $s[`variant_${variant}`]]">
		<header :class="$s.Header">
			<div :class="$s.Message">
				{{ message }}
			</div>

			<o-button
				v-if="action && !persistent"
				:class="$s.Action"
				variant="text"
				@click="handleAction"
			>
				{{ action.text }}
			</o-button>

			<o-button
				v-if="persistent"
				:class="$s.Close"
				variant="muted"
				@click="close"
			>
				<o-icon name="x" />
			</o-button>
		</header>

		<div
			v-if="hasDescription || (persistent && action)"
			:class="[$s.Description, { [$s.hasDescription]: hasDescription }]"
		>
			<div v-if="$slots.default">
				<slot />
			</div>

			<o-button
				v-if="persistent && action"
				:class="$s.Button"
				variant="primary"
				@click="handleAction"
			>
				{{ action.text }}
			</o-button>
		</div>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import { OButton } from '@square/orbit/components/Button';
import CustomToastKey from './CustomToastKey';

export default {
	name: 'OToast',

	components: {
		OIcon,
		OButton,
	},

	inject: {
		customToast: {
			from: CustomToastKey,
			default: undefined,
		},
	},

	props: {
		message: {
			type: String,
			required: true,
		},
		action: {
			type: Object,
			default: undefined,
		},
		persistent: {
			type: Boolean,
			default: false,
		},
		variant: {
			type: String,
			default: 'default',
			validator: (variantVal) => ['default', 'error', 'warning'].includes(variantVal),
		},
	},

	computed: {
		hasDescription() {
			return this.$slots.default && this.$slots.default.map((vnode) => vnode.tag || vnode.text.trim()).join('').length > 0;
		},
	},

	mounted() {
		if (!this.persistent) {
			const duration = this.action || this.hasDescription ? 6000 : 4000;
			setTimeout(() => this.close(), duration);
		}
	},

	methods: {
		close() {
			if (this.customToast) {
				this.customToast.closeToast();
			} else {
				this.$emit('toast:request-close');
			}
		},

		handleAction() {
			this.action.function();
			this.close();
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";

.Toast {
	position: relative;
	padding: var(--space-x2) var(--space-x3);
	border-radius: var(--border-radius-base);
	background-color: var(--color-white);
	box-shadow: var(--box-shadow-interactive);
	overflow: hidden;
	box-sizing: border-box;

	&::before {
		display: block;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 4px;
		background-color: var(--brand-color);
		content: "";
	}
}

.Toast + .Toast {
	margin-top: var(--space-x2);
}

.Header {
	display: flex;
	align-items: center;
}

.Message {
	composes: title-4 from "@square/orbit/styles/headings.css";
	flex: 1;
	margin-bottom: 0;
	overflow: hidden;
}

.Close {
	flex: 0 0 auto;
	margin: calc(-1 * var(--space)) calc(-2 * var(--space)) calc(-1 * var(--space)) var(--space-x3);
	transition: color var(--transition-base);
	cursor: pointer;
}

.Description {
	&.hasDescription {
		margin-top: var(--space);
	}
}

.Button {
	margin-top: var(--space-x2);
}

.variant_error {
	&::before {
		background-color: var(--danger-color);
	}
}

.variant_warning {
	&::before {
		background-color: var(--warning-color);
	}
}
</style>
