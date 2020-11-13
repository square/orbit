<template>
	<footer
		:class="[
			$s.LayoutFooter,
			{
				[$s.flush]: flush,
				[$s.raised]: raised,
			},
		]"
		v-on="$listeners"
	>
		<slot />
	</footer>
</template>

<script>

export default {
	name: 'OLayoutFooter',

	props: {
		flush: {
			type: Boolean,
			default: false,
		},
		raised: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--layout-header-shadow-height: 4px;
}

.LayoutFooter {
	position: relative;
	flex: 0 0 auto;
	padding: var(--space-x3);

	&::before {
		position: absolute;
		top: calc(var(--layout-header-shadow-height) * -1);
		left: 0;
		width: 100%;
		height: var(--layout-header-shadow-height);
		transition: opacity var(--transition-base);
		background-image: none;
		content: "";
		opacity: 0;
		pointer-events: none;
	}

	&.flush {
		padding: 0;
	}

	&.raised {
		&::before {
			background-image: linear-gradient(transparent, color(var(--color-black) a(0.2)));
			opacity: 1;
		}
	}

	@media (--for-tablet-portrait-up) {
		padding: var(--space-x4);
	}
}
</style>
