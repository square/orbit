<template>
	<o-button @click="openSheet">
		Open Sheet
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { SheetLayer } from '@square/orbit/components/Sheet';
import SmokeSheet from './smoke-sheet.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		sheetLayer: SheetLayer,
	},

	data() {
		return {
			exitVal: undefined,
		};
	},

	methods: {
		openSheet() {
			this.sheetLayer.open(SmokeSheet);
		},
	},
};
</script>
