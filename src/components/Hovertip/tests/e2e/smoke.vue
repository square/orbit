<template>
	<div>
		<span
			v-hovertip="'Hello'"
			class="demo"
			tabindex="0"
		>
			Text
		</span>
		<div
			v-hovertip="'Hello'"
			class="demo"
			tabindex="0"
		>
			Text
		</div>
		<div
			v-hovertip="`Reactive ${count}`"
			class="demo"
			tabindex="0"
		>
			Reactive
		</div>
		<div
			v-hovertip="{ content: `Reactive ${count}`, delay: 500 }"
			class="demo"
			tabindex="0"
		>
			Reactive with delay
		</div>
	</div>
</template>

<script>
import { OHovertip } from '@square/orbit/components/Hovertip';

export default {
	directives: {
		Hovertip: OHovertip,
	},

	data() {
		return {
			count: 0,
		};
	},

	mounted() {
		setInterval(() => {
			this.count += 1;
		}, 1000);
	},
};
</script>


<style scoped>
.demo {
	margin: 16px;
	border: 1px solid #ccc;
}
</style>
