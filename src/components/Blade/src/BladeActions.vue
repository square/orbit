<template>
	<div :class="$s.Actions">
		<vnode-filter
			:enforce-component="OButton"
			remove-whitespace
			@componentMismatch="onComponentMismatch"
			@completed="validateNodes"
		>
			<spacer>
				<slot />
			</spacer>
		</vnode-filter>
	</div>
</template>
<script>
import { OButton, ButtonKey } from '@square/orbit/components/Button';
import { assert, throwError } from '@square/orbit/utils/debug';
import Spacer from '@square/orbit/utils/Spacer.vue';
import VnodeFilter from '@square/orbit/utils/v-node-filter';

export default {
	components: {
		VnodeFilter,
		Spacer,
	},

	provide() {
		return {
			[ButtonKey]: {
				fullWidth: true,
			},
		};
	},

	data() {
		return {
			OButton,
		};
	},

	methods: {
		onComponentMismatch() {
			throwError('Blade', 'Only OButtons are allowed in the actions slot.');
		},

		validateNodes(buttons) {
			assert.error(
				buttons.length <= 2,
				'Blade', 'No more than two OButtons allowed in the actions slot.',
			);
		},
	},
};
</script>

<style module="$s">
.Actions {
	display: flex;
}
</style>
