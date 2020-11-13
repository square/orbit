<template>
	<div>
		<o-button @click="openBackdropModal(true)">
			Open Backdrop ModalPane
		</o-button>
		<br>
		<o-button @click="openBackdropModal(false)">
			Open Backdrop Modal
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ModalLayer } from '@square/orbit/components/Modal';
import ModalPaneBackdropDemo from './ModalPaneBackdropDemo.vue';
import ModalBackdropDemo from './ModalBackdropDemo.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		modalLayer: ModalLayer,
	},

	methods: {
		openBackdropModal(isPaned) {
			if (isPaned) {
				this.modalLayer.open(
					ModalPaneBackdropDemo,
					{
						props: {
							title: 'ModalPane Backdrop',
							bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium provident repellendus tempore assumenda hic neque.',
						},
					},
				);
			} else {
				this.modalLayer.open(
					ModalBackdropDemo,
					{
						props: {
							title: 'Backdrop Modal',
						},
					},
				);
			}
		},
	},
};
</script>
