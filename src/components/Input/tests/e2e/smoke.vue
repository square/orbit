<template>
	<div>
		<o-input
			prefix="some.website/url/"
			placeholder="rest/of/address/here"
		/>
		<o-input
			prefix="some.website/url/"
			placeholder="rest/of/address/here"
			flush-prefix
		/>
	</div>
</template>

<script>
import { OInput } from '@square/orbit/components/Input';

export default {
	components: {
		OInput,
	},
	data() {
		return {
			inputVal: 'Hello World',
		};
	},
};
</script>

<style scoped>
input {
	margin-bottom: 16px;
}
</style>
