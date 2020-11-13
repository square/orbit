<template>
	<hr
		:class="[
			$s.Line,
			$s[`theme_${theme}`],
		]"
		:style="spacingStyle"
	>
</template>

<script>
export default {
	name: 'ODivider',

	props: {
		spacing: {
			type: Number,
			default: 16,
			validator: (spacingVal) => [0, 4, 8, 16, 24, 32, 40, 48, 64, 128].includes(spacingVal),
		},
		theme: {
			type: String,
			default: 'dark',
			validator: (themeVal) => ['light', 'dark', 'transparent'].includes(themeVal),
		},
	},

	computed: {
		spacingStyle() {
			return {
				marginTop: `${this.spacing}px`,
				marginBottom: `${this.spacing}px`,
			};
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--divider-border-color-light: color(var(--color-white) a(0.1));
}

.Line {
	/* Width needed for display flex parent bug:
	stackoverflow.com/questions/34365271/hr-inside-container-with-display-flex-become-corrupted */
	width: 100%;
	height: 1px;
	border: none;
}

/* Divider Themes
-------------------------------------- */

.theme_light {
	background-color: var(--divider-border-color-light);
}

.theme_dark {
	background-color: var(--divider-border-color);
}

.theme_transparent {
	background-color: transparent;
}
</style>
