<template>
	<o-modal
		ref="modal"
		v-on="$listeners"
	>
		<o-modal-pane title="modal title">
			modal content
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OModal, OModalPane } from '@square/orbit/components/Modal';

export default {
	name: 'SimpleModal',

	components: {
		OModal,
		OModalPane,
	},
};
</script>
