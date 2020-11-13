# Steps
The Steps component guides users through the steps of a task. User's can click through previously completed steps by clicking on the checkmark or title of any previous step.

Your Steps component will respond to changes to `current-step`. Here, we demo doing this using `v-model` and a button which increments the current step.

```vue
<template>
	<div>
		<o-steps v-model="currentStep">
			<o-step-item />
			<o-step-item />
			<o-step-item />
			<o-step-item />
		</o-steps>

		<p>Current Step: {{ currentStep }}</p>

		<o-button @click="currentStep = Math.max((currentStep + 1) % 5, 1)">
			Next Step
		</o-button>
	</div>
</template>

<script>
import { OSteps, OStepItem } from '@square/orbit/components/Steps';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSteps,
		OStepItem,
		OButton,
	},

	data() {
		return {
			currentStep: 2,
		};
	},
};
</script>
```

## Title and Description
Steps may have titles and descriptions if desired.
```vue
<template>
	<o-steps v-model="currentStep">
		<o-step-item
			title="Title"
			description="Description"
		/>
		<o-step-item
			title="Title"
			description="Description"
		/>
		<o-step-item
			title="Title"
			description="Description"
		/>
		<o-step-item
			title="Title"
			description="Description"
		/>
	</o-steps>
</template>

<script>
import { OSteps, OStepItem } from '@square/orbit/components/Steps';

export default {
	components: {
		OSteps,
		OStepItem,
	},

	data() {
		return {
			currentStep: 2,
		};
	},
};
</script>
```

## Variant: Condensed
Replaces the circles with numbers inside, with circle `o-icons`.

Use when space is limited, such as in Sheet Titles. See the [Sheet docs](/components/Sheet) for more examples.

```vue
<template>
	<div>
		<o-steps
			v-model="currentStep"
			variant="condensed"
		>
			<o-step-item title="Step 1" />
			<o-step-item title="Step 2" />
			<o-step-item title="Step 3" />
			<o-step-item title="Step 4" />
		</o-steps>
	</div>
</template>

<script>
import { OSteps, OStepItem } from '@square/orbit/components/Steps';

export default {
	components: {
		OSteps,
		OStepItem,
	},

	data() {
		return {
			currentStep: 2,
		};
	},
};
</script>
```

## Direction: Vertical
You can orient your steps vertically by using the `direction` property.
```vue
<template>
	<o-steps
		v-model="currentStep"
		direction="vertical"
	>
		<o-step-item
			title="Title"
			description="Description"
		/>
		<o-step-item
			title="Title"
			description="Description"
		/>
		<o-step-item
			title="Title"
			description="Description"
		/>
		<o-step-item
			title="Title"
			description="Description"
		/>
	</o-steps>
</template>

<script>
import { OSteps, OStepItem } from '@square/orbit/components/Steps';

export default {
	components: {
		OSteps,
		OStepItem,
	},

	data() {
		return {
			currentStep: 2,
		};
	},
};
</script>
```

## Clickable Steps
By default, only previously completed steps are clickable. You can make either all steps clickable or no steps to be clickable by adding the `clickable` prop to your component.
```vue
<template>
    <div>
        <h3>Clickable: "completed" (default)</h3>
        <o-steps
            v-model="firstDemo"
        >
            <o-step-item
                title="Title"
                description="Description"
            />
            <o-step-item
                title="Title"
                description="Description"
            />
            <o-step-item
                title="Title"
                description="Description"
            />
            <o-step-item
                title="Title"
                description="Description"
            />
        </o-steps>

        <h3>Clickable: "none"</h3>
        <o-steps
            v-model="secondDemo"
            clickable="none"
        >
            <o-step-item
                title="Title"
                description="Description"
            />
            <o-step-item
                title="Title"
                description="Description"
            />
            <o-step-item
                title="Title"
                description="Description"
            />
            <o-step-item
                title="Title"
                description="Description"
            />
        </o-steps>
	</div>
</template>

<script>
import { OSteps, OStepItem } from '@square/orbit/components/Steps';

export default {
	components: {
		OSteps,
		OStepItem,
	},

	data() {
		return {
			firstDemo: 2,
			secondDemo: 3,
		};
	},
};
</script>
```

## Steps Attributes
| Name | Type | Default | Description
| ------ |----- | ------- |------------ |
| `clickable` | Boolean/String | `false`/`completed` | (`all`, `completed`, `none`) to set which steps to be clickable. (`true`/`false` equates to `all`/`completed`)|
| `current-step` | Number | - | The index of the current step |
| `direction` | String | `horizontal` | to specify the direction of the steps, `horizontal` and `vertical` are currently supported |

## Steps Item Attributes
| Name | Type | Default | Description
| ------ |----- | ------- |------------ |
| `title` | String | - | title of the step, optional property |
| `description` | String | - | description of the step, optional property |
| `invalid` | Boolean | `false` | Indicates that a step is invalid with a red number |

## Events
| Name | Arguments | Triggers when... |
| ---- | --------- | ---------------- |
| `steps:change` | Step (`Number`) | the value of `current-step` changes |
| `steps-item:update` | - | The index of a step changes |
