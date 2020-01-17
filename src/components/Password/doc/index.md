# Password
A password input that behaves the same as the native `<input type="password">`.

## Example

```vue
<template>
	<form>
		<o-password
			v-model="passwordVal"
			placeholder="Password"
			autocomplete="off"
		/>
		<br>
		Password: {{ passwordVal }}
	</form>
</template>

<script>
import { OPassword } from '@square/orbit/components/Password';

export default {
	components: {
		OPassword,
	},
	data() {
		return {
			passwordVal: 'Orbit',
		};
	},
};
</script>
```

## Validation and Errors
Use the `o-form-item` component for validation and errors. See the docs for that [here](/components/Form).

## API

### Attributes

The Password component also supports [all native input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password).

| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `disabled` |  `Boolean` | `false` | Disables the input.  |
| `placeholder` |  `String` | — | Placeholder for the input.  |
| `size` | `String` <br/> 'small', 'medium' | 'medium' | Input size |
| `value` |  `String` | - | Starting value  |

## Events
| Name         | Arguments         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `blur` | `Event` | Propagates native event. |
| `change` | `Event` | Propagates native event. |
| `focus` | `Event` | Propagates native event. |
| `input` | `Event` | Propagates native event. |
| `keyup` | `Event` | Propagates native event. |
| `password:update` | `newValue` | Emits input value on `input`. |
