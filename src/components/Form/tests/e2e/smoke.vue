<template>
	<o-form>
		<o-form-item
			label="form item label"
			errors="form item error string"
		>
			form item content
		</o-form-item>
		<o-form-item
			label="form item label"
			:errors="['form item error string in array']"
		>
			form item content
		</o-form-item>
		<o-form-item
			label="form item label"
			:errors="['multiple errors', 'in multiple strings', 'in array']"
		>
			form item content
		</o-form-item>
		<o-form-item
			label="form item label"
			:errors="true"
		>
			no error strings, but `errors` prop set to `true`
		</o-form-item>
		<o-form-item
			label="form item label"
			:errors="''"
		>
			error string is empty
		</o-form-item>
	</o-form>
</template>

<script>
import { OForm, OFormItem } from '@square/orbit/components/Form';

export default {
	components: {
		OForm,
		OFormItem,
	},
};
</script>
