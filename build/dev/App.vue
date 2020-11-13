<template>
	<o-layout
		:class="$s.Layout"
		has-layers
	>
		<router-view name="header" />

		<o-layout-content>
			<router-view />
		</o-layout-content>
	</o-layout>
</template>

<script>
import { OLayout, OLayoutContent } from '@square/orbit/components/Layout';

export default {
	components: {
		OLayout,
		OLayoutContent,
	},
};
</script>

<style module="$s">
body {
	margin: 0;
}

.Layout {
	height: 100%;
}
</style>
