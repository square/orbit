<template>
	<o-input
		ref="input"
		v-model="searchVal"
		:class="$s.SearchInput"
		:placeholder="placeholder"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<o-icon
			slot="prefix"
			:class="$s.SearchIcon"
			name="search"
		/>
		<template slot="suffix">
			<fade-transition mode="out-in">
				<o-loading
					v-if="loading"
					:class="$s.Icon"
					variant="spinner"
				/>
				<o-icon
					v-else-if="showClear"
					:class="$s.Icon"
					name="circle-x"
					@click="onClear"
				/>
			</fade-transition>
		</template>
	</o-input>
</template>

<script>
import { OInput } from '@square/orbit/components/Input';
import { OIcon } from '@square/orbit/components/Icon';
import { OLoading } from '@square/orbit/components/Loading';
import FadeTransition from '@square/orbit/transitions/FadeTransition.vue';

export default {
	name: 'OSearch',

	components: {
		OInput,
		OIcon,
		OLoading,
		FadeTransition,
	},

	inheritAttrs: false,

	model: {
		event: 'search:update',
	},

	props: {
		value: {
			type: String,
			default: undefined,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: undefined,
		},
	},

	computed: {
		searchVal: {
			get() {
				return this.value;
			},
			set(newVal) {
				this.$emit('search:update', newVal);
			},
		},

		showClear() {
			return !!this.searchVal;
		},
	},

	methods: {
		onClear() {
			this.searchVal = '';
			this.$refs.input.focus();
			this.$emit('search:clear');
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars-form.css";

.Icon {
	color: var(--form-control-icon-color);
}

.SearchInput input {
	/*
		In IE/Edge there is an additional X icon when there's a value in
		the input. This removes that X icon, where `display: none;` may
		introduce possible padding issues. See:
		https://stackoverflow.com/questions/14007655/remove-ie10s-clear-field-x-button-on-certain-inputs
	*/
	& input::-ms-clear {
		width: 0;
		height: 0;
	}
}
</style>
