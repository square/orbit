<template functional>
	<transition
		:enter-active-class="$s.fading"
		:leave-active-class="$s.fading"
		:enter-class="$s.transparent"
		:leave-to-class="$s.transparent"
		v-bind="data.attrs"
	>
		<slot />
	</transition>
</template>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.fading {
	transition: opacity 0.2s var(--transition-easing);
}

.transparent {
	opacity: 0;
}
</style>
