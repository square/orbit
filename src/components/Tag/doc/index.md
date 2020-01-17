# Tag

Tags can be used to draw attention to information and indicate the status of something with the tag's `type`.

```vue
<template>
	<div>
		<o-tag>Info</o-tag>
		<o-tag type="success">
			Success
		</o-tag>
		<o-tag type="warning">
			Warning
		</o-tag>
		<o-tag type="error">
			Error
		</o-tag>
	</div>
</template>

<script>
import { OTag } from '@square/orbit/components/Tag';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OTag,
		OIcon,
	},
};
</script>
```

## Attributes
| Name | Type    | Default | Description            |
| --------- |----------------------- |-------- |--------------------------------------
| `type`      | `String` <br/> `info`, `success`, `warning`, `error` | `info` | Tag style |

## Slots
| slot    | Description         |
| ------- |-------------------- |
| `default`   | Content of the notice. |
