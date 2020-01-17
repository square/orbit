<template>
	<o-modal
		ref="modal"
		:before-close="beforeClose"
		v-on="$listeners"
	>
		<o-modal-pane title="modal w/guard title">
			modal w/guard content
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OModal, OModalPane } from '@square/orbit/components/Modal';
import { AlertLayer } from '@square/orbit/components/Alert';
import AreYouSureAlert from './AreYouSureAlert.vue';

export default {
	name: 'ModalWithGuard',

	components: {
		OModal,
		OModalPane,
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
