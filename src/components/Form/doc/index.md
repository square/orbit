# Form
Forms are a collection of `input`, `radio`, `select`, `checkbox`, and other controls to collect user input.


## Examples

In each `form` component, you need a `form-item` field to be the container of each form field.

```vue
<template>
	<o-form @submit.prevent>
		<o-form-item label="What is an astronaut's favorite place on a computer?">
			<o-input
				v-model="form.place"
				placeholder="The space bar..."
			/>
		</o-form-item>

		<o-button
			type="submit"
			variant="primary"
		>
			Submit
		</o-button>
	</o-form>
</template>
<script>
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { OButton } from '@square/orbit/components/Button';
import { OInput } from '@square/orbit/components/Input';

export default {
	components: {
		OForm,
		OFormItem,
		OButton,
		OInput,
	},

	data() {
		return {
			form: {
				place: '',
			},
		};
	},
};
</script>
```

### Labels and Sublabels

Use the label slot if you need more advanced labels, such as a label that include an [Icon](/components/icon) with a [Hovertip](/components/hovertip).

You can also use the `sublabel` prop or slot to insert supplementary text underneath your Form Item. Checkboxes, Radio, and Toggles also have their own sublabel props for more itemized help text.

```vue
<template>
	<o-form @submit.prevent>
		<o-form-item sublabel="I know it's hard, just choose one!">
			<template slot="label">
				Who is your favorite astronaut(s)?
				<o-icon
					v-hovertip="'Choose one or more astronauts below.'"
					name="circle-question-mark"
				/>
			</template>
			<o-checkbox
				v-model="checkedAstronauts"
				value="Neil Armstrong"
				sublabel="First person to walk on the Moon"
			>
				Neil Armstrong
			</o-checkbox>
			<o-checkbox
				v-model="checkedAstronauts"
				value="Buzz Aldrin"
				sublabel="Engineer, former astronaut, and fighter pilot."
			>
				Buzz Aldrin
			</o-checkbox>
			<o-checkbox
				v-model="checkedAstronauts"
				value="Sally Ride"
				sublabel="The first American woman in space in 1983."
			>
				Sally Ride
			</o-checkbox>
		</o-form-item>

		<o-form-item
			label="Why are they your favorite astronaut?"
			sublabel="Tell us more about why they inspire you!"
		>
			<o-textarea
				v-model="reasonForFavorite"
				placeholder="Going to the moon is just so cool..."
			/>
		</o-form-item>

		<o-button
			type="submit"
			variant="primary"
		>
			Submit
		</o-button>
	</o-form>
</template>
<script>
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';
import { OHovertip } from '@square/orbit/components/Hovertip';
import { OCheckbox } from '@square/orbit/components/Checkbox';
import { OTextarea } from '@square/orbit/components/Textarea';

export default {
	components: {
		OForm,
		OFormItem,
		OButton,
		OIcon,
		OHovertip,
		OCheckbox,
		OTextarea,
	},

	directives: {
		Hovertip: OHovertip,
	},

	data() {
		return {
			checkedAstronauts: ['Sally Ride', 'Neil Armstrong'],
			reasonForFavorite: null,
		};
	},
};
</script>
```

### Validation
The form item component allows you to pass in validation errors through the `errors` property.

If the `errors` property is set to a truthy value, the field inside of the form will appear invalid.

```vue
<template>
	<div>
		<o-form @submit.prevent="onSubmit">
			<o-form-item
				:errors="form.name.errors"
				label="Who is your favorite astronaut?"
				secondary-label="Required"
			>
				<o-input v-model="form.name.value" />
			</o-form-item>

			<o-form-item
				:errors="form.term.errors"
				label="Which of the following terms did
					NASA originally want to use in reference to astronauts?"
				secondary-label="Required"
			>
				<o-radio
					v-model="form.term.value"
					value="mercury"
				>
					Mercury
				</o-radio>
				<o-radio
					v-model="form.term.value"
					value="venus"
				>
					Venus
				</o-radio>
				<o-radio
					v-model="form.term.value"
					value="aeronaut"
				>
					Aeronaut
				</o-radio>
				<p v-if="formSubmitted">
					<o-notice type="success">
						<strong>Correct!</strong> Program officials preferred
						Mercury but the name had already been adopted, so they
						eventually settled on "astronaut" instead.
					</o-notice>
				</p>
			</o-form-item>

			<o-button
				type="submit"
				variant="primary"
			>
				Create
			</o-button>
			<o-button @click="resetForm">
				Cancel
			</o-button>
		</o-form>
		<br>
		<o-notice
			v-if="formSubmitted"
			type="success"
		>
			Form submitted!
		</o-notice>
	</div>
</template>
<script>
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { OInput } from '@square/orbit/components/Input';
import { ORadio } from '@square/orbit/components/Radio';
import { OButton } from '@square/orbit/components/Button';
import { ONotice } from '@square/orbit/components/Notice';

export default {
	components: {
		OForm,
		OFormItem,
		OInput,
		ORadio,
		OButton,
		ONotice,
	},

	data() {
		return {
			form: {
				name: {
					value: '',
					errors: [],
					validators: [
						(val) => (!val) && 'Name of your favorite astronaut is required.',
						(val) => (val.length <= 2) && 'Name must be longer than 2 characters.',
					],
				},
				term: {
					value: false,
					errors: [],
					validators: [
						(val) => (!val) && 'You must select an option',
						(val) => (val !== 'mercury') && 'Answer incorrect. Please try again.',
					],
				},
			},
			formSubmitted: false,
		};
	},

	methods: {
		onSubmit() {
			this.formSubmitted = false;

			if (this.validate()) {
				// Submit form
				this.resetForm();
				this.formSubmitted = true;
			}
		},
		validate() {
			this.resetErrors();

			const allErrors = Object.keys(this.form)
				.filter((formProp) => {
					const { value, errors, validators } = this.form[formProp];
					const errMsgs = validators.map((validator) => validator(value)).filter((msg) => msg);

					if (errMsgs.length) {
						errors.push(errMsgs[0]);
					}

					return errors.length;
				});

			return !allErrors.length;
		},
		resetErrors() {
			Object.keys(this.form).forEach((key) => {
				this.form[key].errors.splice(0);
			});
		},
		resetForm() {
			this.resetErrors();
			Object.keys(this.form).forEach((key) => {
				this.form[key].value = '';
			});
			this.formSubmitted = false;
		},
	},
};
</script>
```

### Advanced Label/Error formatting
A property is provided for convenient templating of the form item `label`, but if you need to customize the content you're welcome to use the slot instead.

There is also an `errors` slot if you need to custom template your error messages. Don't forget to also set the `errors` property to the appropriate condition, so that the inner form field appears invalid when your errors are populated.

```vue
<template>
	<o-form @submit.prevent>
		<o-form-item errors>
			<template slot="label">
				<o-icon name="comment-bubble" />&nbsp; Astronaut autobiography:
			</template>
			<o-textarea v-model="form.astronautBio" />
			<template slot="errors">
				<o-notice
					subtle
					type="error"
				>
					This is a custom error message with <a href="/components/icon">links</a>
					and <o-icon name="bolt" /> components.
				</o-notice>
			</template>
		</o-form-item>

		<o-button
			type="submit"
			variant="primary"
		>
			Submit
		</o-button>
	</o-form>
</template>
<script>
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { OTextarea } from '@square/orbit/components/Textarea';
import { OIcon } from '@square/orbit/components/Icon';
import { OButton } from '@square/orbit/components/Button';
import { ONotice } from '@square/orbit/components/Notice';

export default {
	components: {
		OForm,
		OFormItem,
		OTextarea,
		OIcon,
		OButton,
		ONotice,
	},

	data() {
		return {
			form: {
				astronautBio: '',
			},
		};
	},
};
</script>
```

### Grouping form items with shared label
Use a `FormItemGroup` component to group related form items. Use it as you would use a native `<fieldset>`.

These form items will have a reduced vertical gap between them when they are grouped.

```vue
<template>
	<o-form @submit.prevent>
		<o-form-item-group label="Group">
			<o-form-item>
				<o-input
					v-model="form.name"
					placeholder="Full Name"
				/>
			</o-form-item>
			<o-form-item>
				<o-input
					v-model="form.email"
					placeholder="Email"
				/>
			</o-form-item>
		</o-form-item-group>
		<o-form-item-group label="Horizontal Group">
			<o-grid>
				<o-grid-item>
					<o-form-item>
						<o-input
							v-model="form.street"
							placeholder="Street"
						/>
					</o-form-item>
				</o-grid-item>
				<o-grid-item>
					<o-form-item>
						<o-input
							v-model="form.city"
							placeholder="City"
						/>
					</o-form-item>
				</o-grid-item>
				<o-grid-item>
					<o-form-item>
						<o-select
							v-model="form.state"
							:options="states"
							placeholder="State"
						/>
					</o-form-item>
				</o-grid-item>
			</o-grid>
		</o-form-item-group>

		<o-form-item label="Non-Grouped Item">
			<o-input
				v-model="form.phone"
				type="tel"
				placeholder="(123)-456-7890"
			/>
		</o-form-item>

		<o-button variant="primary">
			Submit
		</o-button>
	</o-form>
</template>
<script>
import { OForm, OFormItem, OFormItemGroup } from '@square/orbit/components/Form';
import { OGrid, OGridItem } from '@square/orbit/components/Grid';
import { OButton } from '@square/orbit/components/Button';
import { OInput } from '@square/orbit/components/Input';
import { OSelect } from '@square/orbit/components/Select';

export default {
	components: {
		OForm,
		OFormItem,
		OFormItemGroup,
		OGrid,
		OGridItem,
		OButton,
		OInput,
		OSelect,
	},

	data() {
		return {
			states: [
				{
					value: 'CA',
					label: 'California',
				},
			],
			form: {
				name: '',
				email: '',
				street: '',
				city: '',
				state: '',
				phone: '',
			},
		};
	},
};
</script>
```

## API

### Form Attributes
You may use [native form attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) as needed.

### Form Group Item Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `disabled` | `String` | `false` | Disables all form controls inside of group. |
| `label` | `String` | - | Form group label |
| `flush` | `Boolean` | `false` | If true, the margin-bottom of each child form item will be removed. |

### Form Item Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `label` | `String` | - | Form label |
| `label-unclickable` | `Boolean` | * | When `true`, clicking on the label does not focus the children inside. The `<label>` element no longer wraps the content of the Form Item. *The attribute defaults to `false` unless one of the following Orbit components is used inside of the Form Item: multi-select `Autocomplete`, `ButtonGroup`, `Checkbox`, `Datepicker`, `Radio`, `Upload`. |
| `errors` | `Array`, `String`, `Boolean` | - | Will display the inner field as invalid. If an array of strings is passed, it will display them as error notices below the field. |
| `flush` | `Boolean` | `false` | If true, the margin-bottom of the form item will be removed. |
| `secondary-label` | `String` | - | Displays another label at the top right of the form item. Usually for denoting that the item is 'Required'. Please be sure you are providing a translation. |

### Form Item Slots
| slot    | Description         |
| ------- |-------------------- |
| `label` | Alternative to the `label` property for more advanced content such as including icons, extra formatting, etc. |
| `secondary-label` | `String` | - | Alternative to the `secondary-label` property for more advanced content. Displays another label at the top right of the form item. |
| `errors` | Used for more advanced error templating. Placed below the form item, with no wrapping structure. Please also set the errors property to true to display the correct error state on the form item. |
