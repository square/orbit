<template>
	<o-modal>
		<o-modal-pane
			backdrop
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
			This pane has a backdrop. {{ bio }}
		</o-modal-pane>
		<o-modal-pane :title="title">
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button @click="modal.forward">
					Next
				</o-button>
			</template>
			This pane has no backdrop
		</o-modal-pane>
		<o-modal-pane
			backdrop
			:title="title"
		>
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button @click="modal.forward">
					Done
				</o-button>
			</template>
			Look at that, another backdrop!
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
		bio: {
			type: String,
			default: null,
		},
	},
};
</script>
