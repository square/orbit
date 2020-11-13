<template>
	<o-modal :backdrop="hasBackdrop">
		<o-modal-pane :title="title">
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button @click="modal.forward">
					Next
				</o-button>
			</template>
			This modal has a backdrop on all panes.
		</o-modal-pane>
		<o-modal-pane
			:backdrop="false"
			:title="title"
		>
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button @click="modal.forward">
					Next
				</o-button>
			</template>
			This pane has a backdrop, even though the modal pane is trying to override it.
			(Current functionality)
		</o-modal-pane>
		<o-modal-pane :title="title">
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button @click="modal.forward">
					Done
				</o-button>
			</template>
			This pane has a backdrop too, but you can toggle it off and on to check if it's reactive.
			<o-button @click="hasBackdrop = !hasBackdrop">
				Toggle backdrop
			</o-button>
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OModal, OModalPane } from '@square/orbit/components/Modal';

export default {
	components: {
		OButton,
		OModal,
		OModalPane,
	},
	props: {
		title: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			hasBackdrop: true,
		};
	},
};
</script>
