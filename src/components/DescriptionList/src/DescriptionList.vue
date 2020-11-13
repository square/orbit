<template>
	<dl :class="$s.List">
		<vnode-filter
			:enforce-component="ODescriptionListItem"
			remove-whitespace
			@component-mismatch="onComponentMismatch"
		>
			<slot />
		</vnode-filter>
	</dl>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import ODescriptionListItem from './DescriptionListItem.vue';

export default {
	name: 'ODescriptionList',

	components: {
		VnodeFilter,
	},

	data() {
		return {
			ODescriptionListItem,
		};
	},

	methods: {
		onComponentMismatch() {
			throwError('DescriptionList', 'You can only use the DescriptionListItem component inside DescriptionList');
		},
	},
};
</script>

<style module="$s">
.List {
	margin: 0;
}
</style>
