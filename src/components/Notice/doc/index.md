# Notice
Notices show important information and usually require the user to complete an action or resolve an issue in order to hide the Notice.

You can also use a _dismissible_ Notice to display information that doesn't require immediate action. Dismissible Notices can be hidden by clicking on a right aligned "X" icon or action labeled "Dismiss" or "Hide".

Only the links within Notices are clickable, not the entire Notice.


## Type
Different `type`s of notices can convey a different meaning. Notices have 4 different types; `info`, `success`, `warning`, and `error`.

```vue
<template>
	<div>
		<o-notice>Info notice</o-notice>
		<o-notice type="success">
			Success notice
		</o-notice>
		<o-notice type="warning">
			Warning notice
		</o-notice>
		<o-notice type="error">
			Error notice
		</o-notice>
	</div>
</template>

<script>
import { ONotice } from '@square/orbit/components/Notice';

export default {
	components: {
		ONotice,
	},
};
</script>
```


## Subtle
To draw less attention to a notice, the background can be removed by setting the property `subtle` to `true`. This background color will correspond to the color of notice type, and will take up less vertical space.

```vue
<template>
	<div>
		<o-notice subtle>
			Info notice - subtle (without background)
		</o-notice>

		<o-notice
			type="success"
			subtle
		>
			Success notice - subtle (without background)
		</o-notice>

		<o-notice
			type="warning"
			subtle
		>
			Warning notice - subtle (without background)
		</o-notice>

		<o-notice
			type="error"
			subtle
		>
			Error notice - subtle (without background)
		</o-notice>
	</div>
</template>

<script>
import { ONotice } from '@square/orbit/components/Notice';

export default {
	components: {
		ONotice,
	},
};
</script>
```

## Grouping
Notices will automatically be grouped by `type` if they are placed next to each other.

```vue
<template>
	<div>
		<o-notice>Info notice</o-notice>

		<o-notice type="success">
			Success notice
		</o-notice>

		<o-notice type="warning">
			Warning notice
		</o-notice>

		<o-notice type="error">
			Error notice
		</o-notice>

		<o-notice type="error">
			Error notice
		</o-notice>

		<o-notice
			type="error"
			subtle
		>
			Error notice - subtle (without background).
		</o-notice>

		<o-notice type="success">
			Success notice
		</o-notice>

		<o-notice type="success">
			Success notice
		</o-notice>
	</div>
</template>

<script>
import { ONotice } from '@square/orbit/components/Notice';

export default {
	components: {
		ONotice,
	},
};
</script>
```

## Dismissible

Add the `dismissible` attribute to allow users to close your Notice. By default, an 'X' icon is
displayed. You can replace this icon with a text link by adding adding a `dismissible-text`
attribute with the value set to the text you would like to display.

A `dismiss` event is fired when the use clicks the dismiss button.

```vue
<template>
	<div>
		<o-notice
			dismissible
			@dismiss="onDismiss"
		>
			Info notice
		</o-notice>

		<o-notice
			type="success"
			dismissible
			@dismiss="onDismiss"
		>
			Success notice
		</o-notice>

		<o-notice
			type="success"
			dismissible
			@dismiss="onDismiss"
		>
			Success notice
		</o-notice>

		<o-notice
			type="warning"
			dismissible
			dismissible-text="Hide"
			@dismiss="onDismiss"
		>
			Warning notice with text link for dismissing
		</o-notice>
	</div>
</template>

<script>
import { ONotice } from '@square/orbit/components/Notice';

export default {
	components: {
		ONotice,
	},
	methods: {
		onDismiss() {
			// Your code here.
		},
	},
};
</script>
```

## Icons
You can replace the `circle` icon using the `icon` prop.

```vue
<template>
	<div>
		<o-notice icon="circle-question-mark">
			Info notice.
		</o-notice>

		<o-notice
			icon="circle-x"
			type="error"
		>
			Error notice
		</o-notice>

		<o-notice
			icon="bolt"
			type="warning"
		>
			Warning notice used for upgrades
		</o-notice>
	</div>
</template>

<script>
import { ONotice } from '@square/orbit/components/Notice';

export default {
	components: {
		ONotice,
	},
};
</script>
```

## Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `type` | `String`<br>`info`, `success`, `warning`, `error` | `'info'` | Types of notices |
| `dismissible` | `Boolean` | `false` | Show a close button in top-right corner. |
| `dismissibleText` | `String` | - | Replaces the default 'X' close icon on dismissible notices with a text link. Requires the `dismissible` prop to be set to `true` |
| `subtle` | `Boolean` | `false` | When set to true, the message has no background color or padding. |
| `icon` | `String` | - | Replaces the circle with an icon. This should either be the name of an `o-icon` or the src an `<img />` thats 16x16. |


## Events
| Name         | Parameters         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `dismiss` | - | Dismiss button pressed |
