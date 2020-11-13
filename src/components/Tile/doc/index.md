# Tile

## Button
The Tile alone can be used like a Button.

```vue
<template>
	<o-colorpicker
		v-model="currentColor"
		show-spectrum
	>
		<template #action="colorpicker">
			<o-tile
				class="tile"
				@click="colorpicker.toggle()"
			>
				<div
					class="color"
					:style="{
						backgroundColor: currentColor,
					}"
				/>
				<div class="label">
					Main color
				</div>
			</o-tile>
		</template>
	</o-colorpicker>
</template>

<script>
import { OColorpicker } from '@square/orbit/components/Colorpicker';
import { OTile } from '@square/orbit/components/Tile';

export default {
	components: {
		OColorpicker,
		OTile,
	},
	data() {
		return {
			currentColor: '#0073ff',
		};
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.tile {
	width: 90px;
	user-select: none;
}

.color {
	height: 64px;
}

.label {
	font-size: 12px;
	padding: 4px;
	text-align: center;
	background-color: var(--color-white);
}

</style>
```

## Options
A Tile can be given options to cycle through

```vue
<template>
	<o-tile
		v-model="selectedShape"
		class="tile"
		:options="shapes"
	>
		<div
			class="tile-media"
		>
			<img
				class="tile-img"
				:src="selectedShape && selectedShape.url"
			>
			<div class="indicators-bar">
				<div
					v-for="shape in shapes"
					:key="shape.value"
					:class="['indicator', { active: shape === selectedShape }]"
				/>
			</div>
		</div>
		<div class="label">
			Crop
		</div>
	</o-tile>
</template>

<script>
import { OTile } from '@square/orbit/components/Tile';
import shape11 from './shapes/1-1.svg';
import shape34 from './shapes/3-4.svg';
import shape43 from './shapes/4-3.svg';
import shapeCircle from './shapes/circle.svg';

export default {
	components: {
		OTile,
	},
	data() {
		const shapes = [
			{
				value: '3:4',
				url: shape34,
			},
			{
				value: '1:1',
				url: shape11,
			},
			{
				value: 'circle',
				url: shapeCircle,
			},
			{
				value: '4:3',
				url: shape43,
			},
		];

		return {
			selectedShape: shapes[0],
			shapes,
		};
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.tile {
	width: 90px;
	user-select: none;
}

.tile-media {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 64px;
	background-color: var(--color-gray-10);
}

.tile-img {
	transition: transform var(--transition-base);
}

.tile:active .tile-img {
	transform: scale(0.9);
}

.label {
	font-size: 12px;
	padding: 4px;
	text-align: center;
	background-color: var(--color-white);
}

.indicators-bar {
	position: absolute;
	display: flex;
	width: 100%;
	padding: 0 8px;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	height: 4px;
	transition: opacity 0.2s ease, bottom 0.2s ease;
	opacity: 0;
	bottom: 0;
}

.tile:hover,
.tile:focus {
	& .indicators-bar {
		opacity: 1;
		bottom: 6px;
	}
}

.indicator {
	flex: 1;
	height: 2px;
	margin: 0 2px;
	margin-top: 1px;
	transition:
		color 0.2s ease,
		height 0.2s ease;
	border-radius: 34px;
	background-color: var(--color-gray-30);
	transition: background-color 0.2s ease, height 0.2s ease;

	&.active {
		height: 4px;
		background-color: var(--selected-color);
	}
}
</style>
```


## Tiles Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `selectedOption` (v-model) | `*` | - | The currently selected tile option. |
| `options` | `Array` | - | The available options in a Tile. |
| `optionComparator` | `Function` | - | Comparator function for determining which option matches the selectedOption.  |
| `disabled` | `Boolean` | `false` | Setting to true will disable all tiles. |

## Events
| Name | Arguments | Triggers when... |
| ---- | ----| ----|
| `tile:select-option` | New value | A new option is selected. |
