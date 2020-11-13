# Nested Drag

The NestedDrag component allows users to arbitrarily sort items in nested lists using drag & drop.

Our drag will handle text-overflow, but if you need to do some custom styling with your own markup you may need to re-enable this behavior by adding [your own CSS styles](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow).

## Examples

```vue
<template>
	<div class="demo">
		<o-nested-drag v-model="items" />

		<pre>{{ JSON.stringify(items, 0, 4) }}</pre>
	</div>
</template>

<script>
import { ONestedDrag } from '@square/orbit/components/NestedDrag';

export default {
	components: {
		ONestedDrag,
	},
	data() {
		return {
			items: [
				{
					label: 'Shop',
					children: [
						{
							label: 'Featured',
							children: [
								{
									label: 'New Arrivals',
								},
								{
									label: 'Subscriptions',
								},
								{
									label: 'Succulents',
								},
							],
						},
						{
							label: 'Collections',
						},
						{
							label: 'Light',
						},
					],
				},
				{
					label: 'Plant Care',
				},
				{
					label: 'Weekly Workshops',
				},
			],
		};
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
}

pre {
	font-size: 10px;
}
</style>
```

### Constrain Maximum Nesting Depth

```vue
<template>
	<div class="demo">
		<h4>Flat List</h4>
		<o-nested-drag
			v-model="flatItems"
			:max-depth="0"
		/>
		<h4>List with at most 1 level of nesting</h4>
		<o-nested-drag
			v-model="nestedItems"
			:max-depth="1"
		/>
	</div>
</template>

<script>
import { ONestedDrag } from '@square/orbit/components/NestedDrag';

const genItems = () => ([
	{
		label: 'Shop',
	},
	{
		label: 'Plant Care',
	},
	{
		label: 'Weekly Workshops',
	},
	{
		label: 'Succulents',
	},
	{
		label: 'New Arrivals',
	},
]);

export default {
	components: {
		ONestedDrag,
	},
	data() {
		return {
			flatItems: genItems(),
			nestedItems: genItems(),
		};
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
}
</style>
```

### Add Actions to Items & Borderless

```vue
<template>
	<div class="demo">
		<o-nested-drag
			v-model="items"
			borderless
			:max-depth="maxDepth"
		>
			<template
				slot="actions"
				slot-scope="{ item, parent, depth }"
			>
				<div class="actions">
					<o-popover>
						<template
							slot="action"
							slot-scope="popover"
						>
							<o-icon
								name="more"
								@click="popover.toggle()"
							/>
						</template>

						<o-nav
							slot-scope="popover"
							variant="menu"
						>
							<o-nav-link @click="popover.close(), makeExciting(item)">
								Make exciting
							</o-nav-link>
							<o-nav-link @click="popover.close(), removeItem(parent, item)">
								Remove
							</o-nav-link>
						</o-nav>
					</o-popover>

					<o-icon
						v-if="depth <= maxDepth"
						name="plus"
						@click="addChildItem(item)"
					/>
				</div>
			</template>
		</o-nested-drag>
	</div>
</template>

<script>
import Vue from 'vue';
import { ONestedDrag } from '@square/orbit/components/NestedDrag';
import { OIcon } from '@square/orbit/components/Icon';
import { ONav, ONavLink } from '@square/orbit/components/Nav';
import { OPopover } from '@square/orbit/components/Popover';

const names = [
	'Pancakes',
	'Seasonal Syrups',
	'Potted Plants',
	'Wildlife',
	'Giraffes',
	'Old Classics',
	'Shades of Purple',
	'Rugged Raisins',
	'Caviar',
	'Shovels',
	'Monthly Membership',
];

function genNewItem() {
	const idx = Math.floor(Math.random() * names.length);
	return {
		label: names[idx],
	};
}

export default {
	components: {
		ONestedDrag,
		OIcon,
		OPopover,
		ONav,
		ONavLink,
	},
	data() {
		return {
			maxDepth: 5, // default
			popoverMenu: null, // ref to last opened popover
			items: [
				{
					label: 'Shop',
					children: [
						{
							label: 'Featured',
							children: [
								{
									label: 'New Arrivals',
								},
							],
						},
						{
							label: 'Collections',
							children: [],
						},
					],
				},
				{
					label: 'Plant Care',
				},
			],
		};
	},
	methods: {
		removeItem(parent, item) {
			const idx = parent.indexOf(item);
			parent.splice(idx, 1);
		},
		makeExciting(item) {
			item.label += '!!';
		},
		addChildItem(item) {
			if (!item.children) {
				Vue.set(item, 'children', []);
			}
			item.children.push(genNewItem());
		},
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
}

.actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 48px;
}
</style>
```

### Customize Item Labels

```vue
<template>
	<div class="demo">
		<o-nested-drag
			v-model="items"
		>
			<template
				slot="label"
				slot-scope="{ item, depth }"
			>
				<o-icon name="alert-circle" /> {{ `${item.label.toUpperCase()} @ depth ${depth}` }}
			</template>
		</o-nested-drag>
	</div>
</template>

<script>
import { ONestedDrag } from '@square/orbit/components/NestedDrag';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		ONestedDrag,
		OIcon,
	},
	data() {
		return {
			items: [
				{
					label: 'Shop',
					children: [
						{
							label: 'Featured',
							children: [
								{
									label: 'New Arrivals',
								},
							],
						},
						{
							label: 'Collections',
						},
					],
				},
				{
					label: 'Plant Care',
				},
			],
		};
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
}
</style>
```

### Constrain List Height with a Scrollable Parent

Nested Drag supports auto-scrolling its nearest scrollable parent while the user is dragging an item

```vue
<template>
	<div class="demo">
		<o-button>some other content inside the parent</o-button><br><br>
		<o-nested-drag
			v-model="items"
			style="background: white;"
		/><br>
		<o-button>some other content inside the parent</o-button>
	</div>
</template>

<script>
import { ONestedDrag } from '@square/orbit/components/NestedDrag';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		ONestedDrag,
		OButton,
	},
	data() {
		return {
			items: [
				{
					label: 'Shop',
					children: [
						{
							label: 'Featured',
							children: [
								{
									label: 'New Arrivals',
								},
								{
									label: 'Subscriptions',
								},
								{
									label: 'Succulents',
								},
							],
						},
						{
							label: 'Collections',
						},
						{
							label: 'Light',
						},
					],
				},
				{
					label: 'Plant Care',
				},
				{
					label: 'Weekly Workshops',
				},
			],
		};
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
	height: 240px;
	overflow: auto;
	background: #f6f6f6;
	border: 2px solid black;
}

pre {
	font-size: 10px;
}
</style>
```

### Restricting Droppable Areas
Using the `onDragOver` prop, you can pass in a hook that determines whether it's possible to drag an item into a dropzone. The hook provides the following data:
```json5
{
	draggingItem: Object, // The item being dragged
	dragFrom: Object, // The parent of the item that's being dragged
	dragTo: Object, // The target the drag entered into
	dragToPosition: <Array>{ depth: Number } // The path of the target that the draggingItem is hovering over
}
```

If the item cannot be dragged into the target, return `false`. Since the hook is a function, it's agnostic to how you reflect the relationship of your data.

In the following example, we added an `item` boolean property that if `true`, indicates it always must be under a non-item parent.
```vue
<template>
	<div class="demo">
		<o-nested-drag
			v-model="items"
			:on-drag-over="onDragOver"
		/>

		<pre>{{ JSON.stringify(items, 0, 4) }}</pre>
	</div>
</template>

<script>
import { ONestedDrag } from '@square/orbit/components/NestedDrag';

export default {
	components: {
		ONestedDrag,
	},
	data() {
		return {
			items: [
				{
					label: 'Category A',
					type: 'category',
					children: [
						{
							label: 'Item A',
							type: 'item',
						},
						{
							label: 'Item B',
							type: 'item',
						},
					],
				},
				{
					label: 'Category B',
					type: 'category',
					children: [
						{
							label: 'Item C',
							type: 'item',
						},
					],
				},
			],
		};
	},

	methods: {
		onDragOver({ draggingItem, dragTo }) {
			// If the item being dragged is an item...
			if (draggingItem.type === 'item') {
				// and it's being dragged to the top-level: block action
				if (!dragTo) { return false; }

				// and it's being dragged to another item: block action
				if (dragTo.type === 'item') { return false; }
			}

			// If the item being dragged is a category...
			if (draggingItem.type === 'category') {
				// it should never be dragged into anything else
				if (dragTo) { return false; }
			}

			return null;
		},
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
}

pre {
	font-size: 10px;
}
</style>
```

In the next example, an array property that lists the categories an item cannot belong in is declared, and the hook contains logic to enforce it.
```vue
<template>
	<div class="demo">
		<o-nested-drag
			v-model="items"
			:on-drag-over="onDragOver"
		/>

		<pre>{{ JSON.stringify(items, 0, 4) }}</pre>
	</div>
</template>

<script>
import { ONestedDrag } from '@square/orbit/components/NestedDrag';

export default {
	components: {
		ONestedDrag,
	},
	data() {
		return {
			items: [
				{
					label: 'Breakfast',
					children: [
						{
							label: 'Bacon & Eggs',
							notAllowed: ['Desserts'],
						},
						{
							label: 'French Toast (can be moved to both categories)',
							notAllowed: [],
						},
					],
				},
				{
					label: 'Desserts',
					children: [
						{
							label: 'Ice cream',
							notAllowed: ['Breakfast'],
						},
					],
				},
			],
		};
	},

	methods: {
		onDragOver({ draggingItem, dragTo }) {
			if (
				draggingItem.notAllowed && (
					!dragTo
					|| dragTo.notAllowed
					|| draggingItem.notAllowed.includes(dragTo.label)
				)
			) { return false; }

			if (!draggingItem.notAllowed && dragTo) { return false; }

			return null;
		},
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
}

pre {
	font-size: 10px;
}
</style>
```

### Restricting Draggable Items
To disable dragging on a row, set `dragDisabled: true` on its object. Combine it with the `on-drag-over` function to prevent users from rearranging items around the non-draggable item.

This following example demonstrates how to keep 'Uncategorized Items' at the bottom of the list. Whenever an item is dragged, the `dragToPosition` property is used to validate placement. `dragToPosition` is an Array that reflects the items location in the tree, and has a `depth` property that reflects its distance from the root.

```vue
<template>
	<div class="demo">
		<o-nested-drag
			v-model="items"
			:on-drag-over="onDragOver"
		/>
		<br>
		<h3>Last `onDragOver` data</h3>
		<pre>{{ JSON.stringify(lastDragged, 0, 4) }}</pre>
	</div>
</template>

<script>
import { ONestedDrag } from '@square/orbit/components/NestedDrag';

export default {
	components: {
		ONestedDrag,
	},
	data() {
		return {
			items: [
				{
					label: 'Clothing',
					children: [
						{
							label: 'Men\'s Clothing (dragDisabled)',
							dragDisabled: true,
							children: [
								{
									label: 'Ties',
								},
								{
									label: 'Bowties',
								},
							],
						},
						{
							label: 'Coat',
						},
					],
				},
				{
					label: 'Accessories',
					children: [
						{
							label: 'Scarf',
						},
					],
				},
				{
					label: 'Uncategorized Items (dragDisabled)',
					dragDisabled: true,
					children: [
						{
							label: 'Hat',
						},
					],
				},
			],
			lastDragged: null,
		};
	},

	methods: {
		onDragOver(dragData) {
			this.lastDragged = dragData;

			if (
				// If dragged to the root level
				dragData.dragToPosition.depth === 0

				// ...And after the last root item
				&& dragData.dragToPosition[0] === this.items.length
			) {
				// Block drop
				return false;
			}

			return null;
		},
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
}

pre {
	font-size: 10px;
}
</style>
```


### Accordion mode
Enable Accordion mode with the accordion prop. Every accordion will be collapsed by default, but can be opened with the `expanded` property on the item object.

```vue
<template>
	<div class="demo">
		<o-nested-drag
			v-model="items"
			accordion
		/>

		<pre>{{ JSON.stringify(items, 0, 4) }}</pre>
	</div>
</template>

<script>
import { ONestedDrag } from '@square/orbit/components/NestedDrag';

export default {
	components: {
		ONestedDrag,
	},
	data() {
		return {
			items: [
				{
					label: 'Shop',
					children: [
						{
							label: 'Featured',
							children: [
								{
									label: 'New Arrivals',
								},
								{
									label: 'Subscriptions',
								},
								{
									label: 'Succulents',
								},
							],
						},
						{
							label: 'Collections',
						},
						{
							label: 'Light',
						},
					],
				},
				{
					label: 'Plant Care',
				},
				{
					label: 'Weekly Workshops',
				},
			],
		};
	},
};
</script>

<style scoped>
.demo {
	max-width: 500px;
}

pre {
	font-size: 10px;
}
</style>
```

## API

### Attributes

| Name   | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `value` (v-model) | `Array` | - | Array of items. Each item is an object with a String `label` field and an optional Array `children` field of nested items. |
| `max-depth` | `Number` | `5` | Max levels of nesting the list allows. |
| `accordion` | `Boolean` | `false` | Enable accordion mode. Items are collapsed by default. Set `expanded: true` on an item object to expand it. |
| `on-drag-over({ draggingItem, dragFrom, dragTo, dragToPosition })` | `Function` | - | A function hook that returns `false` to indicate that the target dropzone should be disabled. |
| `borderless` | `Boolean` | `false` | If set to true, the outer border will be removed. |

### Slots

| Name | Slot Scope | Description |
| - | - | - |
| `actions` | `{ parent: Array, depth: Number, item: Object }` | Actions that can be performed on the item. Props are passed via the slot-scope, the props are `item` which is the item these actions belong to, the `parent` which is the parent array which holds the item, and `depth` which is the depth of the item in the nested list. |
| `label` | `{ parent: Array, depth: Number, item: Object }` | Item's label. Props are passed via the slot-scope, the props are `item` which is the item the label belongs to, the `parent` which is the parent array which holds the item, and `depth` which is the depth of the item in the nested list. |

### Events

| Name | Arguments | Triggers when... |
| ---- | ---- | ---- |
| `drag:update` (v-model) | `newList` | Sorting has ended, returns new list. |
| `drag:start` | - | User begins dragging an item. |
| `drag:end` | - | User stops dragging an item. |
