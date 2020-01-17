<template>
	<o-sheet
		ref="sheet"
		title="Sheet w/Guard Title"
		:before-close="beforeClose"
		v-on="$listeners"
	>
		Sheet w/guard content
	</o-sheet>
</template>

<script>
import { OSheet } from '@square/orbit/components/Sheet';
import { AlertLayer } from '@square/orbit/components/Alert';
import AreYouSureAlert from './AreYouSureAlert.vue';

export default {
	name: 'SheetWithGuard',

	components: {
		OSheet,
	},

	inject: {
		alertLayer: AlertLayer,
	},

	methods: {
		beforeClose(exitVal, proceed, stop) {
			this.alertLayer.open(
				AreYouSureAlert,
				{
					on: {
						close: okToClose => (okToClose ? proceed('PROCEED FROM ALERT') : stop('STOP FROM ALERT')),
					},
				},
			);
		},
	},
};
</script>
