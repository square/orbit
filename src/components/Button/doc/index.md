# Button
Users need the ability to trigger actions within a product. Buttons trigger events or actions and can be placed on pages, panels, modals, or option tips.

## Variants

### Normal

```vue
<template>
	<div>
		<o-button>Button</o-button>
		<o-button
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Dark

```vue
<template>
	<div>
		<o-button variant="dark">
			Button
		</o-button>
		<o-button
			variant="dark"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Secondary

```vue
<template>
	<div>
		<o-button variant="secondary">
			Secondary
		</o-button>
		<o-button
			variant="secondary"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Subtle

```vue
<template>
	<div>
		<o-button variant="subtle">
			Subtle
		</o-button>
		<o-button
			variant="subtle"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Primary

Fill the button with our primary brand color.

Used to show emphasis and the main action in view. Use for the main action in a view, or the 'Save' action in a Modal or Breadcrumb.


```vue
<template>
	<div>
		<o-button variant="primary">
			Primary
		</o-button>
		<o-button
			variant="primary"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Destructive

```vue
<template>
	<div>
		<o-button variant="destructive">
			Destructive
		</o-button>
		<o-button
			variant="destructive"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Destructive Secondary

```vue
<template>
	<div>
		<o-button variant="destructive-secondary">
			Destructive
		</o-button>
		<o-button
			variant="destructive-secondary"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Muted Primary

```vue
<template>
	<div>
		<o-button variant="muted-primary">
			<o-icon name="gear" />
		</o-button>
		<o-button variant="muted-primary">
			Muted
		</o-button>
		<o-button
			variant="muted-primary"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OButton,
		OIcon,
	},
};
</script>
```

### Muted

```vue
<template>
	<div>
		<o-button variant="muted">
			<o-icon name="gear" />
		</o-button>
		<o-button variant="muted">
			Muted
		</o-button>
		<o-button
			variant="muted"
			disabled
		>
			Disabled
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OButton,
		OIcon,
	},
};
</script>
```

### Text

Use for less important actions in a modal or table row.

```vue
<template>
	<o-button variant="text">
		Text
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Upgrade

```vue
<template>
	<div>
		<o-button variant="upgrade">
			Primary Upgrade
		</o-button>
		<o-button
			variant="upgrade"
			disabled
		>
			Disabled Primary Upgrade
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Upgrade Secondary

```vue
<template>
	<div>
		<o-button variant="upgrade-secondary">
			Secondary Upgrade
		</o-button>
		<o-button
			variant="upgrade-secondary"
			disabled
		>
			Disabled Secondary Upgrade
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

### Upgrade Text

```vue
<template>
	<div>
		<o-button variant="text-upgrade">
			Upgrade Text
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

## Label with Icon

Add an icon to the left or right of the label.

A button can use familiar icons to convey meaning quickly. Keep the icon on the left unless the action
represents forwards progress.

## Icon

Remove the label and simply use an icon to represent the action.

Use icon buttons when the icon has a strong, clear association to an action. This association
should be both across our application and the platform it is on (web, iOS, Android).

```vue
<template>
	<div>
		<o-button>
			<o-icon name="filter" />
		</o-button>

		<o-button>
			<o-icon name="pencil" />
		</o-button>

		<o-button>
			<o-icon name="calendar" />
		</o-button>

		<o-button>
			<o-icon name="gear" />
		</o-button>

		<o-button>
			<o-icon name="trashcan" />
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OButton,
		OIcon,
	},
};
</script>
```

## Button as a link/router-link
When you use the `href` prop, the button will be rendered with a `router-link` or a simple anchor tag if the target destination isn't detected as a valid route in the registered app router. The `href` prop accepts external URLs and the same values a [`router-link` `to` prop](https://router.vuejs.org/en/api/router-link.html) would.

```vue
<template>
	<o-button href="http://www.google.com">
		Goodbye
	</o-button>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
};
</script>
```

## Selectable buttons

Clicking the button will toggle the button to and from an _active_ state.

_Related component:_ If you have a group of selectable buttons that appear beside each other _without a gap_, use the [Button Group](/components/button-group) component instead of multiple selectable buttons..

```vue
<template>
	<div>
		<o-button :selected.sync="isButtonSelected">
			Selectable Button
		</o-button>
		<p>isButtonSelected: {{ isButtonSelected }}</p>

		<br>

		<o-button
			v-for="(button, idx) in selectableButtons"
			:key="idx"
			:selected="selectedButton === button.value"
			class="mySelectButtons"
			@click="selectButton(button.value)"
		>
			Selectable Button {{ button.value }}
		</o-button>
		<p>
			selectedButton: {{ selectedButton }}
		</p>
	</div>
</template>
<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
	data() {
		return {
			isButtonSelected: false,
			selectedButton: 1,
			selectableButtons: [
				{
					value: 1,
				},
				{
					value: 2,
				},
				{
					value: 3,
				},
			],
		};
	},
	methods: {
		selectButton(idx) {
			this.selectedButton = (this.selectedButton === idx) ? null : idx;
		},
	},
};
</script>
<style scoped>
.mySelectButtons:not(:last-child) {
	margin-right: 16px;
}
</style>
```

## Loading Buttons
The `loading` prop will disable the button and replace the button content with a loading spinner.

Use this in lieu of page loading if a button triggers an action that will take time to complete.

```vue
<template>
	<div>
		<o-button
			:loading="true"
			variant="primary"
		>
			Button
		</o-button>
		<o-button
			:loading="isLoading"
			@click="demoLoading"
		>
			Demo loading
		</o-button>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OButton,
	},
	data() {
		return { isLoading: false };
	},
	methods: {
		demoLoading() {
			this.isLoading = true;
			setTimeout(() => { this.isLoading = false; }, 2000);
		},
	},
};
</script>
```
## Content Guidelines
Buttons should be clear and users should be able to anticipate what will happen when they click a button. By following these guidelines, we can make buttons more consistent and predictable.

### Do
* Use sentence case without punctuation

### Don't
* Use title case or punctuation

To help with predictability, we want to have some rules around what words we use in buttons and why.

### Do
* Use action verbs such as *Save* , *Share*, *Delete*, *Update*, *Connect*, *Create* and acknowledgement terms such as *Got it*, *OK*
* Use *Cancel* when a process has been started but the process will end without changes saved

### Don't
* Use vague terms or slang such as *Nope*
* Use *Apply* as it is somewhat old-fashioned and vague
* Use *Done* or *Close* as it is confusing as to whether changes have been saved; if used, should be for final task in a series of steps that have been saved along the way

### Don't
* Use outdated or technical terms such as *Apply changes*, *Revert*, *Submit*, *Synchronize*

### Do
* Use *Next* for 5 steps or less
* Use *Continue* for more than 5 steps or for a complicated process

### Don't
* Use *Save & Close*. *Save* is sufficient for a modal.

### Do
* Use *Update* when user has updated existing information, such as an address or credit card
* Use *Save* when user is providing new information that doesn’t replace old information, or after performing a task

### Do
* Use *Create* when generating something new
* Use *Add* when something or a set of something already exists (use Add for products & categories, as in Add product)

### Don't
* Use *Set*

### Do
* Use *Upload* when user is copying a file or data
* Use *Import* when the system is getting files or data

### Do
* Use *View* when the action takes the user to a different page or section for additional details
* Use *Hide* if element can toggle between visible and not visible
* Use *Dismiss* if element will actually go away (such as a help tip that won’t reappear)

### Do
* Use *Sign in*, *Sign up*, and *Sign out*

### Don't
* Use *Log in*, *Log out*

### Do
* Use *Select* when user is picking from a limited set of options: *Select image*, *Select 3 sections*
* Use *Choose* when user is make a more open-ended decision or a large set of options: *Choose template*, *Choose a color to match your brand*

### Don't
* Use *Check* or *Uncheck*: *Check the checkbox*

Scannability is important for usability. Keep your buttons short and succinct.

### Do
* Use short scannable phrases:  *Buy shipping label*, *Delete product*, *Save & add new product*

### Don't
* Include articles such as *a*, *an*, or *the* in phrases. For marketing copy, or for clarity, articles can be included if needed.

Icons are good visual cues, but should be used in a consistent way.

### Do
* Place icon to the left of the label to call attention to the button
* Use an icon that clearly communicates meaning & clarifies the action
* Button label text should complement the icon

### Don't
* Use 2 icons in the same button
* Stack an icon vertically on the label
* Use an icon that doesn’t match the text on the button

Placement also matters. Here are some rules to following when deciding where to place buttons.

### Do
* Display positive actions that move task forward on the right (*Save*, *Next*, *Sync now*)
* Display actions that cancel or move task backward on the left (*Back*, *Cancel*)

### Don't
* Make it complicated. If there is important info, place it near the button, as in “This will replace existing card”


## API

### Attributes

All [native button attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) and [anchor tag attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) will work on the Button component.

### Attributes
| Name | Type | Default | Description |
| ---- | ---- |-------- |------------ |
| `type` | `String` | `'button'` | Type of the button element. Ignored on buttons with `href`. |
| `variant` | `String`<br>`normal`, `primary`, `secondary`, `destructive`, `destructive-secondary`, `muted`, `text`, `upgrade`, `upgrade-secondary`, `dark`, `subtle` | `'normal'` | Changes button style. |
| `size` | `String`<br>`small`, `medium`, `large` | `'medium'` | Button size |
| `href` | `String`, `Object` | - | Changes element to an `<a>` |
| `disabled` | `Boolean` | `false` | Disables the button. |
| `full-width` | `Boolean` | `false` | Allows the button to grow to the width of its container. |
| `loading` | `Boolean` | `false` | Disables the button and replaces the content with a loading spinner. |
| `selected` | `Boolean` | `false` | Whether or not the button appears selected. |

## Events
| Name         | Parameters         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `update:selected` | `New value` | The selected property is updated. |
