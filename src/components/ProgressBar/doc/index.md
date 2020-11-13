# Progress Bar

Show users how much of a flow they have completed and how much remains with a horizontal bar that fills up with a color.

## Examples

### Progress Bar

Show a progress bar in our primary brand color.

```vue
<template>
	<o-progress-bar :progress="downloadProgress" />
</template>

<script>
import { OProgressBar } from '@square/orbit/components/ProgressBar';

export default {

	components: {
		OProgressBar,
	},

	data() {
		return {
			downloadProgress: 0,
		};
	},

	mounted() {
		setInterval(() => {
			this.downloadProgress = (this.downloadProgress + (Math.random() / 10)) % 1;
		}, 500);
	},
};
</script>
```

### Progress Bar with Success Color

Show a progress bar with our success color.

Use the `success` theme when utilizing the Progress Bar alongside a Checklist.

```vue
<template>
	<o-progress-bar
		:progress="downloadProgress"
		theme="success"
	/>
</template>

<script>
import { OProgressBar } from '@square/orbit/components/ProgressBar';

export default {

	components: {
		OProgressBar,
	},

	data() {
		return {
			downloadProgress: 0,
		};
	},

	mounted() {
		setInterval(() => {
			this.downloadProgress = (this.downloadProgress + (Math.random() / 10)) % 1;
		}, 500);
	},
};
</script>
```


## Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `progress` | `Number` | `0` |  A fraction value determining the progress of the bar |
| `theme` | `String`<br> `primary` or `success`| `primary` | Determines the color of the progress bar fill. |
