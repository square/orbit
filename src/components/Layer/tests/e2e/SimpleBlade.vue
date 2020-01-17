<template>
	<o-blade
		ref="blade"
		title="title"
		v-on="$listeners"
	>
		Blade content
	</o-blade>
</template>
<script>
import { OBlade } from '@square/orbit/components/Blade';

export default {
	name: 'SimpleBlade',

	components: {
		OBlade,
	},
};
</script>
