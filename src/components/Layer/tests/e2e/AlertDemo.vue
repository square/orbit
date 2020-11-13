<template>
	<o-alert title="My Alert">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p>

		<template
			slot="actions"
			slot-scope="alert"
		>
			<o-button @click="alert.close()">
				Cancel
			</o-button>
			<o-button
				variant="primary"
				@click="clickSave(alert.close)"
			>
				Save
			</o-button>
		</template>
	</o-alert>
</template>

<script>
import { OAlert } from '@square/orbit/components/Alert';
import { OButton } from '@square/orbit/components/Button';

const AlertDemo = {

	components: {
		OAlert,
		OButton,
	},

	props: {
		title: String,
	},

	methods: {
		clickSave(closeAlert) {
			// Some save logic

			closeAlert();
		},
	},
};

export default AlertDemo;
</script>
