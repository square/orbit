# Colorpicker
The Colorpicker provides a simple way to select for a user to select a color from a spectrum, pre-defined palette, or by entering a hex value.

## Examples

### Show spectrum and hue slider

Let user choose color from a spectrum or hue slider.

Enable the spectum and hue slider with the `show-spectrum` attribute.

```vue
<template>
	<div class="container">
		<o-colorpicker
			v-model="currentColor"
			show-spectrum
		/>

		Color: {{ currentColor }}
	</div>
</template>

<script>
import { OColorpicker } from '@square/orbit/components/Colorpicker';

export default {
	components: {
		OColorpicker,
	},

	data() {
		return {
			currentColor: '#0073ff',
		};
	},
};
</script>

<style scoped>
.container {
	margin-bottom: 80px;
}
</style>
```

### Show color swatches

Let user choose color from a set of colors swatches.

Pass an array of valid colors into the `palette` prop to reveal swatches. You can use this option
alongside the `show-spectrum` attribute.

```vue
<template>
	<div class="container">
		<o-colorpicker
			v-model="currentColor"
			:palette="palette"
		/>

		Color: {{ currentColor }}
	</div>
</template>

<script>
import { OColorpicker } from '@square/orbit/components/Colorpicker';

export default {
	components: {
		OColorpicker,
	},

	data() {
		return {
			currentColor: '#003055',
			palette: [
				'#DEC061',
				'#FF8F17',
				'#DD5857',
				'#F67FB3',
				'#D718AF',
				'#802EA2',
				'#3963A3',
				'#5D8DE0',
				'#179BE0',
				'#15867A',
				'#0BB351',
				'#88C414',
			],
		};
	},
};
</script>

<style scoped>
.container {
	margin-bottom: 80px;
}
</style>
```

### Show hex input

Show a text input that lets user type in a hex value.

```vue
<template>
	<div class="container">
		<o-colorpicker
			v-model="currentColor"
			show-spectrum
			show-input
		/>

		Color: {{ currentColor }}
	</div>
</template>

<script>
import { OColorpicker } from '@square/orbit/components/Colorpicker';

export default {
	components: {
		OColorpicker,
	},

	data() {
		return {
			currentColor: '#dfe6ee',
		};
	},
};
</script>

<style scoped>
.container {
	margin-bottom: 80px;
}
</style>
```

### Custom control to reveal color picker

Replace the default color swatch and down arrow combo button with another control. Your custom 
control will open  the colorpicker when clicked.

The scoped object passed to the `action` slot is the popover instance of the color spectrum.

```vue
<template>
	<div class="container">
		<o-colorpicker
			v-model="currentColor"
			show-spectrum
		>
			<div
				slot="action"
				slot-scope="colorpicker"
				:style="{
					backgroundColor: currentColor,
				}"
				class="circleButton"
				@click="colorpicker.toggle()"
			/>
		</o-colorpicker>

		Color: {{ currentColor }}
	</div>
</template>

<script>
import { OColorpicker } from '@square/orbit/components/Colorpicker';

export default {
	components: {
		OColorpicker,
	},

	data() {
		return {
			currentColor: '#0073ff',
		};
	},
};
</script>

<style scoped>
.container {
	margin-bottom: 80px;
}
.circleButton {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	border: 1px solid #ccc;
	cursor: pointer;
}
</style>
```

## API

### Colorpicker attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `color`* | `String` | — | The current color code. <br><br>Valid values: hexadecimal colors with or without a `#` or a color string. Ex: `#000`, `000`, `#000000`, `000000`, `black` |
| `palette` | `Array` | - | An array of objects with a `color` property which has a valid hex as a value. |
| `show-spectrum` | `Boolean` | false | Adds a spectrum and hue slider to the Colorpicker. |
| `show-input` | `Boolean` | false | Adds an input for manually entering a color code. |
| `disabled` | `Boolean` | false | Disables the Colorpicker. |

### Colorpicker events
| Name | Arguments | Triggers when... |
| ---- | --------- | ---------------- |
| `colorpicker:update` | A HEX color code prefixed by `#`. | The color value changes |
| `close` | - | The color picker has been closed |
| `popover:click` | $event | The popover opened by the color picker has been clicked on. |
| `open` | - | The color picker has been opened |

### Colorpicker slots
| slot | Description |
| ---- | ----------- |
| `action` | Control which opens the colorpicker, gets a popover instance as its scope |
