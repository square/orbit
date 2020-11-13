<template>
	<nav-list
		:variant="variant"
		:horizontal="horizontal"
	>
		<slot />
	</nav-list>
</template>

<script>
import { throwError } from '@square/orbit/utils/debug';
import NavList from './NavList.vue';
import Key from './Key';

export default {
	name: 'ONav',

	components: {
		NavList,
	},

	props: {
		horizontal: {
			type: Boolean,
			default: false,
		},
		hasIndicator: {
			type: Boolean,
			default: false,
		},
		theme: {
			default: 'normal',
			validator: (value) => ['normal', 'dark', 'light'].includes(value),
		},
		variant: {
			default: 'primary',
			validator: (value) => ['primary', 'secondary', 'menu'].includes(value),
		},
	},

	data() {
		const vm = this;
		return {
			state: {
				get horizontal() {
					vm.validateProps();
					return vm.horizontal;
				},
				get theme() {
					return vm.theme;
				},
				get variant() {
					vm.validateProps();
					return vm.variant;
				},
				get hasIndicator() {
					return vm.hasIndicator;
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
		validateProps() {
			if (this.variant === 'menu' && this.horizontal) {
				throwError('Nav', 'A nav with variant="menu" can\'t be horizontal.');
			}
		},
	},
};
</script>
