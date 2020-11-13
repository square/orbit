# Slider
Sliders allow a user to drag a drag handle to select a value from a predetermined range (min/max).

### Basic Usage

```vue
<template>
	<o-slider v-model="value" />
</template>

<script>
import { OSlider } from '@square/orbit/components/Slider';

export default {
	components: {
		OSlider,
	},

	data() {
		return {
			value: 0,
		};
	},
};
</script>
```

### Setting minimum and maximum values

```vue
<template>
	<o-slider
		v-model="value"
		:min="0"
		:max="500"
	/>
</template>

<script>
import { OSlider } from '@square/orbit/components/Slider';

export default {
	components: {
		OSlider,
	},

	data() {
		return {
			value: 0,
		};
	},
};
</script>
```

### Showing the Slider Value

```vue
<template>
	<o-slider
		v-model="value"
		:min="0"
		:max="500"
		show-value
	/>
</template>

<script>
import { OSlider } from '@square/orbit/components/Slider';

export default {
	components: {
		OSlider,
	},

	data() {
		return {
			value: 0,
		};
	},
};
</script>
```

### Adding a suffix to the value

```vue
<template>
	<o-slider
		v-model="value"
		:min="0"
		:max="500"
		suffix="%"
		show-value
	/>
</template>

<script>
import { OSlider } from '@square/orbit/components/Slider';

export default {
	components: {
		OSlider,
	},

	data() {
		return {
			value: 0,
		};
	},
};
</script>
```

### Slider Theming

```vue
<template>
	<o-slider
		v-model="value"
		theme="hue"
	/>
</template>

<script>
import { OSlider } from '@square/orbit/components/Slider';

export default {
	components: {
		OSlider,
	},

	data() {
		return {
			value: 0,
		};
	},
};
</script>
```

#### Passing in a custom gradient

```vue
<template>
	<o-slider
		v-model="value"
		theme="gradient"
		:slider-gradient="['#fff', '#000']"
	/>
</template>

<script>
import { OSlider } from '@square/orbit/components/Slider';

export default {
	components: {
		OSlider,
	},

	data() {
		return {
			value: 0,
		};
	},
};
</script>
```

## Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `min` | `Number` | `0` | The minimum number that can be selected |
| `max` | `Number` | `100` | The maximum number that can be selected |
| `show-value` | `Boolean` | `false` | Shows value output of slider |
| `suffix` | `String` | - | Displays the type of number such as percentage |
| `theme` | `String`, `default`, `gradient`, `hue` | `default` | Sets the theme for the slider |
| `slider-gradient` | `Array` | `[ '#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00']` | Colors for gradient in the slider track. |
| `disabled` | `Boolean` | `false` | Disables the slider. |

## Events
| Name   | Arguments | Triggers when... |
| ------ | --------- | ----------- |
| `input` | `newValue` | Propagates native event on live value changes. |
| `change` | `newValue` | Propagates native event on value changes after mouse release. |
| `slider:update` | `newValue` | Triggers when the Slider value has changed. |
