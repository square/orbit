<template>
	<o-sheet
		ref="sheet"
		title="Sheet Title"
		v-on="$listeners"
	>
		Sheet content
	</o-sheet>
</template>

<script>
import { OSheet } from '@square/orbit/components/Sheet';

export default {
	name: 'SimpleSheet',

	components: {
		OSheet,
	},
};
</script>
