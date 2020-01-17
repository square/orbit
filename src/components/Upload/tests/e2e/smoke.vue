<template>
	<o-form>
		<o-form-item
			:errors="uploadErrors"
			label="Upload used inside Form with validation"
		>
			<o-upload
				label="drop or click to upload files"
				variant="drop"
				multiple
				@upload:change="onUpload"
			/>
		</o-form-item>
		<o-form-item
			:errors="['yolo', 'swag']"
			label="some form item label here"
		>
			<o-upload
				label="drop or click to upload files"
				multiple
				@upload:change="onUpload"
			/>
		</o-form-item>
		<o-form-item :errors="['yolo', 'swag']">
			<o-input v-model="inputString" />
		</o-form-item>
		<o-form-item
			:label="inputString"
			:errors="[inputString]"
		>
			<o-button>{{ inputString }}</o-button>
		</o-form-item>

		<br>
		<div v-if="files.length">
			<strong>Files selected</strong>
			<o-table :row-data="files">
				<o-table-col property="name">
					Name
				</o-table-col>
				<o-table-col property="type">
					Type
				</o-table-col>
				<o-table-col
					property="size"
					align="right"
				>
					Size (MBs)
				</o-table-col>
			</o-table>
		</div>
	</o-form>
</template>

<script>
import { OUpload } from '@square/orbit/components/Upload';
import { OButton } from '@square/orbit/components/Button';
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { OInput } from '@square/orbit/components/Input';
import { OTable, OTableCol } from '@square/orbit/components/Table';

const VALID_FILE_TYPES = ['image/png', 'application/pdf'];
const MAX_FILE_SIZE = 2 * 1000000; // 2 MB in # of bytes
const MAX_TOTAL_SIZE = 10 * 1000000; // 10 MB in # of bytes
const MAX_FILES = 5;

export default {
	components: {
		OUpload,
		OForm,
		OFormItem,
		OInput,
		OButton,
		OTable,
		OTableCol,
	},

	data() {
		return {
			files: [],
			uploadErrors: [],
			inputString: 'i am the button text',
		};
	},

	methods: {
		onUpload(files) {
			const uploadErrors = [];

			if (files.length > MAX_FILES) {
				uploadErrors.push(`Can't upload more than ${MAX_FILES} files at a time`);
			}

			if (!files.every(file => VALID_FILE_TYPES.includes(file.type))) {
				uploadErrors.push(`Can only upload these file types: ${VALID_FILE_TYPES.join(', ')}`);
			}

			if (!files.every(file => file.size <= MAX_FILE_SIZE)) {
				uploadErrors.push(`Every file must be less than ${MAX_FILE_SIZE / 1000000} MBs`);
			}

			if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_SIZE) {
				uploadErrors.push(`Total file size must be less than ${MAX_TOTAL_SIZE / 1000000} MBs`);
			}

			this.files = files.map(file => (
				{
					name: file.name,
					size: (file.size / 1000000).toFixed(1), // convert Number bytes to MBs string
					type: file.type,
				}
			));

			this.uploadErrors = uploadErrors;
		},
	},
};
</script>
