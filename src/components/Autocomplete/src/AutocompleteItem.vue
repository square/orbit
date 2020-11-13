<template>
	<div
		:class="[
			$s.AutocompleteItem,
			{
				[$s.disabled]: disabled,
				[$s.focused]: isFocused,
			},
		]"
		v-bind="$attrs"
		@mousedown.prevent="selectOption"
		@mouseover="autocomplete.focusOption(option)"
		v-on="$listeners"
	>
		<slot />
	</div>
</template>

<script>
import AutocompleteKey from './AutocompleteKey';

export default {
	name: 'OAutocompleteItem',

	props: {
		option: {
			type: null,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	inject: {
		autocomplete: AutocompleteKey,
	},

	computed: {
		isFocused() {
			const { autocomplete, option } = this;
			const focused =	JSON.stringify(autocomplete.focusedOption) === JSON.stringify(option);
			if (focused) {
				this.positionFocused();
			}
			return focused;
		},
	},

	methods: {
		selectOption() {
			if (!this.disabled) {
				this.autocomplete.selectOption(this.option);
			}
		},
		positionFocused() {
			if (!this.$isServer && this.$el && this.$el.parentElement) {
				const { offsetTop, offsetHeight, parentElement } = this.$el;
				const minViewableScrollTop = parentElement.scrollTop;
				const maxViewableScrollTop = parentElement.scrollTop + parentElement.offsetHeight;
				if (offsetTop >= maxViewableScrollTop) {
					const itemPosition = (offsetTop - parentElement.offsetHeight) + offsetHeight;
					parentElement.scrollTop = itemPosition;
				} else if (offsetTop < minViewableScrollTop) {
					parentElement.scrollTop = offsetTop;
				}
			}
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.AutocompleteItem {
	padding: var(--space) var(--space-x2);
	border-top: var(--divider-border);
	color: var(--color-gray-60);
	cursor: pointer;

	&.focused {
		background-color: var(--color-gray-10);
		color: var(--brand-color);
		cursor: pointer;
	}

	&.disabled {
		background-color: var(--disabled-bg-color);
		color: var(--disabled-color);
		cursor: default;
	}
}
</style>
