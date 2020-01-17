<script>
export default {
	functional: true,
	render: (h, { $s, data }) => (<div class={$s.BoxCheck} {...data} />),
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--checkbox-check-transform: translateX(-50%) translateY(-50%) rotate(-45deg);
}

.BoxCheck {
	position: relative;
	top: 45%;
	left: 50%;
	width: 9px;
	height: 5px;
	transform: var(--checkbox-check-transform) scale(1);
	transform-origin: 50% 50%;
	transition: transform var(--transition-base);

	&::before,
	&::after {
		display: block;
		position: absolute;
		width: 0%;
		height: 0%;
		transition:
			height var(--transition-base),
			width var(--transition-base),
			background-color var(--transition-base);
		content: "";
	}

	&::before {
		left: 0;
		width: 2px;
	}

	&::after {
		bottom: 0;
		height: 2px;
	}
}
</style>
