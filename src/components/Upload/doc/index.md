# Upload

Let users upload files by clicking a button to pull up the native file chooser or by dragging and dropping files in to a drop zone.

The component does not have an opinion on how the files are processed or displayed after the upload is complete.

## Examples

### Upload Button

A button that opens up the native file chooser.

By default, one file can be selected at a time. To allow multiple files, add the `multiple` attribute.

```vue
<template>
	<div>
		<o-upload
			label="Upload a file..."
			@upload:change="onUpload"
		/>

		<br>
		<div v-if="file">
			<strong>File selected:</strong>
			{{ file.name }}
		</div>
	</div>
</template>

<script>
import { OUpload } from '@square/orbit/components/Upload';

export default {
	components: {
		OUpload,
	},

	data() {
		return {
			file: null,
		};
	},

	methods: {
		onUpload(files) {
			[this.file] = files;
		},
	},
};
</script>
```

### Upload Drop Zone

Let users upload files by dragging and dropping them into a drop zone. They can also chose files to upload by clicking anywhere in the drop zone to pull up the native file chooser.

If you have the space, use the drop zone instead of just the button.

```vue
<template>
	<div>
		<o-upload
			variant="drop"
			label="Drag files here or click to upload"
			drop-label="Drop files"
			multiple
			@upload:change="onUpload"
		/>

		<br>
		<div v-if="files && files.length > 0">
			<strong>Files selected:</strong>
		</div>
		<div
			v-for="(file, idx) in files"
			:key="idx"
		>
			{{ file.name }}
		</div>
	</div>
</template>
<script>
import { OUpload } from '@square/orbit/components/Upload';

export default {
	components: {
		OUpload,
	},

	data() {
		return {
			files: null,
		};
	},

	methods: {
		onUpload(files) {
			this.files = files;
		},
	},
};
</script>
```

### Upload Drop Zone with Custom Default Slot

Fancy Upload component with an illustration.

```vue
<template>
	<div>
		<o-upload
			variant="drop"
			multiple
			@upload:change="onUpload"
		>
			<template
				slot-scope="{ isDraggingOver }"
			>
				<img :src="imagesUrl">
				<o-icon
					class="dropIcon"
					name="upload"
				/>
				<span class="mainText">
					{{ !isDraggingOver ? 'Drag files here or click to upload' : 'Drop files' }}
				</span>
				<span class="subText">
					Formats: JPG & PNG
				</span>
			</template>
		</o-upload>

		<br>
		<div v-if="files && files.length > 0">
			<strong>Files selected:</strong>
		</div>
		<div
			v-for="(file, idx) in files"
			:key="idx"
		>
			{{ file.name }}
		</div>
	</div>
</template>
<script>
import { OUpload } from '@square/orbit/components/Upload';
import { OIcon } from '@square/orbit/components/Icon';
import imagesUrl from './images.svg';

export default {
	components: {
		OUpload,
		OIcon,
	},

	data() {
		return {
			files: null,
			imagesUrl,
		};
	},

	methods: {
		onUpload(files) {
			this.files = files;
		},
	},
};
</script>

<style scoped>
:root {
	--brand-color: #3374ff;
}
.mainText {
	color: var(--brand-color);
}
.subText {
	font-weight: 400;
}
.dropIcon {
	margin-bottom: 8px;
	color: var(--brand-color);
}
</style>
```

Compact mini-Upload component.

```vue
<template>
	<div>
		<o-upload
			class="upload"
			variant="drop"
			multiple
			@upload:change="onUpload"
		>
			<template
				slot-scope="{ isDraggingOver }"
			>
				<div class="contentContainer">
					<o-icon
						v-if="!isDraggingOver"
						class="dropIcon"
						name="upload"
					/>
					<span
						v-else
						class="mainText"
					>
						Drop files
					</span>
				</div>
			</template>
		</o-upload>

		<br>
		<div v-if="files && files.length > 0">
			<strong>Files selected:</strong>
		</div>
		<div
			v-for="(file, idx) in files"
			:key="idx"
		>
			{{ file.name }}
		</div>
	</div>
</template>
<script>
import { OUpload } from '@square/orbit/components/Upload';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OUpload,
		OIcon,
	},

	data() {
		return {
			files: null,
		};
	},

	methods: {
		onUpload(files) {
			this.files = files;
		},
	},
};
</script>

<style scoped>
:root {
	--brand-color: #3374ff;
}
.contentContainer {
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.upload {
	width: 120px;
}
.mainText {
	color: var(--brand-color);
}
.subText {
	font-weight: 400;
}
.dropIcon {
	color: var(--brand-color);
}
</style>
```

### Validation and Errors
Use the `o-form-item` component for validation and errors. See detailed docs for that [here](/components/Form).

```vue
<template>
	<o-form>
		<o-form-item
			:errors="uploadErrors"
			label="Upload used inside Form with validation"
		>
			<o-upload
				label="Drag files here or click to upload"
				drop-label="Drop files"
				variant="drop"
				multiple
				@upload:change="onUpload"
			/>
		</o-form-item>

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
import { OForm, OFormItem } from '@square/orbit/components/Form';
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
		OTable,
		OTableCol,
	},

	data() {
		return {
			files: [],
			uploadErrors: [],
		};
	},

	methods: {
		onUpload(files) {
			const uploadErrors = [];

			if (files.length > MAX_FILES) {
				uploadErrors.push(`Can't upload more than ${MAX_FILES} files at a time`);
			}

			if (!files.every((file) => VALID_FILE_TYPES.includes(file.type))) {
				uploadErrors.push(`Can only upload these file types: ${VALID_FILE_TYPES.join(', ')}`);
			}

			if (!files.every((file) => file.size <= MAX_FILE_SIZE)) {
				uploadErrors.push(`Every file must be less than ${MAX_FILE_SIZE / 1000000} MBs`);
			}

			if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_SIZE) {
				uploadErrors.push(`Total file size must be less than ${MAX_TOTAL_SIZE / 1000000} MBs`);
			}

			this.files = files.map((file) => (
				{
					name: file.name,
					size: (file.size / 1000000).toFixed(1), // convert # of bytes to MBs string
					type: file.type,
				}
			));

			this.uploadErrors = uploadErrors;
		},
	},
};
</script>

```

## Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `label` | `String` | - | Label for the upload button |
| `multiple` | `Boolean` | `false` | `html default` allow for multiple uploads. See [multiple attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-multiple). |
| `accept` | `String` | - | Accepted formats of the component. See [accepted formats](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept). |
| `variant` | `String` <br> `button`, `drop` | `button` | The `drop` variant displays a drop target that lets users drag'n'drop files from their desktop. Clicking to select files for upload will continue to work. |
| `drop-label` | `String` | - | When using the `variant="drop"`, this is the label shown when the user drags a file over the drop target. |
| `disabled` | `Boolean` | `false` | Disable the component; both clicking and file dropping.

## Slots
| Name | Slot Scope | Description |
| - | - | - |
| `default` | `{ isDraggingOver: Boolean }` | Default content inside of the `drop` variant of the Upload component. If this is used the `label` and `drop-label` props are ignored. |

## Events
| Name | Arguments | Triggers when... |
| ---- | ----| ----|
| `upload:change` | `files File[]` | Array of selected file(s). |
| `upload:error` | `unacceptedFiles File[]` | Array of unaccepted file(s). |
