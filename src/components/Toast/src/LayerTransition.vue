<template>
	<transition-group
		:enter-active-class="$s.transitioning"
		:leave-active-class="$s.transitioning"
		tag="div"
		@before-enter="beforeEnter"
		@enter="enter"
		@before-leave="beforeLeave"
		@leave="leave"
	>
		<slot />
	</transition-group>
</template>
<script>
export default {
	methods: {
		touchStyle(el, prop) {
			const styles = getComputedStyle(el);
			return styles[prop];
		},

		beforeEnter(el) {
			Object.assign(el.style, {
				marginBottom: `-${el.offsetHeight - 8}px`,
				opacity: '0',
			});

			this.touchStyle(el, 'marginBottom');
		},

		enter(el) {
			Object.assign(el.style, {
				marginBottom: null,
				opacity: null,
			});
		},

		beforeLeave(el) {
			el.style.maxHeight = `${el.offsetHeight}px`;

			this.touchStyle(el, 'maxHeight');
		},

		leave(el) {
			Object.assign(el.style, {
				maxHeight: '0',
				opacity: '0',
				marginTop: '0',
				paddingTop: '0',
				paddingBottom: '0',
			});
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.transitioning {
	transition:
		opacity 0.5s var(--transition-easing),
		max-height 0.5s var(--transition-easing),
		margin-top 0.5s var(--transition-easing),
		padding 0.5s var(--transition-easing),
		margin-bottom 0.5s var(--transition-easing);
}
</style>
