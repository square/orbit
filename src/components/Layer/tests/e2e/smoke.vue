<template>
	<div class="container">
		<o-button @click="openSheet">
			Open Sheet With Layers
		</o-button>
		<o-button
			v-for="(example, index) in autoCloseExamples"
			:key="index"
			@click="openAndClose(example.layer, example.component)"
		>
			Open and auto-close {{ example.component.name }} after 1 second
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { SheetLayer } from '@square/orbit/components/Sheet';
import { BladeLayerKey } from '@square/orbit/components/Blade';
import { ModalLayer } from '@square/orbit/components/Modal';
import MySheet from './MySheet.vue';
import SimpleSheet from './SimpleSheet.vue';
import SheetWithGuard from './SheetWithGuard.vue';
import SimpleBlade from './SimpleBlade.vue';
import SimpleModal from './SimpleModal.vue';
import ModalWithGuard from './ModalWithGuard.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		sheetLayer: SheetLayer,
		bladeLayer: BladeLayerKey,
		modalLayer: ModalLayer,
	},

	data() {
		return {
			autoCloseExamples: [
				{
					layer: this.sheetLayer,
					component: SimpleSheet,
				},
				{
					layer: this.sheetLayer,
					component: SheetWithGuard,
				},
				{
					layer: this.modalLayer,
					component: SimpleModal,
				},
				{
					layer: this.modalLayer,
					component: ModalWithGuard,
				},
				{
					layer: this.bladeLayer,
					component: SimpleBlade,
				},
			],
		};
	},

	methods: {
		openSheet() {
			this.sheetLayer.open(
				MySheet,
				{
					on: {
						close: (exitVal) => {
							this.exitVal = exitVal;
						},
					},
				},
			);
		},
		openAndClose(layer, component) {
			const args = [
				component,
				{
					on: {
						close(exitVal) {
							// eslint-disable-next-line no-console
							console.log(`${component.name}'s close handler called with: ${exitVal}`);
						},
					},
				},
			];

			let finalArgs = null;

			// combine args into render function for bladeLayer
			if (layer === this.bladeLayer) {
				finalArgs = [(h) => h(args[0], args[1])];
			} else {
				finalArgs = args;
			}

			const layerInst = layer.open(...finalArgs);

			setTimeout(() => {
				const guardPromise = layerInst.close('AUTO CLOSE AFTER TIMEOUT');

				// double-check that this variable is actually a promise,
				// since BladeLayer doesn't return a promise like Layer
				if (!guardPromise.then) {
					return;
				}

				// note: async/await with try/catch doesn't work here for whatever reason
				// in Orbit v3.x probs because we support IE11 and use some polyfill runtime for
				// async/await support that seems to have some edge cases
				guardPromise
					.then((resolvedVal) => {
						// eslint-disable-next-line no-console
						console.log(`${component.name}'s close promise resolved with: ${resolvedVal}`);
					})
					.catch((rejectedVal) => {
						// eslint-disable-next-line no-console
						console.log(`${component.name}'s close promise rejected with: ${rejectedVal}`);
					});
			}, 1000);
		},
	},
};
</script>

<style scoped>
.container > div {
	display: block;
	margin-bottom: 16px;
}
</style>
