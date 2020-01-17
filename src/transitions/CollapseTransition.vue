<template>
	<transition
		v-bind="$attrs"

		:enter-active-class="$s.transitioning"
		:leave-active-class="$s.transitioning"

		@before-enter="zeroHeight"
		@enter="setContentHeight"
		@after-enter="removeHeight"

		@before-leave="setContentHeight"
		@leave="onLeave"
		@after-leave="removeHeight"
	>
		<slot />
	</transition>
</template>

<script>
export default {
	methods: {
		zeroHeight(el) {
			Object.assign(el.style, {
				height: '0px',
				paddingTop: '0px',
				paddingBottom: '0px',
			});
		},

		removeHeight(el) {
			el.style.height = 'auto';
		},

		setContentHeight(el) {
			const newHeight = this.$el ? this.$el.scrollHeight : 0;
			Object.assign(el.style, {
				height: `${newHeight}px`,
				paddingTop: null,
				paddingBottom: null,
			});
		},

		onLeave(el) {
			this.setContentHeight(el);
			this.zeroHeight(el);
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.transitioning {
	transition:
		height var(--transition-base),
		padding-top var(--transition-base),
		padding-bottom var(--transition-base);
	overflow: hidden;
}
</style>
