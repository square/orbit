<template>
	<div
		:class="[
			$s.FormItem,
			{
				[$s.grouped]: isGrouped,
				[$s.flush]: isFlush,
			},
		]"
	>
		<component
			:is="labelUnwrapped ? 'div' : 'label'"
			:class="[$s.Label, { [$s.wrapped]: !unwrappedChildren }]"
		>
			<component
				:is="labelUnwrapped ? 'label' : 'span'"
				v-if="hasLabel || hasSecondaryLabel"
				:class="[
					$s.LabelText,
					{ [$s.error]: showErrors },
				]"
			>
				<span v-if="hasLabel"> <!-- Needed: wrapping for proper flex alignment -->
					<slot name="label">
						{{ label }}
					</slot>
				</span>
				<span
					v-if="hasSecondaryLabel"
					:class="$s.SecondaryLabel"
				>
					<slot name="secondary-label">
						{{ secondaryLabel }}
					</slot>
				</span>
			</component>

			<slot />
		</component>
		<div
			v-if="showErrors"
			:class="$s.ErrorNotice"
		>
			<slot name="errors">
				<o-notice
					v-for="(error, idx) in displayErrors"
					:key="idx"
					type="error"
					subtle
				>
					{{ error }}
				</o-notice>
			</slot>
		</div>
		<span
			v-if="hasSublabel"
			:class="$s.Sublabel"
		>
			<slot name="sublabel">
				{{ sublabel }}
			</slot>
		</span>
	</div>
</template>

<script>
import { showWarning } from '@square/orbit/utils/debug';
import { ONotice } from '@square/orbit/components/Notice';
import FormItemKey from './FormItemKey';
import FormItemGroupKey from './FormItemGroupKey';

export default {
	name: 'OFormItem',

	components: {
		ONotice,
	},

	props: {
		label: {
			type: String,
			default: undefined,
		},
		secondaryLabel: {
			type: String,
			default: undefined,
		},
		errors: {
			type: [Array, String, Boolean],
			default: undefined,
		},
		labelUnclickable: {
			type: Boolean,
			default: false,
		},
		flush: {
			type: Boolean,
			default: false,
		},
		sublabel: {
			type: String,
			default: undefined,
		},
	},

	provide() {
		return {
			[FormItemKey]: this.API,
		};
	},

	inject: {
		FormItemGroupAPI: {
			from: FormItemGroupKey,
			default: false,
		},
	},

	data() {
		return {
			API: {
				addUnwrappedChild: () => {
					this.unwrappedChildren += 1;
				},
				removeUnwrappedChild: () => {
					this.unwrappedChildren -= 1;
				},
				invalid: this.checkErrors(),
			},
			unwrappedChildren: 0,
		};
	},

	computed: {
		showErrors() {
			return this.checkErrors() || this.$slots.errors;
		},
		hasLabel() {
			return this.label || this.$slots.label;
		},
		hasSecondaryLabel() {
			return this.secondaryLabel || this.$slots['secondary-label'];
		},
		labelUnwrapped() {
			return this.unwrappedChildren || this.labelUnclickable;
		},
		isFlush() {
			return (this.FormItemGroupAPI && this.FormItemGroupAPI.flush) || this.flush;
		},
		isGrouped() {
			return !!this.FormItemGroupAPI;
		},
		hasSublabel() {
			return this.sublabel || this.$slots.sublabel;
		},
		displayErrors() {
			if (this.errors && typeof this.errors === 'string') {
				return [this.errors];
			}
			return this.errors;
		},
	},

	watch: {
		errors() {
			this.API.invalid = this.checkErrors();
		},
	},

	created() {
		if (this.label && this.$slots.label) {
			showWarning('FormItem', 'You are using the `label` prop and slot at the same time. Please use only one method to set the label.');
		}
	},

	methods: {
		checkErrors() {
			if (Array.isArray(this.errors)) {
				return this.errors.length > 0;
			}

			return this.errors;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

:root {
	--form-label-font-size: 14px;
	--form-required-label-color: var(--color-gray-50);
}

.FormItem {
	margin-bottom: var(--space-x3);
}

.FormItem.grouped {
	margin-bottom: var(--space);
}

.FormItem.flush {
	margin-bottom: 0;
}

.Label {
	display: block;

	&.wrapped {
		cursor: pointer;
	}
}

.LabelText {
	composes: font-base from "@square/orbit/styles/util.css";
	display: flex;
	justify-content: space-between;
	margin-bottom: var(--space);
	color: var(--form-label-color);
	font-size: var(--form-label-font-size);
	font-weight: var(--form-label-font-weight);
	line-height: var(--form-label-line-height);

	&.error {
		color: var(--danger-color);
	}
}

/* Modifiers ---------------------------------------------------------------- */
.SecondaryLabel {
	color: var(--form-required-label-color);
	font-weight: var(--font-weight-regular);
}

.ErrorNotice:not(:empty) {
	margin-top: var(--space);
}

.Sublabel {
	composes: font-base from "@square/orbit/styles/util.css";
	display: block;
	margin-top: var(--space);
	color: var(--form-sublabel-color);
}
</style>
