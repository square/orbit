<template>
	<div
		@drag.stop.prevent
		@dragstart.stop.prevent
		@dragend.stop.prevent
		@dragover.stop.prevent
		@dragenter.stop.prevent
		@dragleave.stop.prevent
		@drop.stop.prevent
	>
		<input
			ref="input"
			:class="$s.HiddenInput"
			:disabled="disabled"
			v-bind="$attrs"
			type="file"
			@change="onFileSelection"
		>
		<div
			v-if="isDropTarget"
			:class="[
				$s.Drop,
				{
					[$s.dragging]: isDraggingOnTarget,
					[$s.disabled]: disabled,
					[$s.invalid]: formItem && formItem.invalid,
				},
			]"
			@click="promptFileSelection"
			@dragenter="onDragEnter"
			@dragleave="onDragLeave"
			@drop="onDrop"
		>
			<slot
				:isDraggingOver="isDraggingOver"
				name="default"
			>
				<o-icon
					:class="$s.DropIcon"
					name="upload"
				/>
				{{ isDraggingOver ? dropLabel : label }}
			</slot>
		</div>
		<o-button
			v-else
			:disabled="disabled"
			@click="promptFileSelection"
		>
			<o-icon name="upload" />
			{{ label }}
		</o-button>
	</div>
</template>

<script>
import { FormItemKey } from '@square/orbit/components/Form';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';
import { assert } from '@square/orbit/utils/debug';

export default {
	name: 'OUpload',

	components: {
		OButton,
		OIcon,
	},

	inheritAttrs: false,

	inject: {
		formItem: {
			from: FormItemKey,
			default: undefined,
		},
	},

	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		dropLabel: {
			type: String,
			default: null,
		},
		label: {
			type: String,
			default: null,
		},
		variant: {
			type: String,
			default: 'button',
			validator: val => ['button', 'drop'].includes(val),
		},
	},

	data() {
		return {
			/*
			`dragEnterCounter`
			---
			The `dragleave` event listener is attached to the drop variant's root element. The challenge
			is that the `dragleave` event fires not only when the user leaves the bounds of this root
			element, but also whenever a child element inside is hovered.

			To track when the root element is dragged off of, we are using a counter to track each
			internal dragenter and dragleave. Once the user leaves the root element, the counter will
			hit 0.
			*/
			dragEnterCounter: 0,
		};
	},

	computed: {
		isDropTarget() {
			return this.variant === 'drop';
		},
		isDraggingOnTarget() {
			return (this.dragEnterCounter > 0);
		},
		isDraggingOver() {
			return this.isDraggingOnTarget && !this.disabled;
		},
	},

	created() {
		if (this.formItem) {
			this.formItem.addUnwrappedChild();
		}
	},

	mounted() {
		const hasDefaultSlot = this.$slots.default || this.$scopedSlots.default;
		assert.warn(!hasDefaultSlot || this.variant === 'drop', 'Upload', 'Upload default slot will only appear when used with the "drop" variant.');
		assert.warn(!hasDefaultSlot || (!this.label && !this.dropLabel), 'Upload', 'label and drop-label props are ignored if also using the default slot.');
	},

	destroyed() {
		if (this.formItem) {
			this.formItem.removeUnwrappedChild();
		}
	},

	methods: {
		promptFileSelection() {
			this.$refs.input.click();
		},

		onDragEnter() {
			this.dragEnterCounter += 1;
		},

		onDragLeave() {
			this.dragEnterCounter -= 1;
		},

		onDrop(event) {
			if (this.disabled) { return; }

			this.dragEnterCounter = 0;

			const files = Array.from(event.dataTransfer.files);
			const unacceptedFiles = files.filter(file => !this.isValid(file));

			if (!unacceptedFiles.length) {
				this.$emit('upload:change', files);
			} else {
				this.$emit('upload:error', unacceptedFiles);
			}
		},

		onFileSelection() {
			this.$emit('upload:change', Array.from(this.$refs.input.files));
			this.resetInput();
		},

		resetInput() {
			const { input } = this.$refs;
			input.value = '';

			// Some browsers require the type to change to reset the value
			if (typeof navigator !== 'undefined' && !/safari/i.test(navigator.userAgent)) {
				input.type = '';
				input.type = 'file';
			}
		},

		// Validates https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept
		isValid(file) {
			const { accept } = this.$attrs;

			if (!accept) {
				return true;
			}

			const fileType = file.type;

			return accept.split(',').some((acceptedType) => {
				acceptedType = acceptedType.trim();

				// File extension
				if (acceptedType[0] === '.') {
					return file.name.endsWith(acceptedType);
				}

				// File MIME
				const baseMime = acceptedType.match(/(.+\/)\*$/);
				if (baseMime) {
					return fileType.startsWith(baseMime[1]);
				}

				return acceptedType === fileType;
			});
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-form.css";

.HiddenInput {
	position: absolute;
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	z-index: -1;
}

.Drop {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: var(--space-x3);
	transition:
		border var(--transition-base),
		background-color var(--transition-base);
	border: 2px dashed var(--form-border-color);
	border-radius: var(--border-radius-base);
	color: var(--form-label-color);
	font-weight: var(--font-weight-medium);
	text-align: center;
	user-select: none;

	&:hover:not(.disabled, .invalid),
	&.dragging:not(.disabled, .invalid) {
		border-color: var(--form-hover-border-color);
	}

	&:hover:not(.disabled),
	&.dragging:not(.disabled) {
		background-color: var(--hover-bg-color);
		cursor: pointer;
	}

	&.disabled {
		border-color: var(--disabled-border-color);
		background-color: var(--disabled-bg-color);
		color: var(--disabled-color);
	}

	&.invalid {
		border-color: var(--danger-color);
	}
}

.DropIcon {
	padding-bottom: var(--space);
}

.HiddenInput:active + .Drop {
	background-color: var(--active-bg-color);
}

.HiddenInput:focus + .Drop {
	border-color: var(--focus-border-color);
	box-shadow: var(--focus-box-shadow);
}
</style>
