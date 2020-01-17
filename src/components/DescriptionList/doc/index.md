# DescriptionList

DescriptionLists are a way to organize and explain related information structured as key-value pairs.

## Examples

### Base Usage

```vue
<template>
	<o-description-list>
		<o-description-list-item
			term="1st term prop"
			description="1st description prop"
		/>
		<o-description-list-item>
			<template slot="term">
				2nd term slot
			</template>
			<template slot="description">
				2nd description slot
			</template>
		</o-description-list-item>
		<o-description-list-item
			term="3rd term prop"
			description="3rd description prop"
		/>
	</o-description-list>
</template>

<script>
import { ODescriptionList, ODescriptionListItem } from '@square/orbit/components/DescriptionList';

export default {
	components: {
		ODescriptionList,
		ODescriptionListItem,
	},
};
</script>
```

### Grouping information inside a Section

```vue
<template>
	<o-section
		variant="bordered"
		title="SEO"
		responsive-actions
	>
		<template slot="actions">
			<o-button variant="secondary">
				Change site description
			</o-button>
		</template>

		An important part of SEO is the description of your site that appears in search engines.

		<o-description-list class="description-list">
			<o-description-list-item
				term="Site description"
				description="My sweet awesome site"
			/>
			<o-description-list-item term="Search engine visibility">
				<template slot="description">
					<o-toggle>Hide from search engines</o-toggle>
				</template>
			</o-description-list-item>
		</o-description-list>
	</o-section>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OToggle } from '@square/orbit/components/Toggle';
import { OSection } from '@square/orbit/components/Section';
import { ODescriptionList, ODescriptionListItem } from '@square/orbit/components/DescriptionList';

export default {
	components: {
		OButton,
		OToggle,
		OSection,
		ODescriptionList,
		ODescriptionListItem,
	},
};
</script>

<style scoped>
.description-list {
	margin-top: 32px;
}
</style>
```

## API

### DescriptionList Slots

| Slot    | Description         |
| ------- |-------------------- |
| `default` | Only accepts DescriptionListItems. |

### DescriptionListItem Attributes

| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `term` | `String` | - | The key of the key-value pair. |
| `description` | `String` | - | The value of the key-value pair. |

### DescriptionListItem Slots

| Slot    | Description         |
| ------- |-------------------- |
| `term` | The key of the key-value pair. |
| `description` | The value of the key-value pair. |
