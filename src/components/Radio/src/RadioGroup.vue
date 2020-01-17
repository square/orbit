<template>
	<div :class="$s.RadioGroup">
		<vnode-filter
			:enforce-component="ORadio"
			remove-whitespace
			@component-mismatch="componentMismatch"
		>
			<slot />
		</vnode-filter>
	</div>
</template>

<script>
import { FormItemKey } from '@square/orbit/components/Form';
import { throwError } from '@square/orbit/utils/debug';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import Key from './Key';
import ORadio from './Radio.vue';

export default {
	name: 'ORadioGroup',

	components: {
		VnodeFilter,
	},

	model: {
		prop: 'value',
		event: 'radio-group:update',
	},

	props: {
		value: {
			type: null,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		const vm = this;
		return {
			ORadio,
			state: {
				get value() {
					return vm.value;
				},
				set value(newVal) {
					vm.$emit('radio-group:update', newVal);
				},
				get disabled() {
					return vm.disabled;
				},
				radioClass: this.$s.Radio,
			},
		};
	},

	provide() {
		return {
			[Key]: this.state,
		};
	},

	inject: {
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	created() {
		if (this.formItem) {
			this.formItem.addUnwrappedChild();
		}
	},

	destroyed() {
		if (this.formItem) {
			this.formItem.removeUnwrappedChild();
		}
	},

	methods: {
		componentMismatch() {
			throwError('RadioGroup', 'You can only use the Radio component within RadioGroup.');
		},
	},
};
</script>

<style module="$s">
.RadioGroup {
	display: flex;
	flex-direction: column;

	& > .Radio {
		margin-top: 8px;
	}

	& > .Radio:first-child {
		margin-top: 0;
	}
}
</style>
