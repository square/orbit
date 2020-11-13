<template>
	<div>
		<o-zero-state>
			<template slot="actions">
				<o-button v-if="visible">
					Visible
				</o-button>
			</template>
			Testing the reactivity of v-ifed buttons that are added later
			<button @click="visible = !visible">
				test
			</button>
		</o-zero-state>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OZeroState } from '@square/orbit/components/ZeroState';

export default {
	components: {
		OButton,
		OZeroState,
	},

	data() {
		return {
			visible: false,
		};
	},
};
</script>
