<template>
	<div :class="$s.Loading">
		<svg
			:class="[
				$s.Svg,
				$s[`variant_${variant}`],
			]"
			viewBox="0 0 16 16"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				:class="[
					$s.Circle,
					$s[`variant_${variant}`],
				]"
				fill="none"
				stroke-linecap="round"
				cx="8"
				cy="8"
				r="7"
			/>
		</svg>
	</div>
</template>
<script>
export default {
	name: 'OLoading',

	props: {
		variant: {
			type: String,
			default: 'spinner-large',
			validator: (variant) => ['spinner-large', 'spinner'].includes(variant),
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--spinner-diameter: 16px;
	--spinner-lg-diameter: 64px;
	--offset: calc(3.145 * var(--spinner-diameter));
	--duration: 1.5s;
}

.Loading {
	display: flex;
	justify-content: center;
}

/* Spinner
---------------------------------------------- */
.Svg {
	animation: rotate var(--duration) linear infinite;

	&.variant_spinner {
		width: var(--spinner-diameter);
		height: var(--spinner-diameter);
	}

	&.variant_spinner-large {
		width: var(--spinner-lg-diameter);
		height: var(--spinner-lg-diameter);
	}
}

.Circle {
	stroke: currentColor;
	stroke-dasharray: var(--offset);
	transform-origin: center;
	animation: circle-line var(--duration) ease-in-out infinite;

	&.variant_spinner {
		stroke-width: 2px;
	}

	&.variant_spinner-large {
		stroke-width: 1px;
	}
}

@keyframes rotate {
	to { transform: rotate(270deg); }
}

@keyframes circle-line {
	0% {
		stroke-dashoffset: var(--offset);
	}

	50% {
		transform: rotate(135deg);
		stroke-dashoffset: calc(var(--offset) / 3);
	}

	100% {
		transform: rotate(450deg);
		stroke-dashoffset: var(--offset);
	}
}
</style>
