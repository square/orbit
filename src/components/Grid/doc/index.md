# Grid
The Grid component allocates items into 12 grid columns and supports responsive behavior. Using a Grid will help with building horizontal layouts that need to be separated by gutters.

## Examples

```vue
<template>
	<o-grid>
		<o-grid-item class="item">
			auto
		</o-grid-item>
		<o-grid-item class="item">
			auto
		</o-grid-item>
		<o-grid-item class="item">
			auto
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

export default {
	components: {
		OGrid,
		OGridItem,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}
</style>
```

### Row Wrapping

Grid Items will wrap to the next row when the grid columns count exceeds 12.

```vue
<template>
	<o-grid>
		<o-grid-item
			:span="6"
			class="item"
		>
			span 6
		</o-grid-item>
		<o-grid-item
			:span="6"
			class="item"
		>
			span 6
		</o-grid-item>
		<o-grid-item
			:span="6"
			class="item"
		>
			span 6
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

export default {
	components: {
		OGrid,
		OGridItem,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}
</style>
```


### Setting the Width

Grid Items can be sized to a specific number of grid columns.

Set a number between 1 and 12 on the `span` attribute.

```vue

<template>
	<o-grid>
		<o-grid-item
			:span="12"
			class="item"
		>
			span 12
		</o-grid-item>
		<o-grid-item
			:span="6"
			class="item"
		>
			span 6
		</o-grid-item>
		<o-grid-item
			:span="6"
			class="item"
		>
			span 6
		</o-grid-item>
		<o-grid-item
			:span="3"
			class="item"
		>
			span 3
		</o-grid-item>
		<o-grid-item
			:span="3"
			class="item"
		>
			span 3
		</o-grid-item>
		<o-grid-item
			:span="3"
			class="item"
		>
			span 3
		</o-grid-item>
		<o-grid-item
			:span="3"
			class="item"
		>
			span 3
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

export default {
	components: {
		OGrid,
		OGridItem,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}
</style>
```

### Vertical Alignment

Grid Items can be vertically aligned to the top, middle, or bottom of a row.

```vue
<template>
	<div>
		<o-grid>
			<o-grid-item class="item first-col">
				default
			</o-grid-item>
			<o-grid-item class="item second-col">
				default
			</o-grid-item>
			<o-grid-item class="item third-col">
				default
			</o-grid-item>
			<o-grid-item class="item fourth-col">
				default
			</o-grid-item>
		</o-grid>

		<br><br>

		<o-grid vertical-align="middle">
			<o-grid-item class="item first-col">
				middle
			</o-grid-item>
			<o-grid-item class="item second-col">
				middle
			</o-grid-item>
			<o-grid-item class="item third-col">
				middle
			</o-grid-item>
			<o-grid-item class="item fourth-col">
				middle
			</o-grid-item>
		</o-grid>

		<br><br>

		<o-grid vertical-align="bottom">
			<o-grid-item class="item first-col">
				bottom
			</o-grid-item>
			<o-grid-item class="item second-col">
				bottom
			</o-grid-item>
			<o-grid-item class="item third-col">
				bottom
			</o-grid-item>
			<o-grid-item class="item fourth-col">
				bottom
			</o-grid-item>
		</o-grid>
	</div>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

export default {
	components: {
		OGrid,
		OGridItem,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}

.first-col {
	height: 80px;
}

.second-col {
	height: 160px;
}

.third-col {
	height: 120px;
}

.fourth-col {
	height: 80px;
}
</style>
```

### Same Height Grid Items

Grid items stretch vertically to fit the Grid and will all be the same height.

```vue
<template>
	<o-grid>
		<o-grid-item class="item">
			I'm an item with a bit more content than the
			other items however they will be stretched to
			be the same height as me.
		</o-grid-item>
		<o-grid-item class="item">
			Same height
		</o-grid-item>
		<o-grid-item class="item">
			Same height
		</o-grid-item>
		<o-grid-item class="item">
			Same height
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

export default {
	components: {
		OGrid,
		OGridItem,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}
</style>
```

### Responsive Resizing

You can change the size of a grid item depending on the width of the screen.

Specify different widths for different breakpoints using the breakpoint attributes (ex. `tablet-landscape, desktop`). Breakpoints follow [mobile-first design](https://www.sitepoint.com/introduction-mobile-first-media-queries/).

```vue
<template>
	<o-grid>
		<o-grid-item
			:span="12"
			:tablet-landscape="12"
			:big-desktop="4"
			class="item"
		>
			span 12 / tablet 12 / desktop 4
		</o-grid-item>
		<o-grid-item
			:span="12"
			:tablet-landscape="6"
			:big-desktop="4"
			class="item"
		>
			span 12 / tablet 6 / desktop 4
		</o-grid-item>
		<o-grid-item
			:span="12"
			:tablet-landscape="6"
			:big-desktop="4"
			class="item"
		>
			span 12 / tablet 6 / desktop 4
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

export default {
	components: {
		OGrid,
		OGridItem,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}
</style>
```

### Responsive Showing and Hiding

You can show and hide grid items depending on the width of the screen.

To show and hide grid items, toggle the native CSS `display` property. Orbit includes media query breakpoint CSS variables. Find them in `@square/orbit/vars.css`.


```vue
<template>
	<o-grid>
		<o-grid-item
			:span="12"
			:tablet-landscape="5"
			class="item"
		>
			Text Column
		</o-grid-item>
		<o-grid-item
			:span="2"
			class="spacer item"
		>
			Spacer
		</o-grid-item>
		<o-grid-item
			:span="12"
			:tablet-landscape="5"
			class="item"
		>
			<o-icon name="image" />
			Image Column
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OGrid,
		OGridItem,
		OIcon,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}

.spacer {
	display: none;
	@media (min-width: 992px) {
		display: block;
	}
}
</style>
```

### Responsive Reordering

You can change the order of grid items depending on the width of the screen.

To reorder grid items, use the native CSS `order` property. Orbit includes media query breakpoint CSS variables. Find them in `@square/orbit/vars.css`.

```vue
<template>
	<o-grid>
		<o-grid-item
			:span="12"
			class="text item"
		>
			Text Column
		</o-grid-item>
		<o-grid-item
			:span="12"
			class="image item"
		>
			<o-icon name="image" />
			Image Column
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OGrid,
		OGridItem,
		OIcon,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}

.text {
	order: 1;
	@media (min-width: 992px) {
		order: 0;
	}
}

.image {
	order: 0;
	@media (min-width: 992px) {
		order: 1;
	}
}
</style>
```

### Gutter Size

By default, grid items have `16px` of space between this. This can be reduced to `8px` with the `gutter` prop.

Use small gutters when space is limited, or when laying out form controls or buttons with size=“small”.

```vue
<template>
	<o-grid gutter="small">
		<o-grid-item class="item">
			Auto
		</o-grid-item>
		<o-grid-item class="item">
			Auto
		</o-grid-item>
		<o-grid-item class="item">
			Auto
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

export default {
	components: {
		OGrid,
		OGridItem,
	},
};
</script>

<style scoped>
@import "@square/orbit/vars.css";

.item {
	padding: var(--space-x2);
	border: 1px dashed pink;
	border-radius: var(--space-half);
	text-align: center;
}

.spacer {
	display: none;
	@media (min-width: 992px) {
		display: block;
	}
}
</style>
```

## API

### Grid Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `vertical-align`   | `String`<br>`default`, `middle`, `bottom` | `default`| The vertical alignment of grid items in a row. |
| `gutter`   | `String`<br>`medium`, `small` | `medium`| The size of the gutter between grid items. |

### Grid Slots
| Name | Description |
| ---- | ----------- |
| `default` | Accepts `OGridItem` components. |

### Grid Item Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `span` | `Number`, `String` | — | Number of columns the grid item spans by default (mobile). |
| `tablet-portrait` | `Number`, `String` | — | Number of grid columns the grid item spans on screens 600px or wider. |
| `tablet-landscape` | `Number`, `String` | — | Number of grid columns the grid item spans on screens 992px or wider. |
| `desktop` | `Number`, `String` | — | Number of grid columns the grid item spans on screens 1200px or wider. |
| `big-desktop` | `Number`, `String` | — | Number of grid columns the grid item spans on screens 1440px or wider. |


## FAQ

### Can I use custom break points with Grid Items?

Yes, but it is not recommended. Doing so puts your layout at risk, because how the Grid component sizes and lays out columns with its internal CSS could change over time and this could interfere with your custom CSS. Instead, we recommend you create your own layout elements when utilizing custom breakpoints.

Before any custom breakpoint work, confirm that the built-in breakpoints will not work.
