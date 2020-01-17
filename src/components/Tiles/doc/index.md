# Tiles

## Single-select
Single-select tiles works like a set of radio buttons. Only one option can be selected at a time.

```vue
<template>
	<div>
		<o-tiles v-model="layout">
			<o-tile-item
				v-for="(option, idx) in options"
				:key="idx"
				:value="`option-${idx + 1}`"
			>
				<img :src="option">
			</o-tile-item>
		</o-tiles>

		<p>v-model: {{ layout }}</p>
	</div>
</template>

<script>
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';

import img1 from './layout-1.svg';
import img2 from './layout-2.svg';
import img3 from './layout-3.svg';
import img4 from './layout-4.svg';

export default {
	components: {
		OTiles,
		OTileItem,
	},
	data() {
		return {
			layout: null,
			options: [img1, img2, img3, img4],
		};
	},
};
</script>
```

## Multi-select
Multi-select tiles works like a set of checkboxes. Multiple option can be selected at a time.

```vue
<template>
	<div>
		<o-tiles
			v-model="layout"
			mode="multi-select"
		>
			<o-tile-item
				v-for="(option, idx) in options"
				:key="idx"
				:value="`option-${idx + 1}`"
			>
				<img :src="option">
			</o-tile-item>
		</o-tiles>

		<p>v-model: {{ layout }}</p>
	</div>
</template>

<script>
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';

import img1 from './layout-1.svg';
import img2 from './layout-2.svg';
import img3 from './layout-3.svg';
import img4 from './layout-4.svg';

export default {
	components: {
		OTiles,
		OTileItem,
	},
	data() {
		return {
			layout: [],
			options: [img1, img2, img3, img4],
		};
	},
};
</script>
```

## Mandatory
If you want to require at least one option to be selected at all times, set the initial value to one of the options and turn on the `mandatory` prop.

```vue
<template>
	<div>
		<o-tiles
			v-model="style"
			mandatory
			class="style-tiles"
		>
			<o-tile-item
				v-for="(style, idx) in styles"
				:key="idx"
				:value="style.name"
				class="style-tile"
			>
				<div class="left-preview">
					<div
						:style="`background-color: ${style.color1}`"
						class="circle circle-1"
					/>
					<div
						:style="`background-color: ${style.color2}`"
						class="circle circle-2"
					/>
				</div>
				<div class="right-preview">
					{{ style.name }}
				</div>
			</o-tile-item>
		</o-tiles>

		<p>v-model: {{ style }}</p>
	</div>
</template>

<script>
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';

export default {
	components: {
		OTiles,
		OTileItem,
	},
	data() {
		return {
			style: 'Inner Richmond',
			styles: [
				{
					name: 'Inner Richmond',
					color1: '#ff9f00',
					color2: '#003055',
				},
				{
					name: 'Chinatown',
					color1: '#ff2de',
					color2: '#d00000',
				},
				{
					name: 'Downtown',
					color1: '#005ac7',
					color2: '#708399',
				},
				{
					name: 'Haight Ashbury',
					color1: '#ff9f00',
					color2: '#00912e',
				},
			],
		};
	},
};
</script>

<style scoped>

.style-tiles {
	width: 300px;
}

.style-tile {
	display: flex;
	width: 100%;
	height: 84px;
}

.left-preview {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgb(238, 237, 231);
	flex-basis: 100%;
	text-align: center;
}

.right-preview {
	display:flex;
	flex-basis: 100%;
	align-items: center;
    font-size: 20px;
    font-weight: 600;
    margin-left: 16px;
}

.circle {
	border-radius: 100%;
	width: 24px;
	height: 24px;
	background-color: gold;
}

.circle-1 {
	z-index: 10;
	position: relative;
	left: 4px;
}

.circle-2 {
	z-index: 1;
	position: relative;
	left: -4px;
}
</style>
```

## Padding
Use the `padding` prop to add padding to your tiles.

```vue
<template>
	<o-tiles
		v-model="currentOption"
		:padding="8"
	>
		<o-tile-item
			v-for="option in options"
			:key="option"
			:value="option"
		>
			<div class="demo">
				Content
			</div>
		</o-tile-item>
	</o-tiles>
</template>

<script>
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';

export default {
	components: {
		OTiles,
		OTileItem,
	},
	data() {
		return {
			currentOption: null,
			options: [1, 2, 3, 4],
		};
	},
};
</script>

<style scoped>
.demo {
	width: 130px;
	color: #aaa;
	line-height: 32px;
	text-align: center;
	border: 1px dashed #ddd;
}
</style>
```

## Disabling
You can disable all tiles or individual tiles by adding a `disabled` prop.

```vue
<template>
	<div>
		<o-tiles
			v-model="shipping"
			padding
		>
			<o-tile-item
				value="real-time-shipping"
				class="shipping-tile"
				disabled
			>
				<o-heading size="title-4">
					Real time rates
				</o-heading>
				<p>
					Charge the most accurate rates based on weight, destination,
					and carrier services.
				</p>
			</o-tile-item>

			<o-tile-item
				value="flat-rate"
				class="shipping-tile"
			>
				<o-heading size="title-4">
					Flat rate
				</o-heading>
				<p>
					Charge one flat rate for every order or every item regardless
					of weight or destination.
				</p>
			</o-tile-item>
			<o-tile-item
				value="free-shipping"
				class="shipping-tile"
			>
				<o-heading size="title-4">
					Free shipping
				</o-heading>
				<p>Offer free shipping for orders that meet certain criteria.</p>
			</o-tile-item>
		</o-tiles>

		<p>v-model: {{ shipping }}</p>
	</div>
</template>

<script>
import { OHeading } from '@square/orbit/components/Heading';
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';

export default {
	components: {
		OHeading,
		OTiles,
		OTileItem,
	},

	data() {
		return {
			shipping: null,
		};
	},
};
</script>

<style scoped>

.shipping-tile {
	flex: 1 1 0%;
}

</style>
```

## Indicators
You can add indicators to your tiles using the `has-indicators` prop.

```vue
<template>
	<div>
		<o-tiles
			v-model="options"
			has-indicator
			padding
		>
			<o-tile-item
				class="tile"
				value="option-1"
			>
				<o-heading size="title-4">
					Real time rates
				</o-heading>
				<p>
					Charge the most accurate rates based on weight, destination,
					and carrier services.
				</p>
			</o-tile-item>
			<o-tile-item
				class="tile"
				value="option-2"
			>
				<o-heading size="title-4">
					Flat rate
				</o-heading>
				<p>
					Charge one flat rate for every order or every item regardless
					of weight or destination.
				</p>
			</o-tile-item>
			<o-tile-item
				class="tile"
				value="option-3"
			>
				<o-heading size="title-4">
					Free shipping
				</o-heading>
				<p>Offer free shipping for orders that meet certain criteria.</p>
			</o-tile-item>
		</o-tiles>

		<p>v-model: {{ options }}</p>
	</div>
</template>

<script>
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';
import { OHeading } from '@square/orbit/components/Heading';

export default {
	components: {
		OTiles,
		OTileItem,
		OHeading,
	},
	data() {
		return {
			options: 'option-1',
		};
	},
};
</script>

<style scoped>
.tile {
	flex: 1 1 0%;
}
</style>
```

## Custom Tiles

### Color Tiles
In this example, each tile will represent a color.

```vue
<template>
	<div>
		<o-tiles v-model="color">
			<o-tile-item
				v-for="(option, idx) in options"
				:key="idx"
				:value="option"
				:style="`background-color: ${option}`"
				class="tile"
			/>
		</o-tiles>

		<p>v-model: {{ color }}</p>
	</div>
</template>

<script>
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';

export default {
	components: {
		OTiles,
		OTileItem,
	},
	data() {
		return {
			color: null,
			options: ['#3374ff', '#323b43', '#70767c', '#adb1b5', '#d5d9dc', '#ebedef'],
		};
	},
};
</script>
<style scoped>
.tile {
	width: 40px;
	height: 40px;
}
</style>
```

### Custom Indicators
In this example, the tiles show a custom indicator when the tile is selected, and leverage flexbox css to layout content in the tiles.

```vue
<template>
	<o-tiles
		v-model="selectedFeatures"
		mode="multi-select"
		class="tiles"
		:padding="16"
	>
		<o-tile-item
			v-for="feature in features"
			:key="feature.name"
			:value="feature.name"
			class="tile"
		>
			<img
				class="tile__icon"
				:src="feature.icon"
			>
			<o-heading
				class="tile__heading"
				size="title-4"
				flush
			>
				{{ feature.name }}
			</o-heading>
			<img
				v-if="selectedFeatures.includes(feature.name)"
				:src="filledCheck"
				class="tile__indicator"
			>
			<img
				v-else
				:src="circlePlus"
				class="tile__indicator"
			>
		</o-tile-item>
	</o-tiles>
</template>

<script>
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';
import { OHeading } from '@square/orbit/components/Heading';

import circlePlus from './circle-plus.svg';
import filledCheck from './filled-check.svg';
import iconEvent from './icon-event.svg';
import iconOrdering from './icon-ordering.svg';
import iconPhysical from './icon-physical.svg';
import iconReservations from './icon-reservations.svg';

export default {
	components: {
		OTiles,
		OTileItem,
		OHeading,
	},
	data() {
		return {
			circlePlus,
			filledCheck,
			selectedFeatures: ['Online ordering'],
			features: [
				{
					name: 'Online ordering',
					icon: iconOrdering,
				},
				{
					name: 'Reservations',
					icon: iconReservations,
				},
				{
					name: 'Sell physical goods',
					icon: iconPhysical,
				},
				{
					name: 'Sell event tickets',
					icon: iconEvent,
				},
			],
		};
	},
};
</script>

<style scoped>
@import '@square/orbit/vars.css';

.tiles {
	max-width: 320px;
}

.tile {
	display: flex;
	justify-content: space-between;
	width: 100%;
}

.tile__icon {
	flex: 0 0 auto;
	margin-right: var(--space-x2);
}

.tile__heading {
	flex: 1;
	margin-right: var(--space-x2);
	color: var(--color-gray-60);
}
</style>
```

## Tiles Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `value` (v-model) | `*`, `Array<String>` | - | The currently selected tile value. If using multi-select mode, the value will be an array of strings. |
| `disabled` | `Boolean` | `false` | Setting to true will disable all tiles. |
| `mode` | `String`<br>`single-select`, `multi-select` | `single-select` | `single-select` allows only one option can be selected at a time. `multi-select` allow multiple options to be selected at a time.|
| `mandatory` | `Boolean` | `false` | When set to true, an option that has been selected cannot be deselected unless the user chooses an alternative option. |
| `padding` | `Boolean`, `Number` | `0` | Adds padding inside each tile.<br><br>Add the attribute without a value to use the common padding size of 24px. <code>&lt;o-tiles padding&gt;</code> You can also specify a numeric value. Valid numeric values are `0, 4, 8, 16, 24`. <code>&lt;o-tiles padding="8"&gt;</code>|
| `has-indicator` | `Boolean` | `false` | Shows checkmarks in the top left of the tiles on hover/selected when enabled. |

## Tile Item Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `v-model` | - | - | Set equal to the **value** of the **selected** tile. If left undefined, it will not be selected on initialization. |
| `disabled` | `Boolean` | `false` | Disables the tile. |


## Events
| Name | Arguments | Triggers when... |
| ---- | ----| ----|
| `update` | New value | A new tile is selected. |
