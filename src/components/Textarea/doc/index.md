# Textarea
A `textarea` allows the user to enter multiple lines of text into an input. It can hold an unlimited<!--, or limited--> number of characters. It can have placeholder text, be disabled, and be vertically resized.

```vue
<template>
	<div>
		<o-textarea placeholder="Placeholder" />
		<o-textarea
			placeholder="Placeholder"
			value="Entered Text"
			resizable
		/>
		<o-textarea
			placeholder="Placeholder (Disabled)"
			disabled
		/>
		<o-textarea
			placeholder="Placeholder (Disabled)"
			value="Entered Text (Disabled)"
			disabled
		/>
	</div>
</template>

<script>
import { OTextarea } from '@square/orbit/components/Textarea';

export default {
	components: {
		OTextarea,
	},
	data() {
		return {
			input: '',
		};
	},
};
</script>
```

## Binding Data
Binding textarea input using `v-model`.

```vue
<template>
	<div>
		<o-textarea
			v-model="textareaVal"
			placeholder="Placeholder"
		/>
		<label>Textarea value:</label> {{ textareaVal }}
	</div>
</template>

<script>
import { OTextarea } from '@square/orbit/components/Textarea';

export default {
	components: {
		OTextarea,
	},
	data() {
		return {
			textareaVal: '1. the curved path, usually elliptical, described by a planet, satellite, spaceship, etc., around a celestial body, as the sun.\n2. the usual course of one\'s life or range of one\'s activities.\n3. the sphere of power or influence, as of a nation or person: a small nation in the Russian orbit.',
		};
	},
};
</script>
```

## Themes

The theme prop lets you select from multiple styles of text areas. Use the `monospace` theme when asking users to write or paste code.

```vue
<template>
	<o-textarea
		v-model="textareaVal"
		theme="monospace"
		placeholder="Paste code snippet here..."
	/>
</template>

<script>
import { OTextarea } from '@square/orbit/components/Textarea';

const code = `const greeting = 'hello world';
console.log(greeting);`;

export default {
	components: {
		OTextarea,
	},
	data() {
		return {
			textareaVal: code,
		};
	},
};
</script>
```

### Validation and Errors
Use the `o-form-item` component for validation and errors. See the docs for that [here](/components/Form).

## Attributes
The textarea component also supports [native attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `placeholder` |  `String` | — | Placeholder for the Textarea.  |
| `disabled` |  `Boolean` | `false` | Disables the Textarea.  |
| `value` (v-model) | `String` | — | The bounded value of Textarea. |
| `resizable` | `Boolean` | `false` | Whether or not the Textarea is resizable. |
| `theme` | `String`<br>`normal`, `monospace` | `normal` | Style of font to use in Textarea. |

## Events
| Name   | Arguments | Triggers when... |
| ------ | --------- | ----------- |
| `textarea:update` | `newValue` | Textarea value changes. |
