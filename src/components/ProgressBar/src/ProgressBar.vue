<template>
	<div :class="$s.ProgressBar">
		<div :class="$s.Bar">
			<div
				:class="[
					$s.Fill,
					$s[`theme_${theme}`]
				]"
				:style="{ width: (progress * 100) + '%' }"
			/>
		</div>

		<div
			v-if="$slots.default"
			:class="$s.Slot"
		>
			<slot />
		</div>
	</div>
</template>

<script>

export default {

	name: 'OProgressBar',

	props: {
		progress: {
			type: Number,
			default: 0,
			validator: (n) => n >= 0 && n <= 1,
		},
		theme: {
			type: String,
			default: 'primary',
			validator: (val) => ['primary', 'success'].includes(val),
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.Bar {
	height: 4px;
	border-radius: 4px;
	background: var(--color-gray-30);
}

.Fill {
	min-width: 5%;
	height: 4px;
	transition: width 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
	border-radius: 4px;

	&.theme_primary {
		background: var(--brand-color);
	}

	&.theme_success {
		background: var(--success-color);
	}
}

.Slot {
	margin-top: var(--space);
	color: var(--disabled-color);
}
</style>
