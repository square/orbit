# Skeleton Components
Placeholders representing content before it has been loaded and rendered.

## Skeleton Text
A series of grey rectangles with a loading animation. Use to represent text that has not yet loaded.

Use the `variant` prop to select the type of text you want a skeleton for. Each variant has different heights and widths.

Use the `lines` prop to tell the skeleton how many lines of text to show.
```vue
<template>
	<div class="my-container">
		<template v-if="!loaded">
			<o-skeleton-text variant="subtitle" />
			<o-skeleton-text variant="title" />
			<o-skeleton-text :lines="5" />
		</template>
		<template v-else>
			<o-heading size="title-3">
				Lorem Ipsum Dolor
			</o-heading>
			<o-heading size="title-1">
				Cosectetur
			</o-heading>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut tempus diam.
			In commodo imperdiet faucibus. Nam ut tellus in sem sodales congue vitae hendrerit nibh.
			Nunc rhoncus ut massa vestibulum elementum. Maecenas vestibulum rhoncus arcu,
			sed luctus nisl auctor vitae. Aenean porttitor ut tortor eu malesuada.
		</template>

		<br><br>

		<o-button @click="simulateLoading">
			Toggle Loading
		</o-button>
	</div>
</template>

<script>
import { OSkeletonText } from '@square/orbit/components/Skeleton';
import { OHeading } from '@square/orbit/components/Heading';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSkeletonText,
		OHeading,
		OButton,
	},

	data() {
		return {
			loaded: true,
		};
	},

	methods: {
		simulateLoading() {
			this.loaded = false;
			setTimeout(() => { this.loaded = true; }, 3000);
		},
	},
};
</script>

<style scoped>
.my-container {
	max-width: 500px;
}
</style>
```

## Skeleton Media
A fullwidth gray rectangle of varying height with a loading animation. Use to represent images or video that have not yet loaded.

Use the `ratio` prop to set the height, or apply a height in `px` with css.
```vue
<template>
	<div class="my-container">
		<o-skeleton-media
			v-if="!loaded"
			ratio="3:2"
		/>
		<img
			v-else
			src="https://images.unsplash.com/photo-1521464302861-ce943915d1c3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba5fc29728f58013068e4f82f47c2c1c&auto=format&fit=crop&w=500&q=60"
		>

		<br><br>

		<o-button @click="simulateLoading">
			Toggle Loading
		</o-button>
	</div>
</template>

<script>
import { OSkeletonMedia } from '@square/orbit/components/Skeleton';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSkeletonMedia,
		OButton,
	},

	data() {
		return {
			loaded: true,
		};
	},

	methods: {
		simulateLoading() {
			this.loaded = false;
			setTimeout(() => { this.loaded = true; }, 3000);
		},
	},
};
</script>

<style scoped>
.my-container {
	max-width: 500px;
}

img {
	width: 100%;
}
</style>
```

## API

### Skeleton Text Attributes
| Name | Type | Default | Description |
| ---- | ---- |-------- |------------ |
| lines | `number` | `1` | Changes the number of lines to be generated. |
| theme | `String` | `dark` | Changes the color of the skeleton.<br>Valid values: `dark`, `light` |
| variant | `String` | `text` | Changes the size and characteristics of the lines.<br>Valid values: `text`, `title`, `subtitle`

### Skeleton Media Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| ratio | `String` | - | Sets the size of the skeleton.<br>Valid values: `1:1`, `3:2`, `4:3`, `5:3`, `16:9`. |
| theme | `String` | `dark` | Changes the color of the skeleton.<br>Valid values: `dark`, `light` |
