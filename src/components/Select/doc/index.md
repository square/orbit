# Select
A control that provides a menu of options.

## Examples
You can add options to select by passing in an array called `options` with each entry being an object with a `value` and a `label`. You can optionally create a `placeholder` value which will create a disabled option that is selected by default.

```vue
<template>
	<div>
		<o-select
			v-model="currentVal"
			:options="options"
			placeholder="Select an Option"
		/>
		<p>Selected option: {{ currentVal }}</p>
	</div>
</template>

<script>
import { OSelect } from '@square/orbit/components/Select';

export default {
	components: {
		OSelect,
	},
	data() {
		return {
			options: [
				{
					value: 1,
					label: 'Option 1',
				},
				{
					value: 2,
					label: 'Option 2',
				},
				{
					value: 3,
					label: 'Option 3',
				}, {
					value: 4,
					label: 'Option 4',
				},
				{
					value: 5,
					label: 'Option 5',
				},
			],
			currentVal: undefined,
		};
	},
};
</script>
```

### Options groups
Options can be grouped under a label by adding an "options" array to an option.

```vue
<template>
	<div>
		<o-select
			v-model="currentVal"
			:options="options"
			placeholder="Select an Option"
		/>
		<p>Selected option: {{ currentVal }}</p>
	</div>
</template>

<script>
import { OSelect } from '@square/orbit/components/Select';

export default {
	components: {
		OSelect,
	},
	data() {
		return {
			options: [
				{
					value: 0,
					label: 'Option 0',
				},
				{
					label: 'Group 1',
					options: [
						{
							value: 1,
							label: 'Option 1',
						},
						{
							value: 2,
							label: 'Option 2',
						},
						{
							value: 3,
							label: 'Option 3',
						},
					],
				},
				{
					label: 'Group 2',
					options: [
						{
							value: 4,
							label: 'Option 4',
						},
						{
							value: 5,
							label: 'Option 5',
						},
					],
				},
			],
			currentVal: undefined,
		};
	},
};
</script>
```

### Disabled options

You can disable an option with a by adding the `disabled` property to the option object, or adding the `disabled` attribute to the Select component.
```vue
<template>
	<o-select
		v-model="currentVal"
		:options="options"
		placeholder="Select an Option"
		disabled
	/>
</template>

<script>
import { OSelect } from '@square/orbit/components/Select';

export default {
	components: {
		OSelect,
	},
	data() {
		return {
			options: [
				{
					value: '1',
					label: 'Option 1',
				},
				{
					value: '2',
					label: 'Option 2',
					disabled: true,
				},
				{
					value: '3',
					label: 'Option 3',
				}, {
					value: '4',
					label: 'Option 4',
				},
				{
					value: '5',
					label: 'Option 5',
				},
			],
			currentVal: '3',
		};
	},
};
</script>
```

### Validation and Errors
Use the `o-form-item` component for validation and errors. See the docs for that [here](/components/Form).

## API

### Select attributes
The select component also supports [native attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select). `Multiple` is not supported however. Use the [autocomplete multiple select component](/components/autocomplete#multiple-select) instead.

| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `invalid` | `Boolean` | — | Adds invalid styles. |
| `disabled` | `Boolean` | - | Adds disabled styles and disabled attr. |
| `options` | `Array/Object` | — | The options for the select. |
| `value` (v-model) | - | — | The value of the option you would like to be selected. |
| `size` | `String`<br>`small, medium` | `medium` | Size of the select. |

### Select Options object properties
| Property | Type | Description |
| -------- | ---- | ----------- |
| `value` | - | the value of the option |
| `label` | `String` | the option text or group name |
| `options` | `Array` | An array of child options |
| `disabled` | `Boolean` | disables the option |
| `icon` | `String` | name of icon to use for optional icon prefix |

### Select Events
| Name | Arguments | Triggers when... |
| ---- | --------- | ---------------- |
| `select:update` | `newValue` | The selected value (v-model) of the select component changes. Returns the newly selected value. |
