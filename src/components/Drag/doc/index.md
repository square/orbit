# Drag

A collection of vertically stacked items that can be sorted by dragging. There is a drag handle on the left-side, but any part of the row may be pressed to begin the drag.

If there is only item in the collection, dragging will automatically be disabled.

## Examples

```vue
<template>
	<div>
		<o-drag
			v-model="satellites"
			:disabled="!isDraggable"
			@drag:update="onDragUpdate"
			@drag:sort-end="onSortEnd"
		>
			<o-drag-item
				v-for="(item, index) in satellites"
				:key="index"
				:index="index"
			>
				{{ item.name }}
			</o-drag-item>
		</o-drag>

		<br>
		<label>
			Is Draggable?
			<o-toggle v-model="isDraggable">Toggle</o-toggle>
		</label>

		<br><br>
		<o-button @click="addItem()">
			Add Item
		</o-button>
		<o-button @click="removeItem()">
			Remove Item
		</o-button>

		<pre>v-model: {{ JSON.stringify(satellites, null, 4) }}</pre>
	</div>
</template>

<script>
import { ODrag, ODragItem } from '@square/orbit/components/Drag';
import { OButton } from '@square/orbit/components/Button';
import { OToggle } from '@square/orbit/components/Toggle';

export default {
	components: {
		OButton,
		ODrag,
		ODragItem,
		OToggle,
	},
	data() {
		return {
			isDraggable: true,
			satellites: [
				{ name: 'Sputnik 1', country: 'Soviet Union' },
				{ name: 'Project SCORE', country: 'USA' },
				{ name: 'TIROS-1', country: 'USA' },
				{ name: 'Echo 1', country: 'USA' },
			],
		};
	},
	methods: {
		addItem() {
			this.satellites.push({
				name: 'Tiangong-1',
				country: 'China',
			});
		},
		removeItem() {
			this.satellites.splice(-1, 1);
		},

		onDragUpdate() {
			// Your code here. The new list gets passed in.
		},
		onSortEnd() {
			// Your code here. An object with the new and old index gets passed in.
		},
	},
};
</script>
```


### Without v-model

```vue
<template>
	<div>
		<o-drag
			:value="satellites"
			@drag:update="(val) => { satellites = val } "
		>
			<o-drag-item
				v-for="(item, index) in satellites"
				:key="index"
				:index="index"
			>
				{{ item.name }}
			</o-drag-item>
		</o-drag>

		<pre>value: {{ JSON.stringify(satellites, null, 4) }}</pre>
	</div>
</template>

<script>
import { ODrag, ODragItem } from '@square/orbit/components/Drag';

export default {
	components: {
		ODrag,
		ODragItem,
	},
	data() {
		return {
			satellites: [
				{ name: 'Orbita', country: 'Soviet Union' },
				{ name: 'Numbus 3', country: 'USA' },
				{ name: 'Anik 1', country: 'Canada' },
			],
		};
	},
};
</script>

```

### Reveal content on hover

Reveal content, such as action buttons, on hovering a draggable item.

This is useful when you have repeating content in each list, such as an edit icon, that can add complexity to the screen. Be cautious about hiding functionality behind hovers as this behavior is unavailable on touch devices.

The revealing is handled by CSS. No additional component props are utilized.

```vue
<template>
	<div>
		<o-drag v-model="satellites">
			<o-drag-item
				v-for="(item, index) in satellites"
				:key="index"
				:index="index"
				class="drag-item"
			>
				<div class="drag-item-layout">
					{{ item.name }}
					<o-icon
						name="more"
						class="drag-item-menu-icon"
					/>
				</div>
			</o-drag-item>
		</o-drag>
	</div>
</template>

<script>
import { ODrag, ODragItem } from '@square/orbit/components/Drag';
import { OIcon } from '@square/orbit/components/Icon';
import { OToggle } from '@square/orbit/components/Toggle';

export default {
	components: {
		ODrag,
		ODragItem,
		OIcon,
		OToggle,
	},
	data() {
		return {
			satellites: [
				{ name: 'Sputnik 1', country: 'Soviet Union' },
				{ name: 'Project SCORE', country: 'USA' },
				{ name: 'TIROS-1', country: 'USA' },
				{ name: 'Echo 1', country: 'USA' },
			],
		};
	},
};
</script>

<style scoped>
.drag-item-layout {
	display: flex;
	justify-content: space-between;
}

.drag-item-menu-icon {
	display: none;
	position: relative;
	top: 3px;
}

.drag-item:hover .drag-item-menu-icon {
	display: block;
}
</style>
```

### Footer
If you need to add a footer to drag, use the `footer` slot. Here is an example of using the footer component to add new draggable items to the array.


```vue
<template>
	<div>
		<o-drag v-model="satellites">
			<o-drag-item
				v-for="(item, index) in satelliteList"
				:key="index"
				:index="index"
				class="drag-item"
				@click="startEditing(item)"
			>
				<div class="drag-item-layout">
					<o-input
						v-if="isEditing(item)"
						ref="editInput"
						v-model="item.name"
						size="small"
						class="drag-input"
						placeholder="Item name..."
						@blur="stopEditing"
						@keyup.enter="stopEditing"
					/>
					<template v-else>
						{{ item.name }}
					</template>

					<o-icon
						name="circle-x"
						class="remove-icon"
						@click.stop="removeItem(item)"
					/>
				</div>
			</o-drag-item>

			<div
				slot="footer"
				class="footer"
				@click="addItem"
			>
				<o-button variant="text">
					<o-icon name="plus" /> Add Item
				</o-button>
			</div>
		</o-drag>
	</div>
</template>

<script>
import { ODrag, ODragItem } from '@square/orbit/components/Drag';
import { OIcon } from '@square/orbit/components/Icon';
import { OButton } from '@square/orbit/components/Button';
import { OInput } from '@square/orbit/components/Input';

export default {
	components: {
		ODrag,
		ODragItem,
		OIcon,
		OButton,
		OInput,
	},
	data() {
		return {
			satellites: [
				{
					id: Symbol('Sputnik 1'),
					name: 'Sputnik 1',
				},
				{
					id: Symbol('Project SCORE'),
					name: 'Project SCORE',
				},
				{
					id: Symbol('TIROS-1'),
					name: 'TIROS-1',
				},
				{
					id: Symbol('Echo 1'),
					name: 'Echo 1',
				},
			],
			editingItem: null,
			newItem: null,
		};
	},
	watch: {
		isEditingItem(val) {
			if (val) {
				this.focusInput();
			}
		},
	},

	methods: {
		isEditing(item) {
			return this.editingItem && (item.id === this.editingItem.id);
		},
		addItem() {
			if (!this.newItem) {
				this.newItem = {
					name: '',
					id: null,
				};
				this.editingItem = this.newItem;
			}
		},
		startEditing(item) {
			this.editingItem = item;
		},
		focusInput() {
			this.$nextTick(() => {
				this.$refs.editInput[0].focus();
			});
		},
		stopEditing() {
			if (this.newItem && this.newItem.name) {
				this.newItem.id = Symbol(this.newItem.name);
				this.satellites.push(this.newItem);
				this.newItem = null;
			} else if (this.editingItem && !this.editingItem.name) {
				this.removeItem(this.editingItem);
			}

			this.editingItem = null;
		},
		removeItem(item) {
			if (this.newItem && item.id === this.newItem.id) {
				this.newItem = null;
			} else {
				this.satellites.splice(this.satellites.indexOf(item), 1);
			}
		},
	},

	computed: {
		isEditingItem() {
			const isAddingNewItem = !!this.newItem;
			const isEditingExistingItem = !!(this.editingItem && !this.newItem);
			return isAddingNewItem || isEditingExistingItem;
		},
		satelliteList() {
			let { satellites } = this;
			if (this.newItem) {
				satellites = satellites.concat([this.newItem]);
			}
			return satellites;
		},
	},
};
</script>

<style scoped>
.drag-item {
	cursor: text;

	&:hover .remove-icon {
		visibility: visible;
	}
}

.drag-input {
	flex: 1 1 auto;
	margin: -4px 16px -4px 0;
}

.drag-item-layout {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.remove-icon {
	visibility: hidden;
	cursor: pointer;
}

.footer {
	padding: 12px;
	cursor: pointer;
}
</style>
```

## API

## Drag Attributes

| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `value` (v-model) | `Array` | - | The data for each row. The order of the data is updated on every sort change. |
| `disabled` | `Boolean` | `false` | Disables dragging. |

## Drag Events

| Name | Arguments | Triggers when... |
| ---- | ----| ----|
| `drag:update` | `newList` | Sorting has ended and includes the new list. |
| `drag:sort-end` | `{ oldIndex, newIndex }` | Sorting has ended. |
| `drag:sort-start` | `{ node, index }` | Sorting has started. |

## DragItem Attributes

| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `index` (required) | `Number` | - | This is the element's sortableIndex within it's collection.<br><br> When using a `v-for` in your template to generate your DragItems you can use the iterator's `index` to populate this prop.|

## DragItem Slots

| slot   | Description |
| ------ | ------------ |
| `handle` | Drag handle for drag item. |
