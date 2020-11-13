# Breadcrumb
The Breadcrumb displays the location of the current page for better navigation. Pass in breadcrumb links through the `crumbs` prop.

```vue
<template>
	<div>
		<o-breadcrumb :crumbs="crumbs" />

		<br><br>
		<o-button
			:disabled="queue.length <= 1"
			@click="addCrumb"
		>
			Add Crumb
		</o-button>
		<o-button
			:disabled="crumbs.length <= 1"
			@click="removeCrumb"
		>
			Remove Crumb
		</o-button>
	</div>
</template>

<script>
import { OBreadcrumb } from '@square/orbit/components/Breadcrumb';
import { OButton } from '@square/orbit/components/Button';

export default {

	components: {
		OBreadcrumb,
		OButton,
	},

	data() {
		return {
			crumbs: [
				{
					label: 'Milky Way',
					to: '/milky-way',
				},
				{
					label: 'Solar System',
					to: '/solar-system',
				},
				{
					label: 'Earth',
				},
			],

			queue: [
				{
					label: 'USA',
				},
				{
					label: 'CA',
				},
				{
					label: 'SF',
				},
			],
		};
	},

	methods: {
		addCrumb() {
			if (this.queue.length) {
				this.crumbs.push(this.queue.shift());
			}
		},
		removeCrumb() {
			if (this.crumbs.length) {
				this.queue.unshift(this.crumbs.pop());
			}
		},
	},
};
</script>
```

## Stacked Breadcrumb
```vue
<template>
	<div>
		<o-breadcrumb
			:crumbs="crumbs"
			stacked
		/>

		<br><br>
		<o-button
			:disabled="queue.length <= 1"
			@click="addCrumb"
		>
			Add Crumb
		</o-button>
		<o-button
			:disabled="crumbs.length <= 1"
			@click="removeCrumb"
		>
			Remove Crumb
		</o-button>
	</div>
</template>

<script>
import { OBreadcrumb } from '@square/orbit/components/Breadcrumb';
import { OButton } from '@square/orbit/components/Button';

export default {

	components: {
		OBreadcrumb,
		OButton,
	},

	data() {
		return {
			crumbs: [
				{
					label: 'Milky Way',
					to: '/milky-way',
				},
				{
					label: 'Solar System',
					to: '/solar-system',
				},
				{
					label: 'Earth',
				},
			],

			queue: [
				{
					label: 'USA',
				},
				{
					label: 'CA',
				},
				{
					label: 'SF',
				},
			],
		};
	},

	methods: {
		addCrumb() {
			if (this.queue.length) {
				this.crumbs.push(this.queue.shift());
			}
		},
		removeCrumb() {
			if (this.crumbs.length) {
				this.queue.unshift(this.crumbs.pop());
			}
		},
	},
};
</script>
```

## Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `crumbs`* | `Array` | — | An array of objects `{ label: String, to: String | Object }` where they represent a crumb respectively. |
| `stacked` | `Boolean` | — | Use a stacked layout. |
