# Datepicker
The datepicker is used to select a single date. The date must be represented by a UNIX timestamp.

```vue
<template>
	<o-form>
		<o-form-item label="Pick a date">
			<o-datepicker
				v-model="myDate"
				placeholder="Choose a date"
			/>
		</o-form-item>
	</o-form>
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
			myDate: Date.now(),
		};
	},
};
</script>
```

# Year Controls
The `year-controls` prop will add controls for advancing by year instead of just by month. Use this when you will need to select dates more than a year from the current date.

```vue
<template>
	<o-form>
		<o-form-item label="Pick a date">
			<o-datepicker
				v-model="myDate"
				placeholder="Choose a date"
				year-controls
			/>
		</o-form-item>
	</o-form>
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
			myDate: Date.now(),
		};
	},
};
</script>
```

## Datepicker Range
Use two datepickers and [sync](https://vuejs.org/v2/guide/components.html#sync-Modifier) their max and min date.

```vue
<template>
	<div>
		<o-form>
			<o-grid>
				<o-grid-item>
					<o-form-item label="Start Date">
						<o-datepicker
							v-model="myStartDate"
							placeholder="Select Start Date"
						/>
					</o-form-item>
				</o-grid-item>
				<o-grid-item>
					<o-form-item label="Ending">
						<o-datepicker
							v-model="myEndDate"
							:min-date.sync="myStartDate"
							placeholder="Select End Date"
						/>
					</o-form-item>
				</o-grid-item>
			</o-grid>
		</o-form>
		My Start Date: {{ myStartDate }} <br>
		My End Date: {{ myEndDate }} <br>
	</div>
</template>

<script>
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { OGrid, OGridItem } from '@square/orbit/components/Grid';
import { ODatepicker } from '@square/orbit/components/Datepicker';

export default {
	components: {
		OForm,
		OFormItem,
		OGrid,
		OGridItem,
		ODatepicker,
	},

	data() {
		return {
			myStartDate: null,
			myEndDate: null,
			myMinDate: Date.now(),
		};
	},

	watch: {
		myStartDate() {
			if (this.myMinDate < this.myStartDate) {
				this.myEndDate = null;
			}
		},
	},
};
</script>
```

## Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `Number`| — | UNIX timestamp in milliseconds |
| `placeholder` | `String`| — | Placeholder for the input field  |
| `min-date` | `Number`| — | Disable the dates before the `min-date` |
| `max-date` | `Number`| — | Disable the dates after the `max-date` |
| `year-controls` | `Boolean`| false | Adds controls to advance by year |

## Events
| Name | Arguments | Triggers when... |
| ---- | --------- | ---------------- |
| `datepicker:update` | New timestamp value | Updates the date |
