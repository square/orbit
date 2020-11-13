# Toast
Toasts are transient messages lasting 4s that provide brief feedback in response to an action the user has taken.

## When to Use Toasts
Use a toast to notify a user about the status of an action they've just taken.

Use a [Notice](/components/notice) instead when:
* The message is important
* You want the user to have to interact with the message (such as confirm/acknowledge it or learn more)

Use an [Alert](/components/alert) instead when:
* The message demands immediate attention from your user
* You need to present your user with options of how to proceed

## Best Practices
Limit your Toast message to one line if possible, since toasts are transient. If your message is longer than one line, consider adding a [description](#toasts-with-descriptions), or perhaps using another component.

Toasts should be used when your message does not demand immediate attention or require interaction to proceed.

Only use Toasts to notify a user about an action they've taken. Toast should not be unprompted.

## Examples
A parent with a mountable layer is required for this component to work properly. All the examples below assume that your application has a parent `OLayout` with layers enabled with the `has-layers` prop. See the [OLayout](/components/Layout) docs for more information.

### Basic Toast
Open a toast in the bottom right corner. It will persist for 4 seconds or till the user dismisses it by clicking the X.

To open a toast, first inject the toast api. Then you can run `this.toast.show({ ... })`, where `...` is your Toast options.

```vue
<template>
	<o-button @click="showMyToast">
		Show Toast
	</o-button>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},

	inject: {
		toast: ToastAPI,
	},

	methods: {
		showMyToast() {
			this.toast.show({ message: 'Toast Opened.' });
		},
	},
};
</script>
```

### Toasts with Actions
Toasts can be given actions which will perform a function when clicked (such as “Undo”).

Add an action to your Toast when the notification may need to be undone, viewed, or if there is another step that may need to be taken.

If a Toast has an action, its duration increases from 4s to 6s.

```vue
<template>
	<o-button @click="showMyToast">
		Show Toast
	</o-button>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},

	inject: {
		toast: ToastAPI,
	},

	methods: {
		showMyToast() {
			this.toast.show({
				message: 'Toast with Action',
				action: { text: 'Action', function: this.handleClick },
			});
		},

		handleClick() {
			// Do something
		},
	},
};
</script>
```

### Toasts with Descriptions
Add additional text below the title.

Use descriptions when more than a single line of information is needed.

To add, include a `description` prop in the object you pass into the `show` method, or by including text in the default slot of a [custom toast](#custom-toasts). If a Toast has a description, its duration increases from 4s to 6s.

```vue
<template>
	<o-button @click="showMyToast">
		Show Toast
	</o-button>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},

	inject: {
		toast: ToastAPI,
	},

	methods: {
		showMyToast() {
			this.toast.show({
				message: 'Toast Opened.',
				description: 'Master cleanse synth aesthetic listicle skateboard sushi denim tbh marfa austin etsy messenger bag squid.',
			});
		},
	},
};
</script>
```

### Persistent Toasts
Have a Toast remain on screen till it is dismissed explicitly by click the "X".

Use a persistent Toast when the information shown is important for the user to understand and acknowledge, such as a loading Toast, or a an error Toast that requires action.

Actions in persistent Toasts will render as buttons in the description area.

```vue
<template>
	<o-button @click="showMyToast">
		Show Toast
	</o-button>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},

	inject: {
		toast: ToastAPI,
	},

	methods: {
		showMyToast() {
			const toast = this.toast.show({
				message: 'Persistent Toast with description & action',
				description: 'Master cleanse synth aesthetic listicle skateboard sushi denim tbh marfa austin etsy messenger bag squid.',
				action: { text: 'Action', function: this.handleClick },
				persistent: true,
			});

			toast.closed.then(() => {
				// Handle closed toast
			});
		},

		handleClick() {
			// Do something
		},
	},
};
</script>
```

## Variants

### Error Toasts
Using the `variant` prop, you can create error Toasts. Use an error variant when you are relaying an error message to the user. Provide an action if the user can do something to address the error.

Make the error Toast persistent if the action is important or must be taken.

If there are mixed successes and errors, show two separate Toasts for the success message and the error message.

Error toasts should only be used when showing the error in context is not feasible.

```vue
<template>
	<div>
		<o-button @click="errorToast">
			Show Toast
		</o-button>
		<o-button @click="persistentErrorToast">
			Show Persistent Toast
		</o-button>
	</div>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},

	inject: {
		toast: ToastAPI,
	},

	methods: {
		errorToast() {
			this.toast.show({
				message: 'There was a problem with your upload.',
				action: { text: 'Try again', function: this.handleClick },
				variant: 'error',
			});
		},

		persistentErrorToast() {
			this.toast.show({
				message: 'Looks like something went wrong',
				description: "That's okay! Let's take a look at the issue and see how we can fix it.",
				action: { text: 'Get Details', function: this.handleClick },
				variant: 'error',
				persistent: true,
			});
		},

		handleClick() {
			// Do something
		},
	},
};
</script>
```

### Warning Toasts
Use the warning variant when you are notifying a user about something they might have missed.

Warning toasts should only be used when showing an ONotice in context is not feasible.

```vue
<template>
	<div>
		<o-button @click="warningToast">
			Show Toast
		</o-button>
	</div>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},

	inject: {
		toast: ToastAPI,
	},

	methods: {
		warningToast() {
			this.toast.show({
				message: 'You haven’t enabled pickup fulfillment',
				description: 'Sellers in your industry choose to provide in-store pickup to their customers. Would you like to enable pickup?',
				action: { text: 'Enable pickup now', function: this.handleClick },
				variant: 'warning',
				persistent: true,
			});
		},

		handleClick() {
			// Do something
		},
	},
};
</script>
```

## Advancted Examples
### Custom Toasts
For more advanced Toasts, you can create your own Toast component and pass in your own props, markup or apply custom CSS. In this example, we created a Toast component with custom props, an image and custom styling.

If your toast needs a lot of customizations, chances are it is pushing the boundaries of what a Toast is meant to do. Consult your designer or #w-design-engineering to see how best to proceed.

```vue
<template>
	<o-button @click="showToast">
		Show Custom Toast
	</o-button>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';
import CustomToast from 'doc/CustomToast.vue';
import HighFiveSVG from './highfive.svg';

export default {
	components: {
		OButton,
		CustomToast,
	},

	inject: {
		toast: ToastAPI,
	},

	methods: {
		showToast() {
			this.toast.show((h) => h(
				CustomToast,
				{
					props: {
						name: 'Mike',
						image: HighFiveSVG,
						description: "You’ve successfully added your first product! Now, let's set up your payments so you can accept orders.",
						action: {
							text: 'Step 5: Payments',
							handler: this.handleClick,
						},
					},
				},
			));
		},

		handleClick() {
			// Do something
		},
	},
};
</script>
```

_CustomToast.vue_
```vue
<template>
	<o-toast
		:message="`Nice work ${name}!`"
		:action="{ text: action.text, function: action.handler }"
		persistent
	>
		<div class="content">
			{{ description }}
		</div>
		<img
			:src="image"
			class="image"
		>
	</o-toast>
</template>

<script>
import { OToast } from '@square/orbit/components/Toast';

export default {
	components: {
		OToast,
	},

	props: {
		name: String,
		image: String,
		description: String,
		action: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>
.content {
	padding-right: 126px;
}

.image {
	transform: translateY(-50%);
	position: absolute;
	top: calc(50% + 5px);
	right: 16px;
	width: 120px;
}
</style>
```

### Loading Toasts
Toasts can be a great way to let a user know that a process is running in the background without preventing them from interacting with their dashboard. Depending on whether you can determine the overall progress of the loading, use one of the demos below.

**Indefinite Loading Toast**: If you cannot determine how long your process will take, show a persistent toast and inform the user that it is running in the background and that you will notify them when its complete or if there are any errors.

**Progress Loading Toast**: If you can determine how long your process will take, include a progress bar in your Toast to give them an idea of how long it will take.

```vue
<template>
	<div>
		<o-button @click="showIndefiniteToast">
			Indefinite Loading Toast
		</o-button>
		<o-button @click="showProgressToast">
			Progress Loading Toast
		</o-button>
	</div>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';
import ProgressToast from 'doc/ProgressToast.vue';

export default {
	components: {
		OButton,
		ProgressToast,
	},

	inject: {
		toast: ToastAPI,
	},

	data() {
		return {
			uploadProgress: 0,
		};
	},

	methods: {
		showIndefiniteToast() {
			const indefiniteToast = this.toast.show({
				message: 'Syncing products',
				description: 'Your products are syncing. We will notify you later when its complete and inform you of any issues.',
				persistent: true,
			});

			// Close the Toast when the loading is done, and then after a 500ms delay show success/error
			setTimeout(() => {
				indefiniteToast.close();
				setTimeout(() => {
					this.toast.show({ message: 'Products synced successfully.' });
				}, 500);
			}, 2000);
		},

		showProgressToast() {
			this.uploadProgress = 0;

			const loadingToast = this.toast.show((h) => h(
				ProgressToast,
				{
					props: {
						// Note: This loading state is owned & instantiated per parent, not per Toast
						progress: this.uploadProgress,
					},
				},
			));

			const simulateProgress = () => {
				setTimeout(() => {
					this.uploadProgress += (Math.random() / 6) % 1;
					if (this.uploadProgress < 1) {
						simulateProgress();
					} else {
						loadingToast.close().then(() => {
							this.toast.show({ message: '88 files uploaded successfully.' });
							this.toast.show({
								message: '2 files exceeded the max file size of 2mb.',
								variant: 'error',
							});
						});
					}
				}, 300);
			};

			simulateProgress();
		},

		handleClick() {
			// Do something
		},
	},
};
</script>
```

_ProgressToast.vue_
```vue
<template>
	<o-toast
		message="Uploading files..."
		persistent
	>
		<o-progress-bar
			:progress="progress"
			class="progress-bar"
		/>
	</o-toast>
</template>

<script>
import { OToast } from '@square/orbit/components/Toast';
import { OProgressBar } from '@square/orbit/components/ProgressBar';

export default {
	components: {
		OToast,
		OProgressBar,
	},

	props: {
		progress: Number,
	},
};
</script>

<style scoped>
.progress-bar {
	margin-top: 16px;
}
</style>
```

### Closing a Toast
Close a Toast programatically by calling the `close` method.

```vue
<template>
	<div>
		<o-button @click="defaultToast">
			Open a Toast
		</o-button>
		<o-button @click="closeToasts">
			Close all Toasts
		</o-button>
	</div>
</template>

<script>
import { ToastAPI } from '@square/orbit/components/Toast';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},

	inject: {
		toast: ToastAPI,
	},

	data() {
		return {
			toasts: [],
		};
	},

	methods: {
		defaultToast() {
			const toast = this.toast.show({ message: 'Toast' });
			this.toasts.push(toast);
		},
		closeToasts() {
			this.toasts.forEach((toast) => toast.close());
		},
	},
};
</script>
```

## Toast Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `message`* | `String` | - | *Required. The main text for your Toast. |
| `description` | `String` | - | Additional text that can be added beneath your message. This can only be used when creating a toast object. For custom toasts, use the default slot. |
| `action` | `{text: String, function: Function}` | - | Adds a button with the text and click handler function you define. |
| `variant` | `String`<br/>`default`, `error`, `warning`  | - | Changes the style of the toast. |
| `persistent` | `Boolean` | false | If true, the Toast will remain open until closed and the action will render as a primary button. |

## Toast Slots
| Name | Description |
| ---- | ----------- |
| `default` | Use to create custom content for your toast. Appears just after the description if there is one. |

## ToastAPI Methods
| Name | Accepts | Description |
| ---- | ------- | ----------- |
| `show` | `{ ...toastAttributes }` or render function | Pass in either an object that contains your toast's attributes, e.g. `{ message: 'Toasty!' }`<br><br>or a Vue render function (for custom Toasts). |
| `close` | - | Close the toast. |
