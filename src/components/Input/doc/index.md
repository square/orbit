# Input
Inputs allow users to input, edit and select text. They typically live in forms, but can appear in modals or alerts.

## Size Variants
```vue
<template>
	<div>
		<o-input placeholder="Medium (Default)" />
		<br>
		<o-input
			placeholder="Small"
			size="small"
		/>
	</div>
</template>

<script>
import { OInput } from '@square/orbit/components/Input';

export default {
	components: {
		OInput,
	},
	data() {
		return {
			inputVal: 'Hello World',
		};
	},
};
</script>

<style scoped>
input {
	margin-bottom: 16px;
}
</style>
```

## Prefix and Suffix
You can add a prefix and/or suffix to an input with the prefix and suffix props. For more advanced use cases, you can use the prefix and suffix slots.

Note: Prefixes &amp; Suffixes must use v-model to work properly.

```vue
<template>
	<div>
		<o-input
			v-model="price"
			placeholder="Prefix"
			prefix="$"
			type="number"
		/>
		<br>
		<o-input
			v-model="weight"
			placeholder="Suffix"
			suffix="lbs"
			type="number"
		/>
		<br>
		<o-input
			v-model="name"
			placeholder="Prefix"
		>
			<o-icon
				slot="prefix"
				name="facebook"
				class="facebook-blue"
			/>
		</o-input>
		<br>
		<o-input
			v-model="username"
			placeholder="Username"
		>
			<o-icon
				slot="prefix"
				name="circle-person"
			/>
			<o-icon
				slot="suffix"
				name="circle-x"
				@click="clear"
			/>
		</o-input>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import { OInput } from '@square/orbit/components/Input';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OInput,
		OIcon,
		OButton,
	},

	data() {
		return {
			name: 'John Smith',
			price: '6538.60',
			weight: '10',
			toggle1: true,
			username: '',
		};
	},

	methods: {
		clear() {
			this.username = '';
		},
	},
};
</script>
<style>
.facebook-blue {
	color: #3b5998;
}
</style>
```

## Alignment
You have the option changing the alignment of your input with the `align` prop.

```vue
<template>
	<o-input
		v-model.number="weight"
		placeholder="Weight"
		align="right"
		type="number"
		suffix="lb"
	/>
</template>

<script>
import { OInput } from '@square/orbit/components/Input';

export default {
	components: {
		OInput,
	},

	data() {
		return {
			weight: 10,
		};
	},
};
</script>
```

## Number type
Use `v-model.number` to maintain the number type of your data. Use `type="number"` to restrict the characters entered into the input to be numerical. Since `type="number"` uses native input type-validation, the caveat is that when the browser can't parse your input as a number, [it's natively acknowledged as an empty string](https://html.spec.whatwg.org/multipage/input.html#number-state-(type%3Dnumber)) and the Input will fallback to use the placeholder for positioning.
```vue
<template>
	<div>
		<o-input
			v-model.number="price"
			type="number"
			placeholder="Price"
			prefix="$"
		/>
		<br>
		<o-input
			v-model.number="weight"
			type="number"
			placeholder="Weight"
			suffix="lb"
		/>
	</div>
</template>

<script>
import { OInput } from '@square/orbit/components/Input';

export default {
	components: {
		OInput,
	},

	data() {
		return {
			price: 0,
			weight: 0,
		};
	},
};
</script>
```

### Validation and Errors
Use the `o-form-item` component for validation and errors. See the docs for that [here](/components/Form).

## Attributes
All [native input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) for the supported input types will work on the Input component (ex: you can use min, max and step for `type="number"`).

| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `value (v-model)` | `String`, `Number` | - | The value of the text inside the input. |
| `align` | `String`<br>`left`, `right` | Aligns text inside the input. |
| `prefix` | `String` | - | The prefix value type |
| `flush-prefix` | `Boolean` | `false` | If true removes space between prefix and input value |
| `size` | `String`<br>`small`, `medium` | `'medium'` | Size of input text |
| `suffix` | `String` | - | The suffix value type |
| `type` | `String`<br>`email`, `number`, `tel`, `text`, `url` | `'text'` | The default value type |
| `placeholder` | `String` | - | Placeholder for the input. |

## Methods

| Name | Accepts | Description |
| ---- | ------- | ----------- |
| `blur` | - | Removes focus from the input. |
| `focus` | - | Sets focus on the input. |

## Events
| Name         | Arguments         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `blur` | `Event` | Propagates native event. |
| `change` | `Event` | Propagates native event. |
| `focus` | `Event` | Propagates native event. |
| `input` | `Event` | Propagates native event. |
| `keyup` | `Event` | Propagates native event. |
| `input:update` | `newValue` | Emits input value on `input`. |
