<template functional>
	<transition
		:enter-active-class="$s.active"
		:leave-active-class="$s.active"
		:enter-class="$s.hidden"
		:leave-to-class="$s.hidden"
	>
		<slot />
	</transition>
</template>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.active {
	transition:
		opacity 0.4s var(--transition-easing),
		transform 0.4s var(--transition-easing);
}

.hidden {
	transform: translateX(100%);
	opacity: 0;
}
</style>
