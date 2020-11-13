# Divider
The divider component adds a horizontal line in between content.

**Note: Vertical lines are coming soon.**

```vue
<template>
	<div>
		<div class="light-bg">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Curabitur interdum massa vel rhoncus sollicitudin.
				Aenean faucibus ipsum et malesuada tempor.
				Duis mollis suscipit ipsum, eget lacinia diam luctus sed.
				Maecenas in urna sed est posuere consectetur vitae in enim.
				Morbi finibus mi vel nisl facilisis ultricies. Integer id leo lorem.
			</p>

			<o-divider />

			<p>
				Sed dapibus nunc eget luctus convallis.
				Phasellus eros mauris, luctus in luctus vel, efficitur ut libero.
				Quisque ut dui aliquam, viverra sapien id, convallis metus.
				Quisque commodo sapien metus, nec pellentesque ante pellentesque ac.
				In accumsan lobortis quam.
			</p>
		</div>
		<div class="dark-bg">
			<p>
				Mauris aliquam dolor enim, eu cursus lacus placerat scelerisque.
				Integer malesuada consectetur augue vitae cursus.
				Nunc eget mauris eget ipsum blandit euismod sit amet nec lorem.
			</p>

			<o-divider theme="light" />

			<p>
				Donec sapien nibh, efficitur ut viverra sed, posuere a nibh.
				Suspendisse at ex lorem. Donec sed dignissim lorem, nec condimentum magna.
				Sed sed tortor dictum, sodales tellus quis, dignissim ante.
			</p>
		</div>
	</div>
</template>

<script>
import { ODivider } from '@square/orbit/components/Divider';

export default {
	components: {
		ODivider,
	},
};
</script>

<style scoped>
.light-bg {
	background-color: white;
}

.dark-bg {
	padding: 16px;
	margin-top: 32px;
	background-color: #666c70;
	color: white;
}

</style>
```

## Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `spacing`  | `Number` <br/> `0`, `4`, `8`, `16`, `24`, `32`, `40`, `48`, `56`, `64`, `128` | `16` | Sets the top and bottom margins on the divider to this value. |
| `theme`  | `String`<br/> `dark`, `light`, `transparent`   | `dark` | The opacity of the dividing line. Transparent sets the visibility of the Divider to none. |

