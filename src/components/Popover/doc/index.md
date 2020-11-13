# Popover
Popovers provide extra contextual information or actions triggered from any other component you wish. Typically, Popovers will be used for menus, guided help, inline options or confirmations, etc.

## Examples
A parent with a mountable layer is required for this component to work properly. All the examples below assume that your application has a parent `OLayout` with layers enabled with the `has-layers` prop. See the [OLayout](/components/Layout) docs for more information.

```vue
<template>
	<div>
		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button @click="popover.toggle()">
					Open Popover
				</o-button>
			</template>

			Hello World
		</o-popover>

		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button @click="popover.toggle()">
					Popover with close button
				</o-button>
			</template>

			<template slot-scope="popover">
				Click outside to close. Or click the following button:<br><br>
				<o-button
					variant="primary"
					@click="popover.close()"
				>
					Close
				</o-button>
			</template>
		</o-popover>

		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button
					:selected="popover.isOpen"
					@click="popover.toggle()"
				>
					Popover with open state
				</o-button>
			</template>

			<template slot-scope="popover">
				Click outside to close. Or click the following button:<br><br>
				<o-button
					variant="primary"
					@click="popover.close()"
				>
					Close
				</o-button>
			</template>
		</o-popover>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OPopover } from '@square/orbit/components/Popover';

export default {
	components: {
		OButton,
		OPopover,
	},
};
</script>
```

## Popover Placement
Can control where the popover opens relative to your target element using `placement`.

```vue
<template>
	<div class="examples">
		<div
			v-for="placement in placements"
			:key="placement"
			class="example"
		>
			<o-popover :placement="placement">
				<template
					slot="action"
					slot-scope="popover"
				>
					<o-button @click="popover.toggle()">
						Open {{ placement }}
					</o-button>
				</template>
				{{ placement }}
			</o-popover>
		</div>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OPopover } from '@square/orbit/components/Popover';

export default {
	components: {
		OButton,
		OPopover,
	},
	data() {
		return {
			placements: OPopover.supportedPlacements,
		};
	},
};
</script>

<style scoped>
.examples {
	display: flex;
	flex-wrap: wrap;
	min-width: 510px;
	margin: 0 auto;
	width: 80%;
}
.example {
	min-width: calc(30% - 20px);
	flex: 1 0 auto;
	display: flex;
	justify-content: center;
	margin: 10px;
}
</style>
```

## Popover Placement with Offset
The `offset` property can further control where your popover opens relative to your target element.

```vue
<template>
	<div>
		<o-popover
			placement="right"
			offset="50, 100"
		>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button @click="popover.toggle()">
					Open right with offset
				</o-button>
			</template>
			50px off main-axis, 100px off cross-axis
		</o-popover>
		<o-popover
			placement="top"
			offset="-50, 100"
		>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button @click="popover.toggle()">
					Open top with offset
				</o-button>
			</template>
			-50px off main-axis, 100px off cross-axis
		</o-popover>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OPopover } from '@square/orbit/components/Popover';

export default {
	components: {
		OButton,
		OPopover,
	},
};
</script>

```

## Popover Menu
This demo opens an [ONav](/components/Nav) with `variant="menu"`. Clicking on any of the links closes the popover.

```vue
<template>
	<div>
		default theme:<br>
		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button @click="popover.toggle()">
					Open Popover
				</o-button>
			</template>

			<o-nav
				slot-scope="popover"
				variant="menu"
			>
				<o-nav-link @click="handleClick(popover, 'First Link')">
					First Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Second Link')">
					Second Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Third Link')">
					Third Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Fourth Link')">
					Fourth Link
				</o-nav-link>
			</o-nav>
		</o-popover>

		<br><br>dark theme:<br>

		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button
					variant="dark"
					@click="popover.toggle()"
				>
					Open Popover
				</o-button>
			</template>

			<o-nav
				slot-scope="popover"
				variant="menu"
				theme="light"
			>
				<o-nav-link @click="handleClick(popover, 'First Link')">
					First Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Second Link')">
					Second Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Third Link')">
					Third Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Fourth Link')">
					Fourth Link
				</o-nav-link>
			</o-nav>
		</o-popover>

		<p>Closed with: {{ closedWith }}</p>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ONav, ONavLink } from '@square/orbit/components/Nav';
import { OPopover } from '@square/orbit/components/Popover';

export default {
	components: {
		OButton,
		ONav,
		ONavLink,
		OPopover,
	},

	data() {
		return {
			closedWith: '',
		};
	},

	methods: {
		handleClick(popover, clickedLink) {
			popover.close();
			this.closedWith = clickedLink;
		},
	},
};
</script>
```


## Contextual Menu for Table Items
Use `@click.stop` if you want to prevent `rowClick` events when your popover action is clicked.

```vue
<template>
	<o-table
		:row-data="tableData"
	>
		<o-table-col property="name">
			Planet
		</o-table-col>
		<o-table-col property="rings">
			Rings
		</o-table-col>
		<o-table-col
			align="right"
			width="100px"
		>
			<template
				slot="formatter"
			>
				<o-popover>
					<template
						slot="action"
						slot-scope="popover"
					>
						<o-button
							variant="muted"
							@click.stop="popover.toggle()"
						>
							<o-icon name="more" />
						</o-button>
					</template>

					<o-nav
						variant="menu"
						secondary
					>
						<o-nav-link @click="addRing">
							Add Ring
						</o-nav-link>
						<o-nav-link>Remove Ring</o-nav-link>
					</o-nav>
				</o-popover>
			</template>
		</o-table-col>
	</o-table>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';
import { ONav, ONavLink } from '@square/orbit/components/Nav';
import { OPopover } from '@square/orbit/components/Popover';
import { OTable, OTableCol } from '@square/orbit/components/Table';

export default {
	components: {
		OButton,
		OIcon,
		ONav,
		ONavLink,
		OPopover,
		OTable,
		OTableCol,
	},

	data() {
		return {
			tableData: [
				{
					name: 'Jupiter',
					rings: 2,
				},
				{
					name: 'Saturn',
					rings: 3,
				},
				{
					name: 'Uranus',
					rings: 0,
				},
				{
					name: 'Neptune',
					rings: 1,
				},
			],
		};
	},

	methods: {
		addRing() {
			// Insert ring adding logic here
		},
	},
};
</script>
```

## Attributes
| Name | Type | Default | Description |
| - | - | - | - |
| `placement` | `String` | `bottom-start` | Placement of popover.<br>Supports: `auto`, `auto-start`, `auto-end`, `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end` |
| `offset` | `Number`, `String` | `0, 4` | Offset from placement.<br>Supports single number, or comma-delimited String of up to 2 numbers with optional units, where the supported units are `px` (default), `%` (percentage relative to length of target element), `%p` (percentage relative to length of popover element), `vw`, `vh`. |
| `flush` | `Boolean` | `false` | Removes padding around default slot content inside the Popover. |

## Slots
| Name | Description |
| ---- | ----------- |
| `default` | The Popover content.<br><br>Use a scoped-slot to get access to the 'close' method. Ex. `<template slot-scope="popover"><o-button @click="popover.close()"></template>`  |
| `action` | The content, usually a button, that is used to toggle open the Popover.<br><br>Use a scoped-slot to get access to the 'toggle' method. Eg. `<template slot-scope="popover"><o-button @click="popover.toggle()"></template>` |


## Events
| Name | Arguments | Triggers when... |
| ---- | --------- | ---------------- |
| `open` | - | The popover has been opened |
| `close` | - | The popover has been closed |
