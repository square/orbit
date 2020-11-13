# Checkbox
A small box that, when selected by the user, shows that a particular feature has been enabled or a particular option chosen.

The default value is a `Boolean` for single `checkbox`, and it becomes `true` when selected.

```vue
<template>
	<div>
		<o-checkbox v-model="engineer">
			Shuttle Project Engineer
			(v-model)
		</o-checkbox>

		<o-checkbox
			:checked="director"
			@checkbox:update="val => { director = val }"
		>
			Landing and Recovery Director
			(Without v-model)
		</o-checkbox>

		<o-checkbox
			v-model="commander"
			true-value="ready"
			false-value="not-ready"
		>
			Mission Commander
			(Custom checked and unchecked values)
		</o-checkbox>

		<o-checkbox
			v-model="conductor"
			disabled
		>
			Payload Test Conductor
			(Disabled)
		</o-checkbox>

		<br>

		<div>Engineer: {{ engineer }}</div>
		<div>Director: {{ director }}</div>
		<div>Commander: {{ commander }}</div>
		<div>Conductor: {{ conductor }}</div>
	</div>
</template>

<script>
import { OCheckbox } from '@square/orbit/components/Checkbox';

export default {
	components: {
		OCheckbox,
	},
	data() {
		return {
			conductor: null,
			engineer: null,
			director: null,
			commander: null,
		};
	},
};
</script>
```

## Multiple Checkboxes bound to the same array
If you need to store multiple checkbox values in the same v-model value, you can set the `checked v-model` to the array and the `value` to the value of the item in the array. If the `value` of the checkbox is contained in the array, the checkbox will appear checked. In this case, be sure to set a value on each checkbox, and the
v-model to the array of checked items.

Checkboxes with a checked (v-model) property of type Array do not work with the `true-value` and `false-value` properties.

```vue
<template>
	<div>
		<o-checkbox
			v-model="checkedAstronauts"
			value="Neil Armstrong"
		>
			Neil Armstrong
		</o-checkbox>
		<o-checkbox
			v-model="checkedAstronauts"
			value="Buzz Aldrin"
		>
			Buzz Aldrin
		</o-checkbox>
		<o-checkbox
			v-model="checkedAstronauts"
			value="Sally Ride"
		>
			Sally Ride
		</o-checkbox>

		<br>

		{{ checkedAstronauts }}
	</div>
</template>

<script>
import { OCheckbox } from '@square/orbit/components/Checkbox';

export default {
	components: {
		OCheckbox,
	},
	data() {
		return {
			checkedAstronauts: ['Sally Ride'],
		};
	},
};
</script>
```

## Sublabels
Sublabels are used to add supplementary information to your Checkbox. You can use the `sublabel` prop or slot to add content below your Checkbox label.

```vue
<template>
	<div>
		<o-checkbox
			v-model="pluto"
			sublabel="Dwarf planet in the Kuiper belt."
		>
			Pluto
		</o-checkbox>

		<o-checkbox
			v-model="ceres"
			sublabel="The only dwarf planet inside Neptune's orbit."
		>
			Ceres
		</o-checkbox>

		<o-checkbox v-model="eris">
			Eris
			<template slot="sublabel">
				Most massive and second-largest dwarf planet. <a href="https://en.wikipedia.org/wiki/Eris_(dwarf_planet)">Learn more.</a>
			</template>
		</o-checkbox>
	</div>
</template>
<script>
import { OCheckbox } from '@square/orbit/components/Checkbox';

export default {
	components: {
		OCheckbox,
	},

	data() {
		return {
			pluto: false,
			ceres: false,
			eris: false,
		};
	},
};
</script>
```

## Validation and Errors
Use the `o-form-item` component for validation and errors. See the docs for that [here](/components/Form).

## Attributes

| Name      | Type                                      | Default         | Description                    |
| --------- |------------------------------------------ |---------------- |------------------------------- |
| `checked` (v-model) |  `Boolean`, `Array`, `*`  |  -  | The model that backs the checkbox state. Could be A) a Boolean if using a single checkbox with the default values, B) an Array bound to multiple checkboxes, each with a corresponding `value` prop, or C) one of the items provided by `true-value` or `false-value` |
| `true-value`  | `*`  |  `true` | Custom checked value |
| `false-value`  | `*`  |  `false` | Custom unchecked value |
| `value` | `*` | - | **Only use when multiple checkboxes are bound to the same model.** The `value` prop provides the item to be added/removed from the Array depending on checkbox state. |
| `sublabel` | A short description that appears underneath the checkbox label/default slot. content. Please only use if you have default slot content. |

## Events
| Name         | Argument         | Type    | Triggers when... |
| ------------ | ---------------- | --------|----------------- |
| `checkbox:update` | `newState` | `Boolean`, `Array`, `*` | The checkbox is checked or unchecked. |

## Slots
| Name          | Description   |
| ------------- | ------------- |
| `default` | The checkbox label |
| `sublabel` | A short description that appears underneath the checkbox label/default slot. content. Please only use if you have default slot content. |
