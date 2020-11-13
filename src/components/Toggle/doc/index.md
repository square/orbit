# Toggle

Toggle is used for switching between two states. For example, turning a feature _ON_ or _OFF_.

The effects of interacting with a Toggle should be instant. If the control requires submitting a form to save the option, use a [Checkbox](/components/checkbox) instead.

## Examples

```vue
<template>
	<div>
		<o-toggle v-model="toggle">
			{{ toggle }}
		</o-toggle>
	</div>
</template>

<script>
import { OToggle } from '@square/orbit/components/Toggle';

export default {
	components: {
		OToggle,
	},
	data() {
		return {
			toggle: true,
		};
	},
};
</script>
```

### Custom true and false values

Return something different than `true` and `false` Booleans from the component.

Set `true-value` and `false-value` attributes to specify your own values for the _ON_ and _OFF_ states respectively.

```vue
<template>
	<div>
		<o-toggle
			v-model="toggle"
			true-value="Active"
			false-value="Disabled"
		>
			{{ toggle }}
		</o-toggle>
	</div>
</template>

<script>
import { OToggle } from '@square/orbit/components/Toggle';

export default {
	components: {
		OToggle,
	},
	data() {
		return {
			toggle: 'Active',
		};
	},
};
</script>
```

### Sublabels

Sublabels are used to add supplementary information to your Toggle. You can use the `sublabel` prop or slot to add content below your Toggle label.

```vue
<template>
	<div>
		<o-toggle v-model="toggle">
			Enable lift-off controls
			<template slot="sublabel">
				Activate when your rocket is ready to launch.
			</template>
		</o-toggle>
	</div>
</template>

<script>
import { OToggle } from '@square/orbit/components/Toggle';

export default {
	components: {
		OToggle,
	},
	data() {
		return {
			toggle: true,
		};
	},
};
</script>
```

## API

### Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `checked` (v-model) |  `Boolean`, `*`  |  -  | The model that backs the toggle state. Could be A) a Boolean if using a toggle with the default values, B) one of the items provided by `true-value` or `false-value` |
| `disabled` | `Boolean`  | `false` | Whether Toggle is disabled. |
| `value` | `String`, `Boolean` | `true` | Value of Toggle. |
| `true-value` | `*` | `true` | Custom `true` value |
| `false-value` | `*` | `false` | Custom `false` value |
| `sublabel` | A short description that appears underneath the Toggle label/default slot. content. Please only use if you have default slot content. |

### Events
| Name         | Arguments         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `toggle:update` | New value | Toggle state changes. |

### Slots
| Name          | Description   |
| ------------- | ------------- |
| `default` | The label for the Toggle. |
| `sublabel` | A short description that appears underneath the toggle label/default slot. content. Please only use if you have default slot content. |
