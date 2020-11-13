<template>
	<o-sheet
		title="Sheet Title"
		v-on="$listeners"
	>
		<template
			slot="actions"
			slot-scope="sheet"
		>
			<o-button
				variant="primary"
				@click="closeSheet(), sheet.close('save')"
			>
				Save
			</o-button>
		</template>
		<o-button @click="openBlade">
			Open Blade
		</o-button>
		<p>
			Ipsam perferendis nobis veniam. Rerum eos iure est aliquid id atque alias.
			Quo at praesentium unde qui est sequi ut non officiis. Officiis minima porro et.
		</p>
		<p>
			Non ut facere similique.
			Vero optio quibusdam voluptatibus ad aut occaecati libero occaecati et.
			Voluptatem rerum quos quaerat doloremque consequatur qui aspernatur minus voluptatem.
			Cumque voluptatem non quo molestias qui pariatur.
		</p>
		<p>
			Quia voluptates perspiciatis sed magni beatae incidunt aut eveniet consequatur.
			Consectetur consequatur voluptas illum eaque quis. Eligendi magni ea.
		</p>
	</o-sheet>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OSheet } from '@square/orbit/components/Sheet';
import { BladeLayerKey } from '@square/orbit/components/Blade';
import BladeDemo from './BladeDemo.vue';

export default {
	components: {
		OSheet,
		OButton,
	},

	inject: {
		bladeLayer: BladeLayerKey,
	},

	methods: {
		closeSheet() {
			// Do something
		},
		openBlade() {
			this.bladeLayer.open(
				(h) => h(BladeDemo),
			);
		},
	},
};
</script>
