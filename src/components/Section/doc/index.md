# Section

Sections group relevant content and controls for easier consumption. Sections should have concise titles that clearly describe their contents.

When a section has actions that apply to it as a whole, group those actions in the header, ordered **right to left by importance**. The use of primary actions inside of sections should be limited, too many of them on a single page will overwhelm the user.

## Variants

### Normal
```vue
<template>
<o-section title="Section Title">
	<template slot="actions">
		<o-button variant="secondary">
			Action
		</o-button>
	</template>

	<template slot="description">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna,
		vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit.
	</template>

	<div class="demo-content">
		Content
	</div>
</o-section>
</template>

<script>
import { OSection } from '@square/orbit/components/Section';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSection,
		OButton,
	},
};
</script>

<style scoped>
.demo-content {
	padding: 24px;
	color: pink;
	text-align: center;
	border: 1px dashed pink;
}
</style>
```

### Bordered
Adds a border around the section.

Use when you want to visually group content on a page. Unlike [Cards](/components/card), these are merely containers, and do not have a click action or hover state associated with them.

```vue
<template>
<o-section
	class="section"
	title="Section Title"
	variant="bordered"
>
	<template slot="actions">
		<o-button variant="secondary">
			Action
		</o-button>
	</template>

	<template slot="description">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna,
		vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit.
	</template>

	<div class="demo-content">
		Content
	</div>
</o-section>
</template>

<script>
import { OSection } from '@square/orbit/components/Section';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSection,
		OButton,
	},
};
</script>

<style scoped>
.demo-content {
	padding: 24px;
	color: pink;
	text-align: center;
	border: 1px dashed pink;
}
</style>
```

### Raised
Similar to Bordered Sections except to be used against gray backgrounds.

```vue
<template>
	<div class="container">
		<o-section
			title="Section Title"
			variant="raised"
		>
			<template slot="actions">
				<o-button variant="secondary">
					Action
				</o-button>
			</template>

			<template slot="description">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna,
				vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit.
			</template>

			<div class="demo-content">
				Content
			</div>
		</o-section>
	</div>
</template>

<script>
import { OSection } from '@square/orbit/components/Section';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSection,
		OButton,
	},
};
</script>

<style scoped>
.container {
	background: #e5e6e7;
	padding: 48px;
}

.demo-content {
	padding: 24px;
	color: pink;
	text-align: center;
	border: 1px dashed pink;
}
</style>
```

## Responsive Actions
Add the `responsive-actions` prop to make your actions move from the top right of your section on desktop to the bottom left of your section on mobile. This is incompatible with `o-section-header` and `collapsed`.

```vue
<template>
	<o-section
		title="Section Title"
		variant="bordered"
		responsive-actions
	>
		<template slot="actions">
			<o-button variant="secondary">
				Action
			</o-button>
		</template>

		<template slot="description">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna,
			vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit.
		</template>

		<div class="demo-content">
			Content
		</div>
	</o-section>
</template>

<script>
import { OSection } from '@square/orbit/components/Section';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSection,
		OButton,
	},
};
</script>

<style scoped>
.demo-content {
	padding: 24px;
	color: pink;
	text-align: center;
	border: 1px dashed pink;
}
</style>
```

## Section Headers
Use Section Header only when you need sticky headers or collapsing functionality.

### Sticky headers
You can make the SectionHeader sticky by adding the `sticky` prop to it.
```vue
<template>
	<o-section
		class="shipping-rules"
		variant="bordered"
	>
		<o-section-header
			title="Shipping Areas & Rules"
			sticky
		>
			<o-button
				slot="actions"
				variant="secondary"
			>
				Add Shipping Area
			</o-button>
		</o-section-header>
		<o-table
			:row-data="shippingAreas"
			class="shipping-table"
		>
			<o-table-col
				property="name"
				width="60%"
			>
				Name
			</o-table-col>
			<o-table-col property="rates">
				Rates
				<template
					slot="formatter"
					slot-scope="props"
				>
					<span
						v-for="(rate, idx) in props.data.rates"
						:key="idx"
						class="shipping-table__rate"
					>
						{{ rate }}
					</span>
				</template>
			</o-table-col>
		</o-table>
	</o-section>
</template>

<script>
import { OSection, OSectionHeader } from '@square/orbit/components/Section';
import { OButton } from '@square/orbit/components/Button';
import { OTable, OTableCol } from '@square/orbit/components/Table';

export default {
	components: {
		OSection,
		OSectionHeader,
		OButton,
		OTable,
		OTableCol,
	},
	data() {
		return {
			shippingAreas: [
				{
					name: 'United States',
					rates: [
						'2 Day Shipping',
						'Overnight Shipping',
						'Free Shipping',
					],
				},
				{
					name: 'Canada & Mexico',
					rates: [
						'Ground Shipping',
						'2 Day Shipping',
					],
				},
				{
					name: 'Rest of World',
					rates: [
						'Ground Shipping',
						'Express Shipping',
					],
				},
			],
		};
	},
};
</script>

<style scoped>
.shipping-table__rate {
	display: block;
}
</style>
```

## Collapsible Sections
The `collapsed` property allows you to expand and collapse section content. We emit a `collapsed:update` event whenever the Section Header is clicked on, so you don't have to. Instead, just add the .sync modifier to the `collapsed` property to automatically listen for this event and update your data appropriately.

You can read more about the .sync modifier in the official [Vue documentation](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier).

```vue
<template>
	<o-section
		:collapsed.sync="collapsed"
		variant="bordered"
	>
		<o-section-header title="Allow in-store pickup">
			<o-toggle
				slot="actions"
				v-model="toggleCollapse"
			/>
		</o-section-header>
		<div>
			<o-checkbox
				v-model="pluto"
				sublabel="Dwarf planet in the Kuiper belt."
			>
				Pluto
			</o-checkbox>

			<o-checkbox
				v-model="ceres"
				sublabel="The only dwarf planet inside Neptune's orbit."
			>
				Ceres
			</o-checkbox>

			<o-checkbox v-model="eris">
				Eris
				<template slot="sublabel">
					Most massive and second-largest dwarf planet. <a href="https://en.wikipedia.org/wiki/Eris_(dwarf_planet)">Learn more.</a>
				</template>
			</o-checkbox>
		</div>
	</o-section>
</template>

<script>
import { OSection, OSectionHeader } from '@square/orbit/components/Section';
import { OToggle } from '@square/orbit/components/Toggle';
import { OCheckbox } from '@square/orbit/components/Checkbox';

export default {
	components: {
		OSection,
		OSectionHeader,
		OToggle,
		OCheckbox,
	},

	data() {
		return {
			collapsed: false,
			pluto: false,
			ceres: false,
			eris: false,
		};
	},

	computed: {
		toggleCollapse: {
			get() {
				return !this.collapsed;
			},
			set(val) {
				this.collapsed = !val;
			},
		},
	},
};
</script>
```

## API

### Section Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `variant` | `String`<br>`'normal'`, `'bordered'`, `'raised'` | `'normal'` | Customizes Section padding & border styles. |
| `flush` | `Boolean` | `false` | If true, the padding of the section will be removed. |
| `collapsed` | `Boolean` | `undefined` | If true or false, the SectionHeader will appear clickable and Section will emit an `update:collapsed` event when the SectionHeader is clicked. Use the .sync modifier to automatically listen to this event and keep your collapsed data object up to date. |
| `title` | `String` | - | Title of the section. Will be given the correct heading styling. Use the title slot instead if you need more than a string. |
| `responsive-actions` | `Boolean` | `false` | If true, the actions will move from the top right on desktop to the bottom of the section on mobile. Incompatible with `o-section-header` and `collapsed`. |

### Section Slots
| Slot | Description |
| ---- | ----------- |
| `actions` | Will appear in the top right side of the section. |
| `description` | Will beneath the title. |
| `title` | Title of the section. Will be given the correct heading styling. Use if you need more than a string. |

### Section Events
| Name         | Parameters         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `update:collapsed` | `(isCollapsed: Boolean)` | The SectionHeader is clicked. |

### Section Header Attributes
| Name | Type | Default | Description |
| ---- | ---- |-------- |------------ |
| `title` | `String` | - | Title of the section. Will be given the correct heading styling. |

### Section Header Slots
| Slot    | Description         |
| ------- |-------------------- |
| `default` | The title in the top left. Use the `title` attr in most cases. Use this slot only if you need to display more than a text title. |
| `actions` | Will appear in the right side of the section header. |