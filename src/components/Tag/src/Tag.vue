<template>
	<div
		:class="[
			$s.Tag,
			$s[`type_${type}`],
		]"
	>
		<slot />
	</div>
</template>

<script>


export default {
	name: 'OTag',

	props: {
		type: {
			type: String,
			default: 'info',
			validator: type => ['info', 'success', 'warning', 'error'].includes(type),
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";

:root {
	--tag-padding-x: var(--space);
	--tag-padding-y: var(--space-half);
	--tag-padding: var(--tag-padding-y) var(--tag-padding-x);
	--tag-border-radius: var(--border-radius-base);
	--tag-font-size: var(--heading-t5-size);
}

.Tag {
	composes: font-base from "@square/orbit/styles/util.css";
	display: inline-block;
	padding: var(--tag-padding);
	border-radius: var(--tag-border-radius);
	font-size: var(--tag-font-size);
	font-weight: var(--font-weight-medium);
	letter-spacing: 0.5px;
	text-transform: uppercase;
}

/* Type
-------------------- */
.type_info {
	background-color: var(--info-bg-color);
}

.type_error {
	background-color: var(--danger-bg-color);
}

.type_success {
	background-color: var(--success-bg-color);
}

.type_warning {
	background-color: var(--warning-bg-color);
}
</style>
