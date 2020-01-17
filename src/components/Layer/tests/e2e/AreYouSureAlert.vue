<template>
	<o-alert
		title="Are you sure?"
		v-on="$listeners"
	>
		Are you sure you want to close?

		<template
			slot="actions"
			slot-scope="alert"
		>
			<o-button @click="alert.close(false)">
				Nah
			</o-button>
			<o-button
				variant="primary"
				@click="alert.close(true)"
			>
				Yeah
			</o-button>
		</template>
	</o-alert>
</template>

<script>
import { OAlert } from '@square/orbit/components/Alert';
import { OButton } from '@square/orbit/components/Button';

export default {
	name: 'AreYouSureAlert',

	components: {
		OAlert,
		OButton,
	},
};
</script>
