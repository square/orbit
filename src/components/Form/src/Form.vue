<template>
	<form
		v-bind="$attrs"
		v-on="$listeners"
	>
		<slot />
	</form>
</template>

<script>


export default {
	name: 'OForm',
};
</script>
