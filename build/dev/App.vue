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

<style>
html, body {
	margin: 0;
}
</style>

<style module="$s">
.Layout {
	height: 100%;
}
</style>
