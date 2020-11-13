# Layer
Layer is used to mount components on top of the current UI.

## A word of caution
The `OLayer` component should only be used for custom use cases. Orbit recommends that you use [OLayout](/latest/components/Layout) with the `has-layer` prop. If you're using `SpringLayout`, you already have layers.  If you're not sure whether your application needs a custom layer, feel free to ping us on slack in [#ecom-design-eng](https://slack.com/app_redirect?channel=GB91677QF).

*Note: The example below assumes you have a provided Layer.*

```vue
<template>
	<o-button @click="open">
		Open Drawer
	</o-button>
</template>
<script>
import { LayerAPI } from '@square/orbit/components/Layer';
import { OButton } from '@square/orbit/components/Button';
import Drawer from 'doc/Drawer.vue';

export default {
	components: {
		OButton,
		Drawer,
	},

	inject: {
		layer: LayerAPI,
	},

	methods: {
		open() {
			this.layer.open(Drawer);
		},
	},
};
</script>
```

_Drawer.vue_
```vue
<template>
	<o-layout class="DrawerContainer">
		<o-layout-sider
			:collapsed="!drawerOpen"
			class="Drawer"
		>
			Custom Drawer
		</o-layout-sider>
	</o-layout>
</template>

<script>
import { OLayer } from '@square/orbit/components/Layer';
import { OLayout, OLayoutSider } from '@square/orbit/components/Layout';

export default {
	name: 'Drawer',

	inject: {
		layer: OLayer.key,
	},

	components: {
		OLayout,
		OLayoutSider,
	},

	data() {
		return {
			drawerOpen: false,
		};
	},

	mounted() {
		this.layer.configure({
			cancelable: true,
		});

		setTimeout(() => {
			this.drawerOpen = true;
		}, 2);
	},
};
</script>

<style scoped>
.DrawerContainer {
	height: 100vh;
	display: inline-flex !important;
	cursor: default;
}

.Drawer {
	background-color: white;
}
</style>
```
<!--
## Creating your own Layer
*NOTICE: Most likely, a layer has already been provided to you, and you can use the [first example](/#automatically-detecting-a-provided-layer) to find out how leverage it.*

If you need to create a new layer to mount something on, you can do so in one of two ways.

- **Create a new [`OLayout`](/components/layout) with the property `has-layers`**
	- The advantage of this is that it will automatically provide layering systems for all other Orbit components. Including Popovers, Toast, etc. If you do this, you can use the API described in the [first example](/#automatically-detecting-a-provided-layer) to understand how to detect the new layer provided by your layout.

	`<o-layout has-layers>`

- **Create your own Layer**
	- If you don't want these extra layers or functionality that OLayout provides to you, you can also create your own Layer and mount your component on a specific layer id.

```vue
<template>
	<div>
		Declaring the mount at the top-level of the application
		<o-layer :id="mountId" />

		Use the layer
		<o-button @click="openExample">Say Hello</o-button>
	</div>
</template>

<script>
import { OLayer } from '@square/orbit/components/Layer';
import { OButton } from '@square/orbit/components/Button';
import { OInput } from '@square/orbit/components/Input';
import MyCustomComponent from 'doc/MyCustomComponent.vue';

export default {

	name: 'OpenModal',

	components: {
		OLayer,
		OButton,
		OInput,
	},

	data() {
		return {
			mountId: Symbol('mounting point'),
		};
	},

	methods: {
		openExample() {
			OLayer.openInLayer(
				this.mountId,
				MyCustomComponent,
				{
					props: { textColor: 'blue' },
				},
			);
		},
	},
};
</script>
```

_MyCustomComponent.vue_
```vue
<template>
	<div class="container">
		<span :style="{ color: textColor }">Hello World</span>
	</div>
</template>

<script>
import { OLayer } from '@square/orbit/components/Layer';

export default {
	name: 'SomeModalUI',

	props: {
		textColor: {
			type: String,
			default: 'black',
		},
	},

	inject: {
		layer: OLayer.key,
	},

	created() {
		let i = 0;
		this.layer.configure({
			// means they can either press escape or click out of the modal
			cancelable: true,
			position: 'top center',

			beforeClose(proceed, block) {
				if (i > 2) {
					proceed();
				} else {
					block();
					i += 1;
				}
			},
		});
	},
};
</script>
<style scoped>
.container {
	background: white;
	height: 100px;
	width: 200px;
	padding: 32px;
}
</style>
```
-->

## Configuration Options
There are a variety of [configuration options](#configuration-option-object) for your Layer.

```vue
<template>
	<o-button @click="open">
		Open
	</o-button>
</template>
<script>
import { LayerAPI } from '@square/orbit/components/Layer';
import { OButton } from '@square/orbit/components/Button';
import ConfiguredComponent from 'doc/ConfiguredComponent.vue';

export default {
	components: {
		ConfiguredComponent,
		OButton,
	},

	inject: {
		layer: LayerAPI,
	},

	methods: {
		open() {
			this.layer.open(ConfiguredComponent);
		},
	},
};
</script>
```

_ConfiguredComponent.vue_
```vue
<template>
	<div class="my-component">
		An alert will open to confirm that you want to close this layer.
	</div>
</template>
<script>
import { OLayer, LayerAPI } from '@square/orbit/components/Layer';
import ConfirmLeave from 'doc/ConfirmLeave.vue';

export default {
	name: 'ConfiguredComponent',

	components: {
		ConfirmLeave,
	},

	inject: {
		layer: OLayer.key,
		layerAPI: LayerAPI,
	},

	mounted() {
		const vm = this;

		this.layer.configure({
			cancelable: true,
			beforeClose(exitVal, proceed, block) {
				vm.layerAPI.open(
					ConfirmLeave,
					{
						on: {
							close: (result) => {
								if (result === 'yes') {
									proceed();
								} else {
									block();
								}
							},
						},
					},
				);
			},
		});
	},
};
</script>
<style scoped>
.my-component {
	width: 400px;
	background: white;
	padding: 16px;
}
</style>
```

_ConfirmLeave.vue_
```vue
<template>
	<o-alert
		title="Are you sure you want to leave?"
		v-on="$listeners"
	>
		<template
			slot="actions"
			slot-scope="alert"
		>
			<o-button @click="alert.close('no')">
				No
			</o-button>
			<o-button
				variant="primary"
				@click="alert.close('yes')"
			>
				Yes
			</o-button>
		</template>
	</o-alert>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OAlert } from '@square/orbit/components/Alert';

export default {
	components: {
		OAlert,
		OButton,
	},
};
</script>
```

## Listening to Layer Events
You can listen to Layer events (not events from the component mounted _in_ the layer) by adding an event handler to the layer instance which is returned by <!--`OLayer.openInLayer()` or --> `this.layer.open()`. Since the Layer instance is reused for every component mounted in it, make sure you use [`$once`](https://vuejs.org/v2/api/#vm-once) instead of [`$on`](https://vuejs.org/v2/api/#vm-on) to avoid memory leaks. Putting the event handlers on the layer component in the markup is possible too but discouraged because the Layer is meant to be shared amongst different parts of the codebase by design and binding a handler via markup would tightly couple the shared layer to one use-case.

Listening via Javascript
```vue
<template>
	<div>
		<o-button @click="openExample">
			Open Layer
		</o-button>

		<div>
			Layer opened: {{ layerOpened }} times
			<br>
			Layer closed: {{ layerClosed }} times
		</div>
	</div>
</template>

<script>
import { LayerAPI } from '@square/orbit/components/Layer';
import { OButton } from '@square/orbit/components/Button';
import ModalDemo from 'doc/ModalDemo.vue';

export default {

	name: 'OpenModal',

	components: {
		OButton,
	},

	inject: {
		layer: LayerAPI,
	},

	data() {
		return {
			mountId: Symbol('mounting point'),
			layerOpened: 0,
			layerClosed: 0,
		};
	},

	methods: {
		openExample() {
			const layer = this.layer.open(ModalDemo);

			layer.$once('open', () => {
				this.layerOpened += 1;
			});

			layer.$once('close', () => {
				this.layerClosed += 1;
			});
		},
	},
};
</script>
```

_ModalDemo.vue_
```vue
<template>
	<span :style="{ color: '#fff' }">
		This will close in 2 seconds
	</span>
</template>

<script>
import { OLayer } from '@square/orbit/components/Layer';

export default {
	name: 'ModalDemo',

	inject: {
		layer: OLayer.key,
	},

	created() {
		// Close self in 2 seconds
		setTimeout(() => {
			this.layer.close();
		}, 2000);
	},
};
</script>
```


## Layer Methods
| Name | Parameters | Description |
| ---- | ---------- | ----------- |
| `close(exitVal)` | exitVal: `Any` | Close the Layer and mounted component. |
| `configure` | [`configurationOption`](#configuration-option-object) | The `configurationOption` is an object you can pass in that can have up to three different settings. Refer to the [Configuration Option table](#configuration-option-object) for all available options. |
| `openInLayer` | `(layerId, Component, { DataObject })` | layerId: The id set on the layer you want to mount to. Component: The component you want mounted. <br> DataObject: Refer to the [vue docs](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) for all the options available. |

### Configuration Option Object
| Name         | Type    | Default    | Description                                           |
| ------------ | ------- | ---------- | ----------------------------------------------------- |
| `cancelable` | Boolean | `false` | Whether or not you can click on the overlay to close the Layer. Only used where there's a clickable area behind mounted components that don't take up the whole viewport. |
| `beforeClose` | `Function` | - | A function that will be called before the layer is closed. Parameters (exitVal, proceed, `<function>`stop `<function>`) |

<!--
| `position` | String<br> `top`, `center` | - | List of accepted placements to use as values of the positioning of the mounted element. For example, `top`, or `top center`. `top` Will position the element 10vh from the top of the container. |
-->

## LayerAPI Methods
| Name | Parameters | Description |
| ---- | ---------- | ----------- |
| `open` | `(Component, { DataObject })` | Component: The component you want mounted. <br> DataObject: Refer to the [vue docs](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) for all the options available. |
| `isOpen` | — | Whether another component is already being displayed on the layer or not. |

## Attributes
| Name         | Type    | Default    | Description                                           |
| ------------ | ------- | ---------- | ----------------------------------------------------- |
| `id`         | —       | —          | Unique id to identify the layer                     |
