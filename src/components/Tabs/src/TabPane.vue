<template>
	<div v-show="isActive">
		<slot />
	</div>
</template>
<script>
import { throwError } from '@square/orbit/utils/debug';
import TabKey from './TabKey';

export default {
	name: 'OTabPane',

	props: {
		label: {
			type: String,
			default: undefined,
		},
	},

	inject: {
		tabState: TabKey,
	},

	data() {
		return {
			data: {
				labelSlot: null,
			},
		};
	},

	computed: {
		isActive() {
			return (this.tabState.currentTabIdx === this.tabState.tabRegister.indexOf(this.data));
		},
	},

	created() {
		if (!this.tabState) {
			throwError('TabPane', 'Must be used inside of a Tab component');
		}
		this.updateLabelSlot();
		this.tabState.tabRegister.push(this.data);
	},

	updated() {
		// hook is run any time slot vnodes changes
		this.updateLabelSlot();
	},

	beforeDestroy() {
		this.tabState.tabRegister.splice(this.tabState.tabRegister.indexOf(this.data), 1);
	},

	methods: {
		updateLabelSlot() {
			this.data.labelSlot = this.$slots.label || this.label;
		},
	},
};
</script>
