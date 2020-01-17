# Loading

A loading indicator can be added anywhere you need to signify a loading state. If you are adding a loading indicator to one of our current components, please double check that that component doesn't already have a loading state built in.

```vue
<template>
	<o-loading />
</template>

<script>
import { OLoading } from '@square/orbit/components/Loading';

export default {
	components: {
		OLoading,
	},
};
</script>
```

## Spinner variant

```vue
<template>
	<o-loading variant="spinner" />
</template>

<script>
import { OLoading } from '@square/orbit/components/Loading';

export default {
	components: {
		OLoading,
	},
};
</script>
```

## Custom Loading with Overlay
This example explains how to add a loading state with an overlay to a component without an existing loading state.

```vue
<template>
	<o-card
		title="Loading Card"
		class="card"
		@click="cardClicked"
	>
		<p>This is the loaded card content.</p>
		<o-button
			variant="primary"
			@click="startLoading"
		>
			Start Loading
		</o-button>

		<div
			v-if="isLoading"
			class="overlay"
		>
			<o-loading class="loading" />
		</div>
	</o-card>
</template>

<script>
import { OCard } from '@square/orbit/components/Card';
import { OLoading } from '@square/orbit/components/Loading';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OCard,
		OLoading,
		OButton,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		cardClicked() {},
		startLoading() {
			this.isLoading = true;

			// Timeout is simulating a waiting period for visual effect
			setTimeout(() => {
				this.isLoading = false;
			}, 1300);
		},
	},
};
</script>

<style scoped>
.card {
	position: relative;
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, 0.8);
}

.loading {
	align-items: center;
	height: 100%;
}
</style>
```

## Attributes

| Name | Type    | Default | Description            |
| --------- |----------------------- |-------- |--------------------------------------
| `variant` | `String` <br> `spinner-large`, `spinner` | `spinner-large` | Changes loading indicator style |
