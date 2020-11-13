<template>
	<main
		:class="[
			$s.LayoutContent,
			{
				[$s['adjacent-to-header']]: layout.header,
				[$s.flush]: flush,
			},
		]"
		v-on="$listeners"
	>
		<slot />
	</main>
</template>

<script>
import Key from './Key';

export default {
	name: 'OLayoutContent',

	inject: {
		layout: Key,
	},

	props: {
		flush: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.LayoutContent {
	composes: pad-overflow-bottom from "@square/orbit/styles/util.css";
	flex: auto;

	/* This is overridden in certain components such as Sheet, please check
	* other components when changing the specificity of this selector.
	*/
	&.adjacent-to-header {
		padding-top: var(--space);
	}

	&.flush {
		padding: 0;
	}
}
</style>
