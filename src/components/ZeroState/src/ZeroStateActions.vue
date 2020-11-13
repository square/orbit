<template>
	<div :class="$s.Actions">
		<vnode-filter
			:enforce-component="OButton"
			remove-whitespace
			@componentMismatch="onComponentMismatch"
		>
			<spacer>
				<slot />
			</spacer>
		</vnode-filter>
	</div>
</template>
<script>
import { OButton } from '@square/orbit/components/Button';
import { throwError } from '@square/orbit/utils/debug';
import Spacer from '@square/orbit/utils/Spacer.vue';
import VnodeFilter from '@square/orbit/utils/v-node-filter';

export default {
	components: {
		VnodeFilter,
		Spacer,
	},

	data() {
		return {
			OButton,
		};
	},

	methods: {
		onComponentMismatch() {
			throwError('ZeroState', 'You can only put Button components in the actions slot.');
		},
	},
};
</script>
<style module="$s">
.Actions {
	white-space: nowrap;
}
</style>
