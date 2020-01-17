# Layout
The layout component allows you to quickly lay out your page's content and provide mountable layers to child views.

## Orbit Layers
Orbit uses Vue's [provide/inject api](https://vuejs.org/v2/api/#provide-inject) to `provide` mountable layers to child components and views. Behind the scenes, the `OLayout` provides layers for alerts, modals, popovers, toasts, etc so that these components mount in the proper order and manual z-indexes aren't needed. 

### has-layers
To enable orbit layers, add the `has-layers` prop to your `OLayout`. With this enabled, child components and views will be able to mount components like alerts and modals to these layers automatically.

**Note:** If you are using `SpringLayout` in your application, this will already be handled for you.

## Layout Header
### Basics
The layout header has a `back-actions` slot and an `actions` slot. Use the `centered` prop to center your layout header content.

```vue
<template>
	<o-layout>
		<o-layout-header
			class="highlight"
			centered
		>
			<o-button
				slot="back-action"
				variant="muted"
			>
				<o-icon name="arrow-left" /> Back
			</o-button>
			<o-heading
				size="title-2"
				flush
			>
				Layout
			</o-heading>
			<template slot="actions">
				<o-button variant="secondary">
					Secondary
				</o-button>
				<o-button variant="primary">
					Primary
				</o-button>
			</template>
		</o-layout-header>
		<br>
		<o-layout-header class="highlight">
			<o-heading
				size="title-2"
				flush
			>
				Layout
			</o-heading>
			<template slot="actions">
				<o-button variant="secondary">
					Secondary
				</o-button>
				<o-button variant="primary">
					Primary
				</o-button>
			</template>
		</o-layout-header>
	</o-layout>
</template>

<script>
import { OLayout, OLayoutHeader } from '@square/orbit/components/Layout';
import { OHeading } from '@square/orbit/components/Heading';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OLayout,
		OLayoutHeader,
		OHeading,
		OButton,
		OIcon,
	},
};
</script>

<style scoped>
.highlight {
	border: 1px dashed pink;
}
</style>
```

### Sticky Header
Fixes the Header to the top, and lets the content scrolls independently. The Header will get
a drop shadow once the content is scrolled down.

```vue
<template>
	<o-layout class="highlight">
		<o-layout-header sticky>
			Sticky Header
		</o-layout-header>
		<o-layout-content class="content">
			<div class="demo">
				Content
			</div>
		</o-layout-content>
	</o-layout>
</template>

<script>
import { OLayout, OLayoutHeader, OLayoutContent } from '@square/orbit/components/Layout';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OLayout,
		OLayoutHeader,
		OLayoutContent,
		OButton,
	},
};
</script>

<style scoped>
.highlight {
	border: 1px dashed pink;
}
.content {
	padding-top: 32px !important;
	background-color: #f5f6f7;
}
.demo {
	padding: 32px;
	color: #adb1b5;
	text-align: center;
	border: 1px dashed #adb1b5;
}
</style>
```

## Layout Content
Put your layout's content here.

```vue
<template>
	<o-layout class="highlight">
		<o-layout-header>
			Header
		</o-layout-header>
		<o-layout-content class="content">
			<div class="demo">
				Content
			</div>
		</o-layout-content>
	</o-layout>
</template>

<script>
import { OLayout, OLayoutHeader, OLayoutContent } from '@square/orbit/components/Layout';

export default {
	components: {
		OLayout,
		OLayoutHeader,
		OLayoutContent,
	},
};
</script>

<style scoped>
.highlight {
	border: 1px dashed pink;
}
.content {
	padding-top: 32px;
	background-color: #f5f6f7;
}
.demo {
	padding: 32px;
	color: #adb1b5;
	text-align: center;
	border: 1px dashed #adb1b5;
}
</style>
```

## Layout Sider
### Dynamic sider width

The _sider_ can be resized after creation.

Update the sider's `width` prop to transition to the new width.

```vue
<template>
	<o-layout class="highlight">
		<o-layout-sider
			:width="customWidth"
			class="highlight strong"
		>
			Sider
		</o-layout-sider>
		<o-layout>
			<o-layout-header class="highlight">
				Header
			</o-layout-header>
			<o-layout-content class="highlight minHeight">
				<o-button @click="setRandomWidth">
					Random sider width
				</o-button>
			</o-layout-content>
		</o-layout>
	</o-layout>
</template>

<script>
import {
 OLayout, OLayoutSider, OLayoutHeader, OLayoutContent,
} from '@square/orbit/components/Layout';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OLayout,
		OLayoutSider,
		OLayoutHeader,
		OLayoutContent,
		OButton,
	},

	data() {
		return {
			customWidth: 216,
		};
	},

	methods: {
		setRandomWidth() {
			const max = 600;
			const min = 216;
			this.customWidth = (Math.random() * (max - min)) + min;
		},
	},
};
</script>

<style scoped>
.highlight {
	border: 1px dashed pink;

	&.strong {
		border-color: red;
	}
}
.minHeight {
	min-height: 128px;
}
</style>
```

### Collapsable Sider
```vue
<template>
	<o-layout class="highlight">
		<o-layout-sider
			:collapsed="!isSidebarVisible"
			class="highlight strong"
		>
			Sider
		</o-layout-sider>
		<o-layout-content class="highlight minHeight">
			<o-button @click="isSidebarVisible = !isSidebarVisible">
				Toggle Sider
			</o-button>
		</o-layout-content>
	</o-layout>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import {
 OLayout, OLayoutSider, OLayoutHeader, OLayoutContent, OLayoutFooter,
} from '@square/orbit/components/Layout';

export default {
	components: {
		OButton,
		OLayout,
		OLayoutSider,
		OLayoutHeader,
		OLayoutContent,
		OLayoutFooter,
	},

	data() {
		return {
			isSidebarVisible: true,
		};
	},
};
</script>

<style scoped>
.highlight {
	border: 1px dashed pink;

	&.strong {
		border-color: red;
	}
}
.minHeight {
	min-height: 128px;
}
</style>
```

## Layout Footer
Layout footers should go at the bottom of layouts.

Like LayoutHeader's, you can add the `raised` prop to give the element a shadow.

```vue
<template>
	<o-layout class="highlight">
		<o-layout-content class="content">
			<div class="demo">
				Content
			</div>
		</o-layout-content>
		<o-layout-footer raised>
			Footer
		</o-layout-footer>
	</o-layout>
</template>

<script>
import { OLayout, OLayoutFooter, OLayoutContent } from '@square/orbit/components/Layout';

export default {
	components: {
		OLayout,
		OLayoutFooter,
		OLayoutContent,
	},
};
</script>

<style scoped>
.highlight {
	border: 1px dashed pink;
}

.content {
	padding-top: 32px !important;
	background: #f5f6f7;
	overflow-y: auto;
}

.demo {
	padding: 32px;
	color: #adb1b5;
	text-align: center;
	border: 1px dashed #adb1b5;
}
</style>
```

## Responsive Actions
In this demo, actions in the header move to the footer on small screens. This is accomplished by adding buttons to both the `OLayoutHeader` and `OLayoutFooter` and showing/hiding them with CSS.

Flexbox is used to style the footer buttons as 50/50 or fullwidth.

Make your layout `100vh` tall to create a fullscreen experience on mobile web.

```vue
<template>
	<o-layout class="layout">
		<o-layout-header
			title="Layout Header"
			raised
		>
			<o-button
				slot="back-action"
				variant="muted"
			>
				<o-icon name="arrow-left" /> Back
			</o-button>
			<template slot="actions">
				<o-button
					class="header-btn"
					variant="secondary"
				>
					Secondary
				</o-button>
				<o-button
					class="header-btn"
					variant="primary"
				>
					Primary
				</o-button>
			</template>
		</o-layout-header>
		<o-layout-content class="content">
			<div class="demo">
				<div>Content</div>
			</div>
		</o-layout-content>
		<o-layout-footer
			class="footer"
			raised
		>
			<o-button
				class="footer-btn"
				variant="secondary"
				full-width
			>
				Secondary
			</o-button>
			<o-button
				class="footer-btn"
				variant="primary"
				full-width
			>
				Primary
			</o-button>
		</o-layout-footer>
	</o-layout>
</template>

<script>
import {
	OLayout,
	OLayoutHeader,
	OLayoutContent,
	OLayoutFooter,
} from '@square/orbit/components/Layout';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OLayout,
		OLayoutHeader,
		OLayoutContent,
		OLayoutFooter,
		OButton,
		OIcon,
	},
};
</script>

<style>
/* Code for responsive actions */
.layout {
	height: 100vh;
}

.content {
	padding-top: 32px !important;
	background: #f5f6f7;
	overflow-y: auto;
}

.header-btn {
	display: none;

	@media (min-width: 992px) {
		display: inline-block;
	}
}

.footer {
	display: flex;

	@media (min-width: 992px) {
		display: none;
	}
}

.footer-btn + .footer-btn {
	margin-left: 8px;
}

/* Documentation demo styles */
.highlight {
	border: 1px dashed pink;
}

.demo {
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	height: calc(100% - 32px);
	padding: 32px;
	color: #adb1b5;
	text-align: center;
	border: 1px dashed #adb1b5;
}
</style>
```

## Layout Examples
### Various Arrangements
```vue
<template>
	<div>
		<o-layout class="highlight">
			<o-layout-header class="highlight">
				Header
			</o-layout-header>
			<o-layout-content class="highlight minHeight">
				Content
			</o-layout-content>
			<o-layout-footer class="highlight">
				Footer
			</o-layout-footer>
		</o-layout>

		<br>

		<o-layout class="highlight">
			<o-layout-header class="highlight">
				Header
			</o-layout-header>
			<o-layout>
				<o-layout-sider class="highlight">
					Sider
				</o-layout-sider>
				<o-layout-content class="highlight minHeight">
					Content
				</o-layout-content>
			</o-layout>
			<o-layout-footer class="highlight">
				Footer
			</o-layout-footer>
		</o-layout>

		<br>

		<o-layout class="highlight">
			<o-layout-sider class="highlight">
				Sider
			</o-layout-sider>
			<o-layout>
				<o-layout-header class="highlight">
					Header
				</o-layout-header>
				<o-layout-content class="highlight minHeight">
					Content
				</o-layout-content>
			</o-layout>
		</o-layout>
	</div>
</template>

<script>
import {
 OLayout, OLayoutSider, OLayoutHeader, OLayoutContent, OLayoutFooter,
} from '@square/orbit/components/Layout';

export default {
	components: {
		OLayout,
		OLayoutSider,
		OLayoutHeader,
		OLayoutContent,
		OLayoutFooter,
	},
};
</script>

<style scoped>
.highlight {
	border: 1px dashed pink;
}
.minHeight {
	min-height: 128px;
}
</style>
```


## Common issues

#### `[Vue warn]: Injection "alertLayer" not found`

The most common issue we see is layers not being found. And the most common reason for this is that the layer API `inject` occurs in the same component as where the `o-layout` is delcared in the template.

To resolve this issue,  move the layer API `inject` one component deeper than `o-layout`.

#### DON'T

**`MyLayout.vue`**
```
<o-layout has-layers>
	<o-layout-content>
		<button @click="openAlert">Open</button>
	</o-layout-content>
</o-layout>

inject: {
    alertLayer: alertLayer,
}

methods: {
    openAlert() {
        this.alertLayer.open(MyAlert)
    }
}
```

### DO

Inject the layer API at least one component deep from where OLayout is created.

**`MyLayout.vue`**
```
<template>
	<o-layout has-layers>
		<o-layout-content>
			<my-component> <!-- Mount all layered components in MyComponent or deeper -->
		</o-layout-content>
	</o-layout>
</template>
```



**`MyComponent.vue`**
```
<template>
	<button @click="openAlert">Open</button>
</template>

inject: {
    alertLayer: alertLayer, /* Layer will now be available from the parent OLayout! */
}

methods: {
    openAlert() {
        this.alertLayer.open(MyAlert)
    }
}
```

For more information, review our [Layer Documentation](/components/layer).


## API

### Layout Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- |------------ |
| `has-layers` | `Boolean` | `false` | Whether the Layout comes with layers for modals, alerts, popovers, etc. |
| `has-sider` | `Boolean` | `false` | This prop is an optional optimization for Layouts in a Server Side Rendering (SSR) environment. If you notice a flicker when rendering your Layout component in a SSR environment, try adding this property to the direct parent Layout of your LayoutSider. |

### Layout Sider Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- |------------ |
| `collapsed` | `Boolean` | `false` | Show/hide the Sider. |
| `width` | `Number` | `216` | The width of the Sider. |
| `flush` | `Boolean` | `false` | Remove the default inner padding. |

### Layout Header Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- |------------ |
| `centered` | `Boolean` | `false` | Centers the content of the layout header. |
| `flush` | `Boolean` | `false` | Remove the default inner padding. |
| `raised` | `Boolean` | `false` | Applies a drop shadow to the header. |
| `sticky`  | `Boolean` | `false` | Makes the Header fixed above the content and adds a drop shadow when the layout content is scrolled. Make sure you set a height on the content in order to see the sticky effect. |

### Layout Header Slots
| slot | Description |
| ---- | ----------- |
| `back-action`   | Used in flows to place a "back" button in the top left of the header. |
| `actions`   | Usually used to place action buttons, this slot uses flex to position its content to the top right of the header. |

### Layout Content Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- |------------ |
| `flush` | `Boolean` | `false` | Remove the default inner padding. |

### Layout Content Events
| Attribute | Arguments | Triggers when... |
| --------- | --------- | ---------------- |
| `scroll` | Event obj | The content is scrolled. |

### Layout Footer Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- |------------ |
| `flush` | `Boolean` | `false` | Remove the default inner padding. |
| `raised` | `Boolean` | `false` | Applies a drop shadow to the footer. |
