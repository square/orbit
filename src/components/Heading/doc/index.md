# Heading
Create a heading component with any text inside.

By default, your text will be wrapped in a div but you can select another wrapper element by changing the `element` attribute. You can set the size of the heading using any of the specified sizes below.

Headings come with a bottom margin out of the box, but this can be removed with the `flush` prop.

```vue
<template>
	<div>
		<o-heading size="title-3">
			Do what you love
		</o-heading>
		<o-heading size="title-2">
			Do what you love
		</o-heading>
		<o-heading>Do what you love</o-heading>
		<o-heading size="display-3">
			Do what you love
		</o-heading>
		<o-heading size="display-1">
			Do what you love
		</o-heading>
	</div>
</template>

<script>
import { OHeading } from '@square/orbit/components/Heading';

export default {
	components: {
		OHeading,
	},
};
</script>
```

## Element Sizes
```vue
<template>
	<o-table
		:row-data="headingData"
		class="headings-table"
	>
		<o-table-col>
			Name
			<template
				slot="formatter"
				slot-scope="props"
			>
				<o-heading :size="props.data.name">
					{{ props.data.name }}
				</o-heading>
			</template>
		</o-table-col>
		<o-table-col property="weight">
			Weight
			<template
				slot="formatter"
				slot-scope="props"
			>
				<span :style="`font-weight: ${weightNameToNumber(props.data.weight)}`">
					{{ props.data.weight }}
				</span>
			</template>
		</o-table-col>
		<o-table-col property="mobile">
			Mobile<br>
			<div class="table-sub-heading">
				Size / Line Height
			</div>
		</o-table-col>
		<o-table-col property="desktop">
			Desktop
			<div class="table-sub-heading">
				Size / Line Height
			</div>
		</o-table-col>
	</o-table>
</template>

<script>
import { OTable, OTableCol } from '@square/orbit/components/Table';
import { OHeading } from '@square/orbit/components/Heading';

export default {
	components: {
		OTable,
		OTableCol,
		OHeading,
	},
	data() {
		return {
			headingData: [
				{
					name: 'display-1',
					weight: 'medium',
					mobile: '44/48',
					desktop: '44/52',
				},
				{
					name: 'display-2',
					weight: 'medium',
					mobile: '36/40',
					desktop: '36/48',
				},
				{
					name: 'display-3',
					weight: 'medium',
					mobile: '30/32',
					desktop: '30/40',
				},
				{
					name: 'title-1',
					weight: 'medium',
					mobile: '22/32',
					desktop: '22/32',
				},
				{
					name: 'title-2',
					weight: 'medium',
					mobile: '18/24',
					desktop: '18/24',
				},
				{
					name: 'title-3',
					weight: 'medium',
					mobile: '16/28',
					desktop: '16/28',
				},
				{
					name: 'title-4',
					weight: 'medium',
					mobile: '14/24',
					desktop: '14/24',
				},
				{
					name: 'title-5',
					weight: 'medium',
					mobile: '12/20',
					desktop: '12/20',
				},
			],
		};
	},

	methods: {
		weightNameToNumber(name) {
			if (name === 'medium') {
				return '500';
			}
			return '400';
		},
	},
};
</script>

<style scoped>
.table-sub-heading {
	font-weight: normal;
	color: #9bafc5;
}
</style>
```

## Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `element` | `String` | `div` | The HTML tag to use for the heading. Using an appropriate tag is essential for accessibility and SEO.<br /><br />Valid tags: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `div`. |
| `flush` | `Boolean` | `false` | If true, the margin-bottom of the heading will be removed. |
| `size` | `String` | `title-1` | The size of the heading. |
