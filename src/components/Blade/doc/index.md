# Blade

Blades allow Merchants to **view, compare, and switch content  while maintaining the majority of the page view**.

Blades should not have editable fields inside. To edit content, a modal or sheet should open.

## Examples
A parent with a mountable layer is required for this component to work properly. All the examples below assume that your application has a parent `OLayout` with layers enabled with the `has-layers` prop. See the [OLayout](/components/Layout) docs for more information.

```vue
<template>
	<o-button @click="openBlade">
		Open a Blade
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { BladeLayerKey } from '@square/orbit/components/Blade';
import BladeDemo from 'doc/BladeDemo.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		bladeLayer: BladeLayerKey,
	},

	methods: {
		openBlade() {
			this.bladeLayer.open(
				(h) => h(
					BladeDemo,
					{
						props: {
							title: 'Lorem ipsum dolor sit amet',
						},
					},
				),
			);
		},
	},
};
</script>
```

_BladeDemo.vue_
```vue
<template>
	<o-blade :title="title">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit,
		sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
		nisi ut aliquip ex ea commodo consequat.
		Duis aute irure dolor in reprehenderit in voluptate
		velit esse cillum dolore eu fugiat nulla pariatur.
		Excepteur sint occaecat cupidatat non proident,
		sunt in culpa qui officia deserunt mollit anim id est laborum.

		<template slot="actions">
			<o-button>
				Edit
			</o-button>
			<o-button variant="primary">
				Preview
			</o-button>
		</template>
	</o-blade>
</template>

<script>
import { OBlade } from '@square/orbit/components/Blade';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OBlade,
		OButton,
	},

	props: {
		title: String,
	},
};
</script>
```

### Programmatically closing a Blade

#### From inside your Blade Component
1. **Add a [ref](https://vuejs.org/v2/api/#ref) to your Blade**

	`<o-blade ref="blade">`

2. **Call the close method on the ref**

	`this.$refs.blade.close();`

You can call any documented methods within the template of your custom Blade by using [refs](https://vuejs.org/v2/api/#ref) this way.

#### From the component that opened the Blade
1. **Get the BladeLayer instance for the opened Blade**

	`const bladeLayerInstance = this.bladeLayer`

2. **Call `close()` on it**

	`bladeLayerInstance.close()`

**To listen to blade events, be sure to add `v-on="$listeners"` to `<o-blade>` in the template.** You will also need to add a `ref` attribute to your blade component to access the BladeAPI programatically.

#### Determining how the Blade was closed by the close event
You can use the exitVal passed back by the close event to determine how the blade was closed.

| exitVal  | Closed By... |
| ------ |----- |
| `false` | A click on the 'X' button in the top left |
| ? | A custom value provided to the close function |

```vue
<template>
	<div>
		<o-button @click="openBlade">
			Open a Blade
		</o-button>
		<br>
		<div v-if="lastExit !== ''">
			Blade closed with an exit value of <code>{{ lastExitVal }}</code>
			because the user {{ exitDesc }}
		</div>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { BladeLayerKey } from '@square/orbit/components/Blade';
import BladeDemo2 from 'doc/BladeDemo2.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		bladeLayer: BladeLayerKey,
	},

	data() {
		return {
			lastExit: '',
		};
	},

	computed: {
		lastExitVal() {
			return JSON.stringify(this.lastExit);
		},
		exitDesc() {
			if (this.lastExit === false) {
				return 'clicked on the x button.';
			}
			return 'clicked on a button that closed the blade with a custom exitVal';
		},
	},

	methods: {
		openBlade() {
			this.bladeLayer.open(
				(h) => h(
					BladeDemo2,
					{
						on: {
							close: (exitVal) => {
								this.lastExit = exitVal;
							},
						},
					},
				),
			);
		},
	},
};
</script>
```

_BladeDemo2.vue_
```vue
<template>
	<o-blade
		ref="blade"
		title="Closing a Blade"
		v-on="$listeners"
	>
		<p>
			Make sure you add a v-on="$listeners" to your custom Blade component
			when you want to listen to Blade events.
		</p>

		<p>You may also pass a custom exitValue when calling the close method on a blade.</p>

		<template slot="actions">
			<o-button @click="$refs.blade.close('Action button')">
				Close blade
			</o-button>
		</template>
	</o-blade>
</template>

<script>
import { OBlade } from '@square/orbit/components/Blade';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OBlade,
		OButton,
	},
};
</script>
```

## Blade Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `title` | `String` | — | Title of the Blade. |
| `subtitle`  | `String` | — | Subtitle of the Blade. |
| `backdrop`  | `Boolean` | `false` | Use a gray background. |

### Blade Slots
| slot | Description |
| ---- | ----------- |
| `subtitle`  | Custom subtitle container under the title |
| `actions`  | Appears fixed at bottom of blade. Supports button components only, up to two. |

### Blade Events
| Attribute |  Arguments | Triggers when... |
---- | ----| ---- |
| `close` | Exit value | Blade is closed |

### BladeLayer API Methods
| name | Parameters | Description |
| ---- | ---------- | ----------- |
| `open(renderFunc)` | renderFunc: `h => h(Component, { DataObject })` | Component: Your Blade component.<br>DataObject: Refer to the [vue docs](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) for all the options available. |
| `close(exitVal)` | exitVal: `Any` | To close the Blade. The `exitVal` is the value that gets emitted along with the `close` event. |

### BladeLayer Instance Methods
| name | Parameters | Description |
| ---- | ---------- | ----------- |
| `close(exitVal)` | exitVal: `Any` | To close the Blade. The `exitVal` is the value that gets emitted along with the `close` event. |
