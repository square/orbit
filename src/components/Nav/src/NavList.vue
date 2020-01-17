<template functional>
	<nav>
		<ul
			:class="[
				$s.NavList,
				$s[`variant_${props.variant}`],
				{ [$s.horizontal]: props.horizontal },
				data.class,
			]"
		>
			<slot />
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'NavList',
	functional: true,
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--nav-horizontal-margin: calc(var(--space-x5) / 2);
}

.NavList {
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	list-style-type: none;

	& > * {
		display: block;
	}

	&.horizontal {
		flex-direction: row;
	}

	/* Hacky fix for menu's inside popovers (currently the only use case of menu) */
	&.variant_menu {
		margin: calc(var(--space-x2) * -1);
	}
}
</style>
