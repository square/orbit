# Alert
Alerts are used to inform users that an action requires confirmation, or to give users an opportunity to cancel an action before it is committed.

## Examples
A parent with a mountable layer is required for this component to work properly. All the examples below assume that your application has a parent `OLayout` with layers enabled with the `has-layers` prop. See the [OLayout](/components/Layout) docs for more information.

### Opening and closing an Alert
```vue
<template>
	<o-button @click="openAlert()">
		Open Alert
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { AlertLayer } from '@square/orbit/components/Alert';
import AlertDemo from 'doc/AlertDemo.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		alertLayer: AlertLayer,
	},

	methods: {
		openAlert() {
			this.alertLayer.open(AlertDemo);
		},
	},
};
</script>
```

_AlertDemo.vue_
```vue
<template>
	<o-alert title="My Alert">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p>

		<template
			slot="actions"
			slot-scope="alert"
		>
			<o-button @click="alert.close()">
				Cancel
			</o-button>
			<o-button
				variant="primary"
				@click="clickSave(alert.close)"
			>
				Save
			</o-button>
		</template>
	</o-alert>
</template>

<script>
import { OAlert } from '@square/orbit/components/Alert';
import { OButton } from '@square/orbit/components/Button';

const AlertDemo = {

	components: {
		OAlert,
		OButton,
	},

	props: {
		title: String,
	},

	methods: {
		clickSave(closeAlert) {
			// Some save logic

			closeAlert();
		},
	},
};

export default AlertDemo;
</script>
```


**Opening an Alert**

1. **import the AlertLayer key and your custom Alert**

	`import { AlertLayer } from '@square/orbit/components/Alert';`

	`import MyAlert from './MyAlert.vue';`

	You will not need to import OAlert at this time, because the Alert should be created in a separate file from where it is mounted.

2. **Use Vue's [provide & inject](https://vuejs.org/v2/api/#provide-inject) mechanism to inject the key in order to gain access to [AlertLayer's API methods](#alertlayer-methods)**

	`inject: { alertLayer: AlertLayer, }`

	**IMPORTANT:** _AlertLayer is not prefixed with O because it is a key for an API, not a component. You can not create it in the template, and must inject it to use the API_

3. **Call `open()` on the injected `alertLayer` [API](#alertlayer-methods) and pass in your custom Alert component**

	`this.alertLayer.open(MyAlert);`.

We have built in functionality to automatically mount it to the correct point in your application with an AlertLayer. You may use this same layer to open one, or many `Alerts` on the page you've injected it into.

**Calling methods on alert `/MyAlert.vue`**
1. **Add a [ref](https://vuejs.org/v2/api/#ref) to your Alert**

	`<o-alert ref="alert">`

2. **Call the close method on the ref**

	`this.$refs.alert.close();`

You can call any documented methods within the template of your custom Alert by using [refs](https://vuejs.org/v2/api/#ref) this way.


### Listening to events from the Alert

**To listen to alert events, be sure to add `v-on="$listeners"` to `<o-alert>` in the template.** You will also need to add a `ref` attribute to your alert component to access the AlertLayer programatically.

### Determining how the Alert was closed
You can use the exitVal passed back by the close event to determine how the alert was closed.

| exitVal  | Closed By... |
| ------ |----- |
| `undefined` | A click on the layer, the user pressed the "esc" key, or there was no exitVal passed. |
| ? | A custom value provided to the close function |


```vue
<template>
	<div>
		<o-button @click="openAlert('Advanced Demo')">
			Open Alert
		</o-button>
		<div v-if="lastExit !== ''">
			Alert closed with an exit value of <code>{{ lastExitVal }}</code>
			because the user {{ exitDesc }}
		</div>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { AlertLayer } from '@square/orbit/components/Alert';
import EventDemo from 'doc/EventDemo.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		alertLayer: AlertLayer,
	},

	data() {
		return {
			lastExit: '',
		};
	},

	methods: {
		openAlert(title) {
			this.alertLayer.open(
				EventDemo,
				{
					props: { title },
					on: {
						close: (result) => {
							this.lastExit = result;
						},
					},
				},
			);
		},
	},
	computed: {
		lastExitVal() {
			return `${JSON.stringify(this.lastExit)}`;
		},
		exitDesc() {
			if (this.lastExit === undefined) {
				return 'clicked on the layer or pressed escape.';
			}
			return 'clicked on one of the provided actions.';
		},
	},
};
</script>
```

_EventDemo.vue_
```vue
<template>
	<o-alert
		ref="alert"
		:before-close="beforeClose"
		cancelable
		v-on="$listeners"
	>
		<template slot="title">
			{{ title }}
		</template>

		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p>

		<template slot="actions">
			<o-button @click="closeAlert('cancel')">
				Cancel
			</o-button>
			<o-button
				variant="primary"
				@click="closeAlert('confirm')"
			>
				Confirm
			</o-button>
		</template>
	</o-alert>
</template>

<script>
import { OAlert } from '@square/orbit/components/Alert';
import { OButton } from '@square/orbit/components/Button';

const EventDemo = {

	components: {
		OAlert,
		OButton,
	},

	props: {
		title: String,
	},

	methods: {
		closeAlert(exitVal) {
			this.$refs.alert.close(exitVal);
		},
		beforeClose(exitVal, proceed) {
			proceed(exitVal);
		},
	},
};

export default EventDemo;
</script>
```


### Require user to choose option

Prevent pressing of the Esc key (or clicking the overlay) to close the Alert without an option being
chosen.

If the user must make a decision between 'irreversible' options, prevent
pressing Esc to close. This scenario is uncommon, and in most cases, a safe option to cancel can be
provided where the Esc key press continues to behave as a _cancel_ action.

```vue
<template>
	<o-button @click="openAlert()">
		Open Alert
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { AlertLayer } from '@square/orbit/components/Alert';
import AlertDemo from 'doc/AlertDemoNoEscape.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		alertLayer: AlertLayer,
	},

	methods: {
		openAlert() {
			this.alertLayer.open(AlertDemo);
		},
	},
};
</script>
```

_AlertDemoNoEscape.vue_
```vue
<template>
	<o-alert
		ref="alert"
		:before-close="beforeClose"
		title="We've updated our Terms of Service"
		v-on="$listeners"
	>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod. Lorem ipsum
			dolor sit amet, consectetur adipisicing elit.
		</p>

		<template
			slot="actions"
			slot-scope="alert"
		>
			<o-button
				@click="alert.close('cancel')"
			>
				Decline
			</o-button>
			<o-button
				variant="primary"
				@click="alert.close('save')"
			>
				I agree
			</o-button>
		</template>
	</o-alert>
</template>

<script>
import { OAlert } from '@square/orbit/components/Alert';
import { OButton } from '@square/orbit/components/Button';

export default {

	components: {
		OAlert,
		OButton,
	},

	props: {
		title: String,
	},

	methods: {
		beforeClose(exitVal, proceed, stop) {
			if (exitVal === undefined) {
				stop();
			} else {
				proceed(exitVal);
			}
		},
	},
};
</script>
```


## Common problems

**`[Orbit error][Layer]: Layer with id "layer_(RANDOM HASH)" not found`**

The `AlertLayer` assumes that your application is using a [Layout](/components/layout) component. The Layout component will automatically provide you with a Layer and an AlertLayer Key so you can mount alerts easily on an already created layer.


It's possible that you're not using the Layout or Layer component in your application. If so, you will be missing the provided AlertLayer and will either need to use the Layout component, or define your own mounting point by providing a [Layer](/components/layer) component. You can read more about that in the [Layer Docs](/components/layer).



## API

### Alert Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `before-close` | `Function` | — | A callback function with parameters `(exitVal, proceed <function>, stop <function>)` to proceed with or stop a cancel |
| `cancelable` | `Boolean` | `false` | Whether the Alert can be exited by clicking out of it |
| `title` | `String` | — | Title of the alert |

### Alert Events
| Attribute | Arguments | Triggers when... |
| --------- | --------- | ---------------- |
| `close` | Exit value | Alert is closed |

### Alert Methods
| method | Description |
| ------ | ----------- |
| close(exitVal) | To close the Alert. The `exitVal` is the value that gets emitted along with the `close` event, or passed through a parameter in the beforeClose attribute. |

### Alert Slots
| slot | Description |
| ---- | ----------- |
| `actions` | Actions in alerts, typically Buttons |
| `title` | Add a custom title to your Alert. |

### AlertLayer API
| Name | Parameters | Description |
| ---- | ---------- | ----------- |
| `open()` | `(Component, { DataObject })` | Component: Your Alert component. <br> DataObject: Refer to the [vue docs](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) for all the options available. |
| `isOpen` | — | Whether another component is already being displayed on the layer or not. |
