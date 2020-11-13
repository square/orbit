# Modal
A Modal is an overlay designed to elicit a response from the user.

Modals are primarily used to direct the user’s attention to a specific task, i.e. editing settings, without taking them away from the current screen.

Modals are great for keeping users in context of a current view, while allowing them to complete a task.

## Examples
A parent with a mountable layer is required for this component to work properly. All the examples below assume that your application has a parent `OLayout` with layers enabled with the `has-layers` prop. See the [OLayout](/components/Layout) docs for more information.

### Opening and closing a Modal

```vue
<template>
	<o-button @click="openModal">
		Open Simple Modal
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ModalLayer } from '@square/orbit/components/Modal';
import ModalSimpleDemo from 'doc/ModalSimpleDemo.vue';

export default {
	components: {
		OButton,
		ModalSimpleDemo,
	},

	inject: {
		modalLayer: ModalLayer,
	},

	methods: {
		openModal() {
			this.modalLayer.open(
				ModalSimpleDemo,
				{
					props: {
						title: 'Neil Armstrong',
						bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium provident repellendus tempore assumenda hic neque.',
					},
				},
			);
		},
	},
};
</script>
```

_ModalSimpleDemo.vue_
```vue
<template>
	<o-modal>
		<o-modal-pane :title="title">
			{{ bio }}
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OModal, OModalPane } from '@square/orbit/components/Modal';

export default {
	components: {
		OButton,
		OModal,
		OModalPane,
	},
	props: {
		title: String,
		bio: String,
	},
};
</script>
```


**Opening a Modal**

1. **Import the ModalLayer key and your custom Modal**

	`import { ModalLayer } from '@square/orbit/components/Modal';`

	`import MyModal from './MyModal.vue';`

	You will not need to import OModal at this time, because the Modal should be created in a separate file from where it is mounted.


2. **Use Vue's [provide & inject](https://vuejs.org/v2/api/#provide-inject) mechanism to inject the key in order to gain access to [ModalLayer's API methods](#modallayer-methods)**

	`inject: { modalLayer: ModalLayer, }`

	**IMPORTANT:** _ModalLayer is not prefixed with O because it is a key for an API, not a component. You can not create it in the template, and must inject it to use the API_

3. **Call `open()` on the injected `modalLayer` [API](#modallayer-methods) and pass in your custom Modal component**

	`this.modalLayer.open(MyModal);`.


We have built in functionality to automatically mount it to the correct point in your application with a ModalLayer. You may use this same layer to open one, or many `Modals` on the page you've injected it into.

**Calling methods on modal `/MyModal.vue`**
1. **Add a [ref](https://vuejs.org/v2/api/#ref) to your Modal**

	`<o-modal ref="modal">`

2. **Call the close method on the ref**

	`this.$refs.modal.close();`

You can call any documented methods within the template of your custom Modal by using [refs](https://vuejs.org/v2/api/#ref) this way.

<br>

### Action Slot and Listening to Events from the Modal

The Modal comes with a default close button but can be customized with the `actions` slot. You can access the modal API by turning the slot into a scoped-slot by adding `slot-scope="modal"` to the slot. In cases that necessitate custom-logic to be bound to the actions, you can access the modal API by adding `ref="modal"` on `<o-modal>` to get `$refs.modal`.

**To listen to modal events, be sure to add `v-on="$listeners"` to `<o-modal>` in the template.** You will also need to add a `ref` attribute to your modal component to access the ModalAPI programatically.

#### Determining how the Modal was closed
You can use the exitVal passed back by the close event to determine how the modal was closed.

| exitVal  | Closed By... |
| ------ |----- |
| `undefined` | A click on the layer, the user pressed the "esc" key, or there was no exitVal passed. |
| `false` | A click on the 'X' button in the top left |
| ? | A custom value provided to the close function |


```vue
<template>
	<div>
		<o-button @click="openModal">
			Open Action Modal
		</o-button>
		<div v-if="lastExit !== ''">
			Modal closed with an exit value of <code>{{ lastExitVal }}</code>
			because the user {{ exitDesc }}
		</div>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ModalLayer } from '@square/orbit/components/Modal';
import ModalActionDemo from 'doc/ModalActionDemo.vue';

export default {
	components: {
		OButton,
		ModalActionDemo,
	},

	inject: {
		modalLayer: ModalLayer,
	},

	data() {
		return {
			lastExit: '',
		};
	},

	computed: {
		lastExitVal() {
			return `${JSON.stringify(this.lastExit)}`;
		},
		exitDesc() {
			if (this.lastExit === undefined) {
				return 'clicked on the layer or pressed escape.';
			}
			if (this.lastExit === false) {
				return 'clicked on the x button.';
			}
			return 'clicked on one of the provided actions.';
		},
	},

	methods: {
		openModal() {
			this.modalLayer.open(
				ModalActionDemo,
				{
					on: {
						close: (exitVal) => {
							this.lastExit = exitVal;
						},
					},
				},
			);
		},
	},
};
</script>
```

_ModalActionDemo.vue_
```vue
<template>
	<o-modal
		ref="modal"
		:before-close="beforeClose"
		v-on="$listeners"
	>
		<o-modal-pane title="Modal Title">
			<template slot="actions">
				<o-button @click="$refs.modal.close('Cancel')">
					Cancel
				</o-button>
				<o-button
					variant="primary"
					@click="submitForm"
				>
					Submit
				</o-button>
			</template>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium provident tempore.
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OModal, OModalPane } from '@square/orbit/components/Modal';

export default {
	components: {
		OButton,
		OModal,
		OModalPane,
	},

	methods: {
		submitForm() {
			// Submit form

			this.$refs.modal.close('Submit');
		},
		beforeClose(exitVal, proceed) {
			proceed(exitVal);
		},
	},
};
</script>
```


### Multi-pane Modals
You can create multi-pane modals by passing in multiple ModalPane components to the Modal.

```vue
<template>
	<o-button @click="openModal">
		Open Multi Pane Modal
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ModalLayer } from '@square/orbit/components/Modal';
import MultipaneModal from 'doc/MultipaneModal.vue';

export default {
	components: {
		OButton,
		MultipaneModal,
	},

	inject: {
		modalLayer: ModalLayer,
	},

	methods: {
		openModal() {
			this.modalLayer.open(MultipaneModal);
		},
	},
};
</script>
```

_MultipaneModal.vue_
```vue
<template>
	<o-modal>
		<o-modal-pane title="1st Pane">
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button
					variant="primary"
					@click="modal.forward()"
				>
					Next
				</o-button>
			</template>
			You can use the back and forward methods on modals to easily navigate
			between panes in the order they're written in the template.
		</o-modal-pane>

		<o-modal-pane title="2nd Pane">
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button
					variant="primary"
					@click="modal.forward()"
				>
					Next
				</o-button>
			</template>
			By default every modal pane after the first has a back button in the top left
			which allows the user to navigate back through the modal flow.
		</o-modal-pane>

		<o-modal-pane
			title="Last Pane"
			show-close
		>
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button
					variant="primary"
					@click="modal.forward()"
				>
					Done
				</o-button>
			</template>
			You can disable the default behavior of allowing the user to go back on any pane
			by using the 'show-close' prop which will change the back button to a close button.
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OModal, OModalPane } from '@square/orbit/components/Modal';

export default {
	components: {
		OButton,
		OModal,
		OModalPane,
	},
};
</script>
```


### Tabs in Modals

Move tabs up from the modal content area and into the modal header for a cleaner look.

To do this, put your tabs in the ModalPane's `tabs` slot, these will be rendered in the modal
header. Keep the tab pane content empty though, as we don't want the content to render in the modal
header. Instead, use the current tab index from the Tabs component to show/hide content in your
modal pane.

```vue
<template>
	<o-button @click="openModal">
		Open Modal with tabs
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ModalLayer } from '@square/orbit/components/Modal';
import ModalSimpleDemo from 'doc/ModalTabsDemo.vue';

export default {
	components: {
		OButton,
		ModalSimpleDemo,
	},

	inject: {
		modalLayer: ModalLayer,
	},

	methods: {
		openModal() {
			this.modalLayer.open(ModalSimpleDemo);
		},
	},
	mounted() {
		// this.openModal();
	},
};
</script>
```

_ModalTabsDemo.vue_
```vue
<template>
	<o-modal size="large">
		<o-modal-pane title="Modal title">
			<template slot="tabs">
				<o-tabs
					v-model="tabIdx"
					align="center"
				>
					<o-tab-pane label="Tab #1" />
					<o-tab-pane label="Tab #2" />
					<o-tab-pane label="Tab #3" />
				</o-tabs>
			</template>

			<section v-if="tabIdx === 0">
				<div class="demo-blocks">
					<div class="demo-block" />
					<div class="demo-block" />
					<div class="demo-block" />
					<div class="demo-block" />
					<div class="demo-block" />
					<div class="demo-block" />
					<div class="demo-block" />
					<div class="demo-block" />
				</div>
			</section>

			<section v-if="tabIdx === 1">
				<div class="demo-row" />
				<div class="demo-row" />
				<div class="demo-row" />
				<div class="demo-row" />
			</section>

			<section v-if="tabIdx === 2">
				👋
			</section>
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OModal, OModalPane } from '@square/orbit/components/Modal';
import { OTabs, OTabPane } from '@square/orbit/components/Tabs';

export default {
	components: {
		OButton,
		OModal,
		OModalPane,
		OTabs,
		OTabPane,
	},
	data() {
		return {
			tabIdx: 0,
		};
	},
};
</script>

<style scoped>
.demo-blocks {
	display: flex;
	flex-wrap: wrap;
}

.demo-block {
	background-color: #f3f3f3;
	margin-right: 12px;
	margin-bottom: 12px;
	width: 200px;
	height: 200px;
}

.demo-row {
	background-color: #f3f3f3;
	margin-bottom: 12px;
	height: 200px;
}
</style>
```


### Modal Sizes
The `size` attribute lets you change the size of your Modal. Here, we demo a `large` Modal.

```vue
<template>
	<div>
		<o-button @click="openModal">
			Open Large Modal
		</o-button>

		<div>
			Modal closed with value: {{ lastExit }}
		</div>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ModalLayer } from '@square/orbit/components/Modal';
import ModalSizeDemo from 'doc/ModalSizeDemo.vue';

export default {
	components: {
		OButton,
		ModalSizeDemo,
	},

	inject: {
		modalLayer: ModalLayer,
	},

	data() {
		return {
			lastExit: undefined,
		};
	},

	methods: {
		openModal() {
			this.modalLayer.open(
				ModalSizeDemo,
				{
					props: { title: 'Neil Armstrong' },
					on: {
						close: (exitVal) => {
							this.lastExit = exitVal;
						},
					},
				},
			);
		},
	},
};
</script>
```

_ModalSizeDemo.vue_
```vue
<template>
	<o-modal
		cancelable
		size="large"
		v-on="$listeners"
	>
		<o-modal-pane :title="title">
			Neil Alden Armstrong (August 5, 1930 – August 25, 2012)
			was an American astronaut and aeronautical engineer,
			and the first person to walk on the Moon. He was also
			a naval aviator, test pilot, and university professor.
			When he stepped onto the lunar surface on July 21,
			1969, he said: "That's one small step for [a] man,
			one giant leap for mankind."
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OModal, OModalPane } from '@square/orbit/components/Modal';

export default {
	components: {
		OModal,
		OModalPane,
	},

	props: {
		title: String,
	},
};
</script>
```


### Opening Alerts from Modals

```vue
<template>
	<o-button @click="openModal">
		Update Profile
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { ModalLayer } from '@square/orbit/components/Modal';
import UpdateProfile from 'doc/UpdateProfile.vue';

export default {
	components: {
		OButton,
	},

	inject: {
		modal: ModalLayer,
	},

	methods: {
		openModal() {
			this.modal.open(UpdateProfile);
		},
	},
};
</script>
```

_UpdateProfile.vue_
```vue
<template>
	<o-modal :before-close="beforeModalClose">
		<o-modal-pane title="Update Profile">
			<template
				slot="actions"
				slot-scope="modal"
			>
				<o-button @click="modal.close()">
					Cancel
				</o-button>
				<o-button
					variant="primary"
					@click="modal.close('Save')"
				>
					Save
				</o-button>
			</template>
			<p>Add a name and then click Cancel to trigger the Alert</p>
			<o-form>
				<o-form-item label="Name">
					<o-grid>
						<o-grid-item>
							<o-input
								v-model="profileData.fname"
								placeholder="First"
							/>
						</o-grid-item>
						<o-grid-item>
							<o-input
								v-model="profileData.lname"
								placeholder="Last"
							/>
						</o-grid-item>
					</o-grid>
				</o-form-item>
			</o-form>
		</o-modal-pane>
	</o-modal>
</template>

<script>
import { OModal, OModalPane } from '@square/orbit/components/Modal';
import { AlertLayer } from '@square/orbit/components/Alert';
import { OButton } from '@square/orbit/components/Button';
import { OForm, OFormItem } from '@square/orbit/components/Form';
import { OInput } from '@square/orbit/components/Input';
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

import AreYouSure from 'doc/AreYouSure.vue';

export default {
	components: {
		OModal,
		OModalPane,
		OButton,
		OGrid,
		OGridItem,
		OForm,
		OFormItem,
		OInput,
	},

	inject: {
		alert: AlertLayer,
	},

	data() {
		return {
			profileData: {
				fname: '',
				lname: '',
			},
		};
	},

	methods: {
		beforeModalClose(exitVal, proceed, stop) {
			if (exitVal) {
				proceed();
				return;
			}

			this.alert.open(AreYouSure, {
				on: {
					close: (okToClose) => (okToClose ? proceed() : stop()),
				},
			});
		},
	},
};
</script>
```

_AreYouSure.vue_
```vue
<template>
	<o-alert
		title="Are you sure?"
		v-on="$listeners"
	>
		Your changes will be lost. Are you sure you want to close?

		<template
			slot="actions"
			slot-scope="alert"
		>
			<o-button @click="alert.close(false)">
				Cancel
			</o-button>
			<o-button
				variant="primary"
				@click="alert.close(true)"
			>
				Confirm
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
};
</script>
```

### Advanced Use Cases

The `ModalLayer` assumes that your application is using a [Layout](/components/layout) component. The Layout component will automatically provide you with a Layer and an ModalLayer Key so you can mount modals easily on an already created layer. If you see this error:

`[Orbit error][Layer]: Layer with id "layer_(RANDOM HASH)" not found`

It's possible that you're not using the Layout or Layer component in your application. If so, you will be missing the provided ModalLayer and will either need to use the Layout component, or define your own mounting point by providing a [Layer](/components/layer) component. You can read more about that in the [Layer Docs](/components/layer).

## API

### Modal Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `before-close` | `Function` | — | A callback function with parameters `(exitVal, proceed <function>, stop <function>)` to proceed with or stop a cancel |
| `size`  | String<br/>`large`, `medium`  | `medium` | Change the size of the modal. |
| `backdrop`  | `Boolean` | `false` | Use a gray background. |

### Modal Events
| Attribute |  Arguments | Triggers when... |
---- | ----| ---- |
| `close` | Exit value | Modal is closed |

### Modal Methods
| method    | Description         |
| ------- |-------------------- |
| back() | To go back one panel |
| close(exitVal) | To close the modal. The `exitVal` is the value that gets emitted along with the `close` event, or passed through the beforeClose parameters. |
| forward() | To go forward one panel |

## Modal Pane Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `title`  | String  | - | Title of the modal pane. Will be given the correct heading styling. |
| `backdrop`  | `Boolean` | `false` | Use a gray background. |
| `show-close` | `Boolean` | `false` | Used to opt out of the back button in the top left on a pane. When set to true, it will replace the top left '<' button on any pane after the first with a "X". |
| `flush`  | `Boolean` | `false` | Removes the padding. |

### Modal Pane Slots

| slot    | Description         |
| ------- |-------------------- |
| default | The rest of the section content can be placed in the default slot. It can be placed anywhere in the component, and does not need to be placed inside a named slot. |
| actions | Modal actions (eg. Buttons) can be passed into this scoped-slot. The Modal API is available through the slot-scope. |
| tabs | Accepts Tabs. Will render them in the parent Modal's header. |


### ModalLayer Methods
| Name | Parameters | Description |
| ---- | ---------- | ----------- |
| `open` | `(Component, { DataObject })` | Component: Your Modal component. <br> DataObject: Refer to the [vue docs](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) for all the options available. |
| `isOpen` | — | Whether another component is already being displayed on the layer or not. |
