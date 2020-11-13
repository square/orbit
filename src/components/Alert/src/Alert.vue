<template>
	<div :class="$s.Alert">
		<div :class="$s.Content">
			<h2
				v-if="title || $slots.title"
				:class="$s.Title"
			>
				<slot name="title">
					{{ title }}
				</slot>
			</h2>
			<div :class="$s.Body">
				<slot />
			</div>
		</div>

		<div
			v-if="$slots.actions || $scopedSlots.actions"
			:class="$s.Actions"
		>
			<spacer>
				<slot
					:close="close"
					name="actions"
				/>
			</spacer>
		</div>
	</div>
</template>

<script>
import { OLayer } from '@square/orbit/components/Layer';
import Spacer from '@square/orbit/utils/Spacer.vue';

export default {
	name: 'OAlert',

	components: {
		Spacer,
	},

	inject: {
		layer: OLayer.key,
	},

	props: {
		title: {
			type: String,
			default: undefined,
		},
		cancelable: {
			type: Boolean,
			default: false,
		},
		beforeClose: {
			type: Function,
			default: undefined,
		},
	},

	watch: {
		cancelable(cancelable) {
			this.layer.configure({ cancelable });
		},
		beforeClose(fn) {
			this.layer.configure({ beforeClose: fn });
		},
	},

	created() {
		this.layer.configure({
			position: 'top center',
			cancelable: this.cancelable,
			beforeClose: this.beforeClose,
			afterClose: (exitVal) => this.$emit('close', exitVal),
		});
	},

	methods: {
		close(exitVal) {
			return this.layer.close(exitVal)
				// can get rejected by user's before-close hook
				.catch(() => { /* no-op */ });
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";
@import "@square/orbit/styles/vars-layer.css";

.Alert {
	width: calc(100% - var(--space-x4));
	max-width: 420px;
	max-height: var(--layer-max-height);
	border-radius: var(--border-radius-base);
	background: var(--color-white);
	text-align: center;
	box-shadow: var(--box-shadow-foreground);
	box-sizing: border-box;
	overflow: hidden;
	overflow-y: auto;
}

.Content {
	padding: var(--space-x5) var(--space-x7) var(--space-x3);
}

.Body {
	& p {
		&:first-child {
			margin-top: 0;
		}

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.Title {
	composes: title-1 from "@square/orbit/styles/headings.css";
	margin-bottom: var(--space-x3);
}

.Actions {
	padding: var(--space-x3);
	border-top: var(--divider-border);
}
</style>
