# Button Group

A set of buttons that display conjoined in a row.

Use button group as an alternative to radio buttons when you want the user to choose a single option from a set. There are a couple of scenarios, one being in a text formatting toolbar, that allowing the selection of multiple options makes sense and can be  enabled.

A less common scenario is have a button group with no selectable buttons. Use this when grouping two related actions like Undo/Redo.

## Examples

### Single select

Allow selecting a single option from a set. Similar in behavior to radio buttons, but providing a bigger visual affordance for clicking.

With the `single-select` mode, once an option is selected, you cannot unselect that option. If you want to allow the user to unselect the current option, use the `single-select-optional` mode.


```vue
<template>
	<div>
		<o-button-group
			v-model="size"
			mode="single-select"
		>
			<o-button-group-item value="small">
				Small
			</o-button-group-item>
			<o-button-group-item value="medium">
				Medium
			</o-button-group-item>
			<o-button-group-item value="large">
				Large
			</o-button-group-item>
		</o-button-group>
		<p>Selected value (v-model): {{ size }}</p>

		<o-button-group
			v-model="align"
			mode="single-select-optional"
		>
			<o-button-group-item value="left">
				<o-icon name="align-left" />
			</o-button-group-item>
			<o-button-group-item value="center">
				<o-icon name="align-center" />
			</o-button-group-item>
			<o-button-group-item value="right">
				<o-icon name="align-right" />
			</o-button-group-item>
		</o-button-group>
		<p>Selected value (v-model): {{ align }}</p>
	</div>
</template>
<script>
import { OButtonGroup, OButtonGroupItem } from '@square/orbit/components/ButtonGroup';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OButtonGroup,
		OButtonGroupItem,
		OIcon,
	},

	data() {
		return {
			size: 'small',
			align: null,
		};
	},
};
</script>
```


### Multi select

Allow selecting a multiples option from a set.

```vue
<template>
	<div>
		<o-button-group
			v-model="fontStyles"
			mode="multi-select"
		>
			<o-button-group-item value="bold">
				Bold
			</o-button-group-item>
			<o-button-group-item value="italic">
				Italic
			</o-button-group-item>
		</o-button-group>
		<p>Selected value(s): {{ fontStyles }}</p>
	</div>
</template>

<script>
import { OButtonGroup, OButtonGroupItem } from '@square/orbit/components/ButtonGroup';

export default {
	components: {
		OButtonGroup,
		OButtonGroupItem,
	},

	data() {
		return {
			fontStyles: ['bold'],
		};
	},
};
</script>
```

### Normal buttons (Not selectable)

These buttons behave as normal, default buttons and are not able to be selected.

For this mode of button group, you don't need to define a `value` property on ButtonGroup or ButtonGroupItem.

```vue
<template>
	<o-button-group>
		<o-button-group-item>
			<o-icon name="arrow-undo" /> Undo
		</o-button-group-item>
		<o-button-group-item>
			<o-icon name="arrow-redo" /> Redo
		</o-button-group-item>
	</o-button-group>
</template>
<script>
import { OButtonGroup, OButtonGroupItem } from '@square/orbit/components/ButtonGroup';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OButtonGroup,
		OButtonGroupItem,
		OIcon,
	},
};
</script>
```

### Nested ButtonGroups

You can nest multiple ButtonGroups inside of a parent ButtonGroup to join them into a toolbar.

Use this nesting structure when you have sets of buttons in the same toolbar that behave differently (ex. normal vs single-select vs multi-select). In this example, the bold and italic font style buttons can both be selected at the same time and are unaffected by the other buttons in the toolbar. The number and bullet list buttons allow only one option to be selected at a time and are also not affected by the other buttons in the toolbar.

```vue
<template>
	<div>
		<o-button-group	size="small">
			<o-button-group
				v-model="fontStyles"
				mode="multi-select"
			>
				<o-button-group-item value="bold">
					<o-icon name="text-bold" />
				</o-button-group-item>
				<o-button-group-item value="italic">
					<o-icon name="text-italic" />
				</o-button-group-item>
			</o-button-group>
			<o-button-group
				v-model="align"
				mode="single-select-optional"
			>
				<o-button-group-item value="left">
					<o-icon name="align-left" />
				</o-button-group-item>
				<o-button-group-item value="center">
					<o-icon name="align-center" />
				</o-button-group-item>
				<o-button-group-item value="right">
					<o-icon name="align-right" />
				</o-button-group-item>
			</o-button-group>

			<o-button-group>
				<o-button-group-item>
					<o-icon name="arrow-undo" /> Undo
				</o-button-group-item>
				<o-button-group-item>
					<o-icon name="arrow-redo" /> Redo
				</o-button-group-item>
			</o-button-group>
		</o-button-group>

		<p>
			Font style(s): {{ fontStyles }}<br>
			Text alignment: {{ align }}
		</p>
	</div>
</template>
<script>
import { OButtonGroup, OButtonGroupItem } from '@square/orbit/components/ButtonGroup';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OButtonGroup,
		OButtonGroupItem,
		OIcon,
	},
	data() {
		return {
			fontStyles: ['bold'],
			align: null,
		};
	},
};
</script>
```

### Flush ButtonGroups

You can make ButtonGroups flush on a side to anchor them to other elements. This removes the border radii on that side, giving it a flat edge.

```vue
<template>
	<div class="container">
		<div class="box" />
		<o-button-group
			size="small"
			flush="top"
			full-width
		>
			<o-button-group-item>
				<o-icon name="pencil" /> Edit
			</o-button-group-item>
			<o-button-group-item>
				<o-icon name="arrow-redo" /> Replace
			</o-button-group-item>
			<o-button-group-item>
				<o-icon name="trashcan" /> Delete
			</o-button-group-item>
		</o-button-group>
	</div>
</template>

<script>
import { OButtonGroup, OButtonGroupItem } from '@square/orbit/components/ButtonGroup';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OButtonGroup,
		OButtonGroupItem,
		OIcon,
	},
	data() {
		return {
			size: 'small',
			listType: null,
			fontStyles: ['bold'],
		};
	},
};
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	max-width: 320px;
}
.box {
	height: 128px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border: 1px solid #adb1b5;
	border-bottom-width: 0;
	background: #d5d9dc;
}
</style>
```

## API

### Button Group Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `v-model` | - | - | A user defined **variable** that is set equal to the **value** of the **selected** button group item. If left undefined, no button will be selected on initialization. |
| `size` |  `String` <br> `small`, `medium`, `large` | `medium` | Size of buttons within the button group |
| `disabled` | `Boolean` | `false` | Setting this to true will disable all items within the button group |
| `mode` | `String`<br>`normal`, `multi-select`, `single-select`, `single-select-optional` | `normal` | `normal` has no functional difference from buttons.<br> `multi-select` is a set of buttons where multiple can be toggled off or on at a time. <br>`single-select` is a set of buttons where only one button can be selected at a time, and a selected option cannot be deselected.<br>`single-select-optional` is a set of buttons where only one button can be selected at a time, and a selected option can be deselected. |
| `flush` | `String | Array`<br>`top`, `left`, `right`, `bottom` | - | Set this to which sides you'd like the ButtonGroup to be flush to. |
| `full-width` | `Boolean` | `false` | Setting this to true will make the button group full width. |


### Button Group Events
| Name | Arguments | Triggers when... |
| ---- | ----| ----|
| `button-group:update` | New value | Triggers when the selected value of the Button Group is updated. |

### Button Group Item Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `v-model` | - | - | Set equal to the **value** of the **selected** button. If left undefined, it will not be selected on initialization. |
| `size` |  `String` | `medium` | `small`, `medium`, `large` sets the size of the button. |
| `disabled` | `Boolean` | `false` | Disables the toggle button. |