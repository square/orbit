# Tabs

Use tabs to show different views of the same data collection. For example, on an _Orders_ page, show tabs for _All Orders_, _Pending_, and _Completed_.

Tabs should not be used as navigation. On clicking a new tab, the user should remain on the same page, and no entry should be added to their browser's navigation history.

## Examples

```vue
<template>
	<o-tabs>
		<o-tab-pane label="Mercury">
			Mercury is the smallest and innermost planet in the Solar System.
		</o-tab-pane>
		<o-tab-pane label="Venus">
			Venus is the 2nd planet from the Sun, orbiting it every 224.7 Earth days.
		</o-tab-pane>
		<o-tab-pane label="Earth">
			Earth is the 3rd planet from the Sun and the only object in the Universe known to
			harbor life.
		</o-tab-pane>
		<o-tab-pane label="Mars">
			Mars is the 4th planet from the Sun and the 2nd smallest planet in the Solar System.
		</o-tab-pane>
	</o-tabs>
</template>

<script>
import { OTabs, OTabPane } from '@square/orbit/components/Tabs';

export default {
	components: {
		OTabs,
		OTabPane,
	},
};
</script>
```

### Positioning options
You can position your tabs either at the `top` of the content (by default), or to the `left` by using the `position` property. More positioning options may be provided in the future as needed.

If you need to set the width of a left positioned tab sidebar you can use the `label` slot to wrap your label content in a div. Then, style the wrapping div to have a certain min or max width as shown below.

```vue
<template>
	<o-tabs position="left">
		<o-tab-pane>
			<div
				slot="label"
				class="tabLabel"
			>
				Jupiter
			</div>
			Jupiter is the fifth planet from the Sun and the largest in the Solar System.
		</o-tab-pane>
		<o-tab-pane label="Saturn">
			Saturn is the sixth planet from the Sun and the second-largest in the Solar System,
			after Jupiter.
		</o-tab-pane>
		<o-tab-pane label="Uranus">
			Uranus is the seventh planet from the Sun, and it's definitely not your butt.
		</o-tab-pane>
		<o-tab-pane label="Neptune">
			Neptune is the eighth and farthest known planet from the Sun in the Solar System.
		</o-tab-pane>
	</o-tabs>
</template>

<script>
import { OTabs, OTabPane } from '@square/orbit/components/Tabs';

export default {
	components: {
		OTabs,
		OTabPane,
	},
};
</script>
<style scoped>
.tabLabel {
	min-width: 100px;
}
</style>
```

### Adding icons in labels

Highlight tabs by adding icons to the label.

Use the `label` slot, instead of the `label` prop, to add icons and other components.

```vue
<template>
	<o-tabs>
		<o-tab-pane>
			<template slot="label">
				Mercury
				<o-icon name="bolt" />
			</template>
			Mercury is the smallest and innermost planet in the Solar System.
		</o-tab-pane>
		<o-tab-pane label="Venus">
			Venus is the 2nd planet from the Sun, orbiting it every 224.7 Earth days.
		</o-tab-pane>
		<o-tab-pane label="Earth">
			Earth is the 3rd planet from the Sun and the only object in the Universe known to
			harbor life.
		</o-tab-pane>
		<o-tab-pane label="Mars">
			Mars is the 4th planet from the Sun and the 2nd smallest planet in the Solar System.
		</o-tab-pane>
	</o-tabs>
</template>

<script>
import { OTabs, OTabPane } from '@square/orbit/components/Tabs';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OTabs,
		OTabPane,
		OIcon,
	},
};
</script>
```

### Horizontal Alignment
Tabs can be aligned to the left, center, right, or stretched to fill the entire row.

```vue
<template>
	<div>
		<o-tabs>
			<o-tab-pane label="Left aligned (default)" />
			<o-tab-pane label="Tab #2" />
			<o-tab-pane label="Tab #3" />
			<o-tab-pane label="Tab #4" />
		</o-tabs>

		<o-tabs align="center">
			<o-tab-pane label="Center aligned" />
			<o-tab-pane label="Tab #2" />
			<o-tab-pane label="Tab #3" />
			<o-tab-pane label="Tab #4" />
		</o-tabs>

		<o-tabs align="right">
			<o-tab-pane label="Right aligned" />
			<o-tab-pane label="Tab #2" />
			<o-tab-pane label="Tab #3" />
			<o-tab-pane label="Tab #4" />
		</o-tabs>

		<o-tabs align="stretch">
			<o-tab-pane label="Stretched to fill row" />
			<o-tab-pane label="Tab #2" />
			<o-tab-pane label="Tab #3" />
			<o-tab-pane label="Tab #4" />
		</o-tabs>
	</div>
</template>

<script>
import { OTabs, OTabPane } from '@square/orbit/components/Tabs';

export default {
	components: {
		OTabs,
		OTabPane,
	},
};
</script>
```

### Dynamically change the active tab

The active tab can be changed from button clicks and other events.

Pass in a v-model to keep track of the active tab and adjust it dynamically.

```vue
<template>
	<div>
		<o-button @click="gotoNextTab()">
			Next Tab
		</o-button>
		<br><br>

		<o-tabs v-model="tabIdx">
			<o-tab-pane label="Mercury">
				Mercury is the smallest and innermost planet in the Solar System.
			</o-tab-pane>

			<o-tab-pane label="Venus">
				Venus is the 2nd planet from the Sun, orbiting it every 224.7 Earth days.
			</o-tab-pane>

			<o-tab-pane label="Earth">
				Earth is the 3rd planet from the Sun and the only object in the Universe known to
				harbor life.
			</o-tab-pane>

			<o-tab-pane label="Mars">
				Mars is the 4th planet from the Sun and the 2nd smallest planet in the Solar System.
			</o-tab-pane>
		</o-tabs>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OTabs, OTabPane } from '@square/orbit/components/Tabs';

export default {
	components: {
		OButton,
		OTabs,
		OTabPane,
	},
	data() {
		return {
			tabIdx: 0,
		};
	},
	methods: {
		gotoNextTab() {
			this.tabIdx = (this.tabIdx + 1) % 4;
		},
	},
};
</script>
```

## API

### Tabs Attributes
| Name                | Type      | Default  | Description                     |
| ------------------- |---------- | -------- |-------------------------------- |
| `tab-idx` (v-model) | `Number`  | 0        | _Optional._ The index of the active tab. |
| `align`             | `String`  | `left`   | Change the horizontal alignment of the tabs.<br><br>`left`, `center`, `right`, `stretch` |
| `position` | `String` | `top` | Change where the tabs will be positioned relative to the tab content. <br><br>`top`, `left` |

### Tab Pane Attributes
| Name                | Type      | Default  | Description                     |
| ------------------- |---------- | -------- |-------------------------------- |
| `label`             | `String`  | —        | The tab label.                  |

### Tabs Events
| Name          | Arguments     | Triggers when...         |
| ------------- | ------------- | ------------------------ |
| `tabs:change` | `newIdx`      | A new tab is selected.   |

### Tab Pane Slots
| Name | Description |
| ---- | ----------- |
| `label` | Title of tab |
