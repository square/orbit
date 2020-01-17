<script>
// NoClickFocus only allows the focus outline to be applied via keyboard-access
// Explanation: https://stackoverflow.com/a/45191208
// Note: the Parent must have `outline: none` applied

export default {
	name: 'NoClickFocus',
	functional: true,
	render: (h, { $s, data, children }) => (
		<div
			class={$s.NoClickFocus}
			tabindex="-1"
			{...data}
		>
			{children}
		</div>
	),
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.NoClickFocus {
	outline: none;
}

*:focus > .NoClickFocus {
	box-shadow: var(--focus-box-shadow), var(--focus-box-shadow-inset);
}
</style>
