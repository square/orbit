<template>
	<div>
		<o-button>Button</o-button>
		<o-button
			disabled
		>
			Disabled
		</o-button>
		<o-button variant="dark">
			Button
		</o-button>
		<o-button
			variant="dark"
			disabled
		>
			Disabled
		</o-button>
		<o-button variant="secondary">
			Secondary
		</o-button>
		<o-button
			variant="secondary"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
