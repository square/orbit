<script>
export default {
	name: 'SkeletonBlock',

	functional: true,

	props: {
		theme: {
			type: String,
			default: 'dark',
			validator: (value) => ['dark', 'light'].includes(value),
		},
	},

	render(h, { $s, props, data }) {
		return (
			<div
				class={[$s.SkeletonBlock, $s[`theme_${props.theme}`]]}
				{...data}
			>
			</div>
		);
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.SkeletonBlock {
	display: block;
	border-radius: var(--border-radius-base);
	animation: pulsing 1s ease-in-out infinite;
}

/* Theme
-------------------- */
.theme_dark {
	background: var(--color-gray-20);
}

.theme_light {
	background: var(--color-white);
}

@keyframes pulsing {
	0% { background-color: var(--color-gray-20); }
	45% { background-color: var(--color-gray-10); }
	90% { background-color: var(--color-gray-20); }
}
</style>
