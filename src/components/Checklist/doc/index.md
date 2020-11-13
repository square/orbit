# Checklist
Checklist is a component that represents a set of tasks to a user. Each item links to an associated area represents if a task has been completed or not. Checklists usually represent a collection of tasks that help drive a user to complete a larger goal.


## Examples

### Basic Checklist
```vue
<template>
	<o-checklist>
		<o-checklist-item
			v-for="(goal, index) in goalList"
			:key="index"
			:title="goal.title"
			:to="goal.to"
			:completed="goal.completed"
		/>
	</o-checklist>
</template>
<script>
import { OChecklist, OChecklistItem } from '@square/orbit/components/Checklist';

export default {
	components: {
		OChecklist,
		OChecklistItem,
	},

	data() {
		return {
			goalList: [
				{
					title: 'Add a product',
					to: '#products',
					completed: true,
				},
				{
					title: 'Connect a payment processor',
					to: '#payment',
					completed: false,
				},
				{
					title: 'Charge shipping',
					to: '#shipping',
					completed: false,
				},
			],
		};
	},

	computed: {
		completedGoals() {
			return this.goalList.filter((goal) => goal.completed);
		},
		completionProgress() {
			return this.completedGoals.length / this.goalList.length;
		},
	},
};
</script>
```

### Checklist with Progress Bar
This example shows a checklist that also has an associated [ProgressBar](/component/progress-bar) component with a `theme="success"`. Keep in mind that ProgressBar is a separate component, and can be placed anywhere as designed.

```vue
<template>
	<div>
		<o-checklist>
			<o-checklist-item
				v-for="(goal, index) in goalList"
				:key="index"
				:title="goal.title"
				:to="goal.to"
				:completed="goal.completed"
			/>
		</o-checklist>
		<o-progress-bar
			:progress="completionProgress"
			class="progress-bar"
			theme="success"
		>
			{{ completedGoals.length }} of {{ goalList.length }} completed.
		</o-progress-bar>
	</div>
</template>
<script>
import { OChecklist, OChecklistItem } from '@square/orbit/components/Checklist';
import { OProgressBar } from '@square/orbit/components/ProgressBar';

export default {
	components: {
		OChecklist,
		OChecklistItem,
		OProgressBar,
	},

	data() {
		return {
			goalList: [
				{
					title: 'Add a product',
					to: '#products',
					completed: true,
				},
				{
					title: 'Connect a payment processor',
					to: '#payment',
					completed: false,
				},
				{
					title: 'Charge shipping',
					to: '#shipping',
					completed: false,
				},
			],
		};
	},

	computed: {
		completedGoals() {
			return this.goalList.filter((goal) => goal.completed);
		},
		completionProgress() {
			return this.completedGoals.length / this.goalList.length;
		},
	},
};
</script>
<style scoped>
.progress-bar {
	margin-top: 24px;
}
</style>
```

## ChecklistItem Attributes
| Name   | Type | Default | Description
| ------ |----- | ------- |------------ |
| `title`* | String | - | *Required Title of the checklist item, appears as a clickable link if the item is not yet completed. |
| `to`  | `String`, `Object` | — | The value to be passed into the `to` attribute of router-link or the `href` attribute of the anchor tag. |
| `completed` | Boolean | - | Whether the item should be marked as completed or not. |
