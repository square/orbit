# Pagination
You can create a simple pagination component by passing in the number of pages you need to paginate and using `v-model` to store the `currentPage`.

```vue
<template>
	<div>
		<o-pagination
			v-model="currentPage"
			:pages="numPages"
		/>

		<br><br>

		Page: {{ currentPage }}/{{ numPages }}
	</div>
</template>

<script>
import { OPagination } from '@square/orbit/components/Pagination';

export default {
	components: {
		OPagination,
	},

	data() {
		return {
			numPages: 10,
			currentPage: 1,
		};
	},
};
</script>
```

## Custom Next Button
If you want to customize the "next" button, you can use the `next` slot and `nextButton` slot scope.

```vue
<template>
	<div>
		<o-pagination
			v-model="currentPage"
			:pages="numPages"
		>
			<template
				slot="next"
				slot-scope="{ nextPage, disabled }"
			>
				<o-button
					:disabled="disabled"
					@click="nextPage"
				>
					Next
					<o-icon name="arrow-right" />
				</o-button>
			</template>
		</o-pagination>

		<br><br>

		<o-pagination
			v-model="currentPage"
			:pages="numPages"
		>
			<template
				slot="next"
				slot-scope="{ nextPage, disabled }"
			>
				<o-button
					:disabled="disabled"
					variant="primary"
					@click="nextPage"
				>
					Next
					<o-icon name="arrow-right" />
				</o-button>
			</template>
		</o-pagination>

		<br><br>

		Page: {{ currentPage }}/{{ numPages }}
	</div>
</template>

<script>
import { OPagination } from '@square/orbit/components/Pagination';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OPagination,
		OButton,
		OIcon,
	},

	data() {
		return {
			numPages: 10,
			currentPage: 1,
		};
	},
};
</script>
```

## Page Selector
If you need to paginate a lot of content, it may make sense to add a page selector so users can quickly jump to the page of their choice. This is built in, and can be added with the `selectable` property.

```vue
<template>
	<o-pagination
		v-model="currentPage"
		:pages="numPages"
		selectable
	/>
</template>

<script>
import { OPagination } from '@square/orbit/components/Pagination';

export default {
	components: {
		OPagination,
	},

	data() {
		return {
			numPages: 10,
			currentPage: 1,
		};
	},
};
</script>
```

## Items Per Page
For very large sets of paginated content, you may want to give users the ability to change the number of items shown per page. To do this, you'll need data for the number of items in your data (`dataLength`), the options for the items per page (`itemsPerPageOptions`), the currently selected number of items per page (`itemsPerPage`), and the current page (`currentPage`). You can then create a computed property (`numPages`) to calculate how many pages you have based on the length of your data and items shown per page.

```vue
<template>
	<div class="pagination">
		<o-button-group
			v-model="itemsPerPage"
			mode="single-select"
		>
			<o-button-group-item :value="10">
				10
			</o-button-group-item>
			<o-button-group-item :value="50">
				50
			</o-button-group-item>
			<o-button-group-item :value="100">
				100
			</o-button-group-item>
		</o-button-group>

		<o-pagination
			v-model="currentPage"
			:pages="numPages"
			selectable
		/>
	</div>
</template>

<script>
import { OButtonGroup, OButtonGroupItem } from '@square/orbit/components/ButtonGroup';
import { OPagination } from '@square/orbit/components/Pagination';

export default {
	components: {
		OPagination,
		OButtonGroup,
		OButtonGroupItem,
	},

	data() {
		return {
			dataLength: 100, // The length of your data
			itemsPerPage: 10,
			currentPage: 1,
		};
	},

	computed: {
		numPages() {
			return Math.ceil(this.dataLength / this.itemsPerPage);
		},
	},
};
</script>

<style scoped>
.pagination {
	display: flex;
	justify-content: space-between;
}
</style>
```


## Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `pages` | `Number` | - | The number of pages |
| `current-page` | `Number` | - | The current page |
| `disabled` | `Boolean` | `false` | Disables the component |
| `selectable` | `Boolean` | `false` | Adds select for page number |

## Slots
| Name | Description | Slot Scope |
| ---- | ----------- | ---------- |
| `next` | Used to create custom content for the "next" button of the pagination. | `{ nextPage, disabled }`. `nextPage`: run this when the button is clicked to advance the pagination.<br>`disabled` disabled condition for the next button. True when on the last page. |

## Events
| Name         | Arguments         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `pagination:update` | `newPage` | The page is changed. |

