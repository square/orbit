# Radio
Suitable for choosing from some mutually exclusive options.

The radio will not be selected if `value` is not equivalent to `selected` (abstracted by `v-model`).

```vue
<template>
	<div>
		<o-radio
			v-model="selectedRadio"
			:value="3"
		>
			Option A
		</o-radio>
		<o-radio
			v-model="selectedRadio"
			:value="6"
		>
			Option B
		</o-radio>
		<o-radio
			v-model="selectedRadio"
			:value="9"
		>
			Option C
		</o-radio>
		Selected value: {{ selectedRadio }}
	</div>
</template>

<script>
import { ORadio } from '@square/orbit/components/Radio';

export default {
	components: {
		ORadio,
	},

	data() {
		return {
			selectedRadio: 9,
		};
	},
};
</script>
```

## Disabled
The `disabled` attribute can be added to `o-radio` to disabled the radio.

```vue
<template>
	<div>
		<o-radio
			v-model="selectedRadio"
			value="A"
			disabled
		>
			Option A
		</o-radio>
		<o-radio
			v-model="selectedRadio"
			value="B"
			disabled
		>
			Option B
		</o-radio>
	</div>
</template>

<script>
import { ORadio } from '@square/orbit/components/Radio';

export default {
	components: {
		ORadio,
	},
	data() {
		return {
			selectedRadio: 'A',
		};
	},
};
</script>
```

## Sublabels
Sublabels are used to add supplementary information to your Radios. You can use the `sublabel` prop or slot to add content below your Radio label.

```vue
<template>
	<div>
		<o-radio
			v-model="selectedPlanet"
			value="pluto"
			sublabel="Dwarf planet in the Kuiper belt."
		>
			Pluto
		</o-radio>
		<o-radio
			v-model="selectedPlanet"
			value="ceres"
			sublabel="The only dwarf planet inside Neptune's orbit."
		>
			Ceres
		</o-radio>
		<o-radio
			v-model="selectedPlanet"
			value="eris"
		>
			Eris
			<template slot="sublabel">
				Most massive and second-largest dwarf planet. <a href="https://en.wikipedia.org/wiki/Eris_(dwarf_planet)">Learn more.</a>
			</template>
		</o-radio>

		Selected value: {{ selectedPlanet }}
	</div>
</template>

<script>
import { ORadio } from '@square/orbit/components/Radio';

export default {
	components: {
		ORadio,
	},

	data() {
		return {
			selectedPlanet: null,
		};
	},
};
</script>
```

## Grouping Radios

You can use a `RadioGroup` to group `Radio`s and make your code slightly more concise.

```vue
<template>
	<div>
		<o-radio-group
			v-model="selectedRadio"
			:disabled="!enabledGroup"
		>
			<o-radio value="A">
				Option A
			</o-radio>
			<o-radio value="B">
				Option B
			</o-radio>
		</o-radio-group>

		Selected value: {{ selectedRadio }}
		<br>
		<o-toggle v-model="enabledGroup">
			{{ enabledGroup? 'enabled' : 'disabled' }} radios
		</o-toggle>
	</div>
</template>

<script>
import { ORadio, ORadioGroup } from '@square/orbit/components/Radio';
import { OToggle } from '@square/orbit/components/Toggle';

export default {
	components: {
		ORadio,
		ORadioGroup,
		OToggle,
	},
	data() {
		return {
			selectedRadio: 'A',
			enabledGroup: true,
		};
	},
};
</script>
```

## Validation and Errors
Use the `o-form-item` component for validation and errors. See the docs for that [here](/components/Form).

## Radio Attributes
| Name | Type    | Default | Description            |
| ---- | ---- | ---- | ---- |
| `selected` (v-model) | — | — | The value of the selected radio |
| `value` | — | — | The value of radio |
| `disabled` | `Boolean` | `false` | Whether radio is disabled |
| `sublabel` | A short description that appears underneath the Radio label/default slot. content. Please only use if you have default slot content. |

## Radio Slots
| Name          | Description   |
| ------------- | ------------- |
| `default` | The label for the Radio. |
| `sublabel` | A short description that appears underneath the Radio label / default slot content. Please only use if you have default slot content. |

## Radio Events
| Name   | Arguments | Triggers when... |
| ------ | --------- | ----------- |
| `radio:update` (v-model) | Selected value | The radio gets selected |

## Radio Group Attributes
| Name | Type    | Default | Description            |
| ---- | ---- | ---- | ----
| `disabled` | `Boolean` | `false` | Whether the radio group is disabled |
| `value` (v-model) | — | — | The value of the form property |

## Radio Group Events
| Name   | Arguments | Triggers when... |
| ------ | --------- | ----------- |
| `radio-group:update` | Event object | The radio gets selected |
