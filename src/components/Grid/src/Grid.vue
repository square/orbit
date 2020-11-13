<template>
	<div>
		<div
			:class="[
				$s.Grid,
				$s[`align_${verticalAlign}`],
				$s[`gutter_${gutter}`],
			]"
		>
			<vnode-filter
				:enforce-component="GridItem"
				remove-whitespace
				@componentMismatch="onComponentMismatch"
				@completed="countGridItems"
			>
				<slot />
			</vnode-filter>
		</div>
	</div>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import VnodeFilter from '@square/orbit/utils/v-node-filter';
import GridItem from './GridItem.vue';
import Key from './Key';

export default {
	name: 'OGrid',

	components: {
		VnodeFilter,
	},

	props: {
		verticalAlign: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'middle', 'bottom'].includes(value),
		},
		gutter: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium'].includes(value),
		},
	},

	data() {
		const vm = this;
		return {
			GridItem,
			state: {
				numGridItems: 0,
				get gutter() {
					return vm.gutter;
				},
			},
		};
	},

	provide() {
		return {
			[Key]: this.state,
		};
	},

	methods: {
		countGridItems(vnodes) {
			this.state.numGridItems = vnodes.length;
		},

		onComponentMismatch() {
			throwError('Grid', 'Only GridItem\'s are allowed in a Grid\'s.');
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-grid.css";

.Grid {
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	height: 100%;

	/* Gutter */
	&.gutter_medium {
		margin: 0 calc(var(--grid-gutter) / -2) calc(var(--grid-gutter) * -1);
	}

	&.gutter_small {
		margin: 0 calc(var(--grid-gutter-small) / -2) calc(var(--grid-gutter-small) * -1);
	}

	/* Align */
	&.align_default {
		align-items: stretch;
	}

	&.align_middle {
		align-items: center;
	}

	&.align_bottom {
		align-items: flex-end;
	}

	@supports (display: grid) {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		flex-wrap: initial;

		&.gutter_medium,
		&.gutter_small {
			margin: initial;
		}

		&.gutter_medium {
			grid-gap: var(--grid-gutter);
		}

		&.gutter_small {
			grid-gap: var(--grid-gutter-small);
		}
	}
}
</style>
