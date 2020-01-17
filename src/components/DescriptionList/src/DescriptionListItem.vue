<template>
	<div :class="$s.Item">
		<dt :class="$s.Term">
			<slot name="term">
				{{ term }}
			</slot>
		</dt>
		<dd :class="$s.Description">
			<slot name="description">
				{{ description }}
			</slot>
		</dd>
	</div>
</template>

<script>
export default {
	name: 'ODescriptionListItem',
	props: {
		term: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";

.Item {
	margin-bottom: var(--space-x2);

	@media (--for-tablet-landscape-up) {
		display: flex;
		margin-bottom: 0;

		&:not(:first-child) {
			padding-top: var(--space-x2);
		}

		&:not(:last-child) {
			padding-bottom: var(--space-x2);
		}
	}

	& + .Item {
		@media (--for-tablet-landscape-up) {
			border-top: var(--divider-border);
		}
	}
}

.Term {
	composes: title-4 from "@square/orbit/styles/headings.css";
	margin-bottom: var(--space-half);

	@media (--for-tablet-landscape-up) {
		width: 220px;
		margin-bottom: 0;
		margin-right: var(--space-x2);
	}
}

.Description {
	composes: font-base from "@square/orbit/styles/util.css";
	margin: 0;
}
</style>
