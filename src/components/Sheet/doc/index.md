# Sheet
A sheet is a container of content that appears over the existing page. It takes up the full screen and can be closed at any time.

## Examples
A parent with a mountable layer is required for this component to work properly. All the examples below assume that your application has a parent `OLayout` with layers enabled with the `has-layers` prop. See the [OLayout](/components/Layout) docs for more information.

The Sheet comes with a default close button but can be customized with the `actions` slot. You can access the sheet API by turning the slot into a scoped-slot by adding `slot-scope="sheet"` to the slot. In cases that necessitate custom-logic to be bound to the actions, you can access the sheet API by adding `ref="sheet"` on `<o-sheet>` to get `$refs.sheet`.

If you're listening to events on the Sheet, be sure to add `v-on="$listeners"` to your implementation of `OSheet`.

```vue
<template>
	<div>
		<o-button @click="openSheet">
			Open Sheet
		</o-button>
		<br>
		Closed with value: {{ exitVal }}
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { SheetLayer } from '@square/orbit/components/Sheet';
import MySheet from 'doc/MySheet.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		sheetLayer: SheetLayer,
	},

	data() {
		return {
			exitVal: undefined,
		};
	},

	methods: {
		openSheet() {
			this.sheetLayer.open(
				MySheet,
				{
					on: {
						close: (exitVal) => {
							this.exitVal = exitVal;
						},
					},
				},
			);
		},
	},
};
</script>
```

_MySheet.vue_
```vue
<template>
	<o-sheet
		title="Sheet Title"
		v-on="$listeners"
	>
		<template
			slot="actions"
			slot-scope="sheet"
		>
			<o-button
				variant="primary"
				@click="closeSheet(), sheet.close('save')"
			>
				Save
			</o-button>
		</template>

		<p>
			Ipsam perferendis nobis veniam. Rerum eos iure est aliquid id atque alias.
			Quo at praesentium unde qui est sequi ut non officiis. Officiis minima porro et.
		</p>
		<p>
			Non ut facere similique.
			Vero optio quibusdam voluptatibus ad aut occaecati libero occaecati et.
			Voluptatem rerum quos quaerat doloremque consequatur qui aspernatur minus voluptatem.
			Cumque voluptatem non quo molestias qui pariatur.
		</p>
		<p>
			Quia voluptates perspiciatis sed magni beatae incidunt aut eveniet consequatur.
			Consectetur consequatur voluptas illum eaque quis. Eligendi magni ea.
		</p>
	</o-sheet>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OSheet } from '@square/orbit/components/Sheet';

export default {
	components: {
		OSheet,
		OButton,
	},

	methods: {
		closeSheet() {
			// Do something
		},
	},
};
</script>
```

**Opening a Sheet**

1. **Import the SheetLayer key and your custom Sheet**

	`import { SheetLayer } from '@square/orbit/components/Sheet';`

	`import SheetDemo from './SheetDemo.vue';`

	You will not need to import OSheet at this time, because the Sheet should be created in a separate file from where it is mounted.


2. **Use Vue's [provide & inject](https://vuejs.org/v2/api/#provide-inject) mechanism to inject the key in order to gain access to [SheetLayer's API methods](#sheetlayer-methods)**

	`inject: { sheetLayer: SheetLayer, }`

	**IMPORTANT:** _SheetLayer is not prefixed with O because it is a key for an API, not a component. You can not create it in the template, and must inject it to use the API_

3. **Call `open()` on the injected `sheetLayer` [API](#sheetlayer-methods) and pass in your custom Sheet component**

	`this.sheetLayer.open(MySheet);`.


We have built in functionality to automatically mount it to the correct point in your application with a SheetLayer. You may use this same layer to open one, or many `Sheets` on the page you've injected it into.

**Calling methods on sheet `/MySheet.vue`**
1. **Add a [ref](https://vuejs.org/v2/api/#ref) to your Sheet**

	`<o-sheet ref="sheet">`

2. **Call the close method on the ref**

	`this.$refs.sheet.close();`

You can call any documented methods within the template of your custom Sheet by using [refs](https://vuejs.org/v2/api/#ref) this way.

<br>

## Steps in Sheets
Using the `title` slot, we can add additional content to the Sheet header. Here we add condensed Steps to the Sheet. For more information about Steps, see the [documentation](/components/steps).

```vue
<template>
	<o-button @click="openSheet">
		Open Sheet
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { SheetLayer } from '@square/orbit/components/Sheet';
import StepSheet from 'doc/StepSheet.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		sheetLayer: SheetLayer,
	},

	data() {
		return {
			exitVal: undefined,
		};
	},

	methods: {
		openSheet() {
			this.sheetLayer.open(StepSheet);
		},
	},
};
</script>
```

_StepSheet.vue_
```vue
<template>
	<o-sheet
		title="Sheet with Steps"
		v-on="$listeners"
	>
		<o-steps
			slot="steps"
			v-model="currentStep"
			variant="condensed"
			clickable
		>
			<o-step-item title="Step 1" />
			<o-step-item title="Step 2" />
			<o-step-item title="Step 3" />
		</o-steps>
		<template
			slot="actions"
			slot-scope="sheet"
		>
			<o-button
				variant="primary"
				@click="closeSheet(), sheet.close('save')"
			>
				Save
			</o-button>
		</template>

		<p v-if="currentStep === 1">
			Ipsam perferendis nobis veniam. Rerum eos iure est aliquid id atque alias.
			Quo at praesentium unde qui est sequi ut non officiis. Officiis minima porro et.
		</p>

		<p v-if="currentStep === 2">
			Non ut facere similique.
			Vero optio quibusdam voluptatibus ad aut occaecati libero occaecati et.
			Voluptatem rerum quos quaerat doloremque consequatur qui aspernatur minus voluptatem.
			Cumque voluptatem non quo molestias qui pariatur.
		</p>

		<p v-if="currentStep === 3">
			Quia voluptates perspiciatis sed magni beatae incidunt aut eveniet consequatur.
			Consectetur consequatur voluptas illum eaque quis. Eligendi magni ea.
		</p>
	</o-sheet>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OSheet } from '@square/orbit/components/Sheet';
import { OSteps, OStepItem } from '@square/orbit/components/Steps';

export default {
	components: {
		OSheet,
		OButton,
		OSteps,
		OStepItem,
	},

	data() {
		return {
			currentStep: 1,
		};
	},

	methods: {
		closeSheet() {
			// Do something
		},
	},
};
</script>
```

## Advanced Use Cases
The `SheetLayer` assumes that your application is using a [Layout](/components/layout) component. The Layout component will automatically provide you with a Layer and an SheetLayer Key so you can mount sheets easily on an already created layer. If you see this error:

`[Orbit error][Layer]: Layer with id "layer_(RANDOM HASH)" not found`

It's possible that you're not using the Layout or Layer component in your application. If so, you will be missing the provided SheetLayer and will either need to use the Layout component, or define your own mounting point by providing a [Layer](/components/layer) component. You can read more about that in the [Layer Docs](/components/layer).

## Sheet Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `title` | `String` | — | The title of the Sheet that appears in the header. This won't render if the title slot is being used. |
| `before-close` | `Function` | — | A callback function with parameters `(exitVal, proceed <function>, stop <function>)` to proceed with or stop a cancel |
| `backdrop`  | `Boolean` | `false` | Use a gray background. |
| `flush` | `Boolean` | `false` | Remove the padding and max-width on the Sheet so that content goes all the way to the edge. Normally sheets have a 1200px max-width for the content and include inner padding. |

## Sheet Slots
| slot    | Description         |
| ------- |-------------------- |
| `title` | The title of the Sheet that appears in the header. Use this instead of the title attribute for more advanced use cases. |
| `actions` | Modal actions (eg. Buttons) can be passed into this scoped-slot. The Modal API is available through the slot-scope. |
| `default` | The rest of the section content can be placed in the default slot. It can be placed anywhere in the component, and does not need to be placed inside a named slot. |
| `steps` | Use for placing steps under the Sheet title or title slot. Will be given the correct margin. |

## Sheet Events
| Attribute |  Arguments | Triggers when... |
---- | ----| ---- |
| `close` | Exit value | Sheet is closed |

## Sheet Methods
| method    | Description       |
| ------- |-------------------- |
| `close(exitVal)` | To close the sheet. The `exitVal` is the value that gets emitted along with the `close` event, or passed through the beforeClose parameters. |

## SheetLayer Methods
| Name | Parameters | Description |
| ---- | ---------- | ----------- |
| `open` | `(Component, { DataObject })` | Component: Your Sheet component. <br> DataObject: Refer to the [vue docs](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) for all the options available. |
| `isOpen` | — | Whether another component is already being displayed on the layer or not. |
