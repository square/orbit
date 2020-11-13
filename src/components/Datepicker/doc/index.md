# Datepicker
The datepicker is used to select a single date. The date must be represented by a UNIX timestamp.

```vue
<template>
	<div>
		<o-form>
			<o-form-item label="Pick a date">
				<o-datepicker
					v-model="myDate"
					placeholder="Choose a date"
				/>
				<br>
				<div>
					<strong>Value</strong>
					{{ myDate }}
				</div>
			</o-form-item>
		</o-form>
	</div>
</template>

<script>
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { ODatepicker } from '@square/orbit/components/Datepicker';

export default {
	components: {
		OForm,
		OFormItem,
		ODatepicker,
	},

	data() {
		return {
			myDate: '',
		};
	},
};
</script>
```

## Range

```vue
<template>
	<o-form>
		<o-grid>
			<o-grid-item>
				<o-form-item label="Start date">
					<o-datepicker
						v-model="startDate"
						placeholder="Choose a start date"
					/>
					<br>
					<div>
						<strong>Value</strong>
						{{ startDate }}
					</div>
				</o-form-item>
			</o-grid-item>
			<o-grid-item>
				<o-form-item label="End date">
					<o-datepicker
						v-model="endDate"
						placeholder="Choose a end date"
						:min-date="startDate"
					/>
					<br>
					<div>
						<strong>Value</strong>
						{{ endDate }}
					</div>
				</o-form-item>
			</o-grid-item>
		</o-grid>
	</o-form>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { ODatepicker } from '@square/orbit/components/Datepicker';

export default {
	components: {
		OGrid,
		OGridItem,
		OForm,
		OFormItem,
		ODatepicker,
	},

	data() {
		return {
			startDate: '',
			endDate: '',
		};
	},
};
</script>
```


## Localization

```vue
<template>
	<o-form>
		<o-form-item label="Pick a locale">
			<o-select
				v-model="locale"
				:options="options"
				placeholder="Select an Option"
			/>
		</o-form-item>
		<o-form-item label="Localized Datepicker">
			<o-datepicker
				v-model="myDate"
				placeholder="Choose a date"
				:locale="locale"
			/>
			<br>
			<div>
				<strong>Value</strong>
				{{ myDate }}
			</div>
		</o-form-item>
	</o-form>
</template>

<script>
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { ODatepicker } from '@square/orbit/components/Datepicker';
import { OSelect } from '@square/orbit/components/Select';

export default {
	components: {
		OForm,
		OFormItem,
		ODatepicker,
		OSelect,
	},

	data() {
		return {
			myDate: '',
			locale: 'en-us',
			options: [
				{
					label: 'English - US',
					value: 'en-us',
				},
				{
					label: 'English - Australia',
					value: 'en-au',
				},
				{
					label: 'English - Canada',
					value: 'en-ca',
				},
				{
					label: 'English - Great Britain',
					value: 'en-gb',
				},
				{
					label: 'Spanish',
					value: 'es',
				},
				{
					label: 'French',
					value: 'fr',
				},
				{
					label: 'Japanese',
					value: 'ja',
				},
			],
		};
	},
};
</script>
```


## Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `String`| — | Date in ISO format `YYYY-MM-DD` |
| `locale` | `String`| — | Locale code to use the Datepicker in. Detects the browser locale if not passed in. |
| `min-date` | `String`| — | Minimum date in ISO format |
| `max-date` | `String`| — | Maximum date in ISO format |

## Events
| Name | Arguments | Triggers when... |
| ---- | --------- | ---------------- |
| `datepicker:update` | New date value | The date is updated |
