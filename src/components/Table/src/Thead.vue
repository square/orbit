<template>
	<thead>
		<tr>
			<table-col
				v-if="!(typeof checked !== 'boolean')"
				key="check-column"
				:disabled="disabled"
				checkable
				align="center"
				@click.native="$emit('check', !checked)"
			>
				<o-checkbox
					:class="$s.Checkbox"
					:checked="checked"
					:disabled="disabled"
					@checkbox:update="$emit('check', $event)"
					@click.native.stop
				/>
			</table-col>
			<slot />
		</tr>
	</thead>
</template>

<script>
import { OCheckbox } from '@square/orbit/components/Checkbox';
import TableCol from './TableCol.vue';

export default {
	name: 'OThead',

	components: {
		TableCol,
		OCheckbox,
	},

	props: {
		checked: {
			type: null,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style module="$s">
/* Overide orbit setting the height of checkbox inner element ControlContainer to 24px */
.Checkbox * {
	max-height: 18px;
}
</style>
