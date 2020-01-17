<template>
	<div>
		<vnode-filter
			:enforce-component="ChecklistItem"
			remove-whitespace
			@componentMismatch="componentMismatch"
		>
			<slot />
		</vnode-filter>
	</div>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import ChecklistItem from './ChecklistItem.vue';


export default {
	name: 'OChecklist',

	components: {
		VnodeFilter,
	},

	data() {
		return {
			ChecklistItem,
		};
	},

	methods: {
		componentMismatch() {
			throwError('Checklist', 'You can only use the ChecklistItem component within Checklist.');
		},
	},
};
</script>
