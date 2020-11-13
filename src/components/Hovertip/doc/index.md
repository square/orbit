# Hovertip

A small container of text that floats above the page when an element is hovered.

### Do
- Use for showing text.
- Use in common flows where many users will already know the info or will learn quickly.

### Don't
- Don't use for interactive content. Anything that requires the user to click or otherwise interact with will not work. Use a Popover instead.
- Don't use it to provide info at a page or section level. Instead place this text inline below the page title or section title.
- Don't use for infrequently accessed flows. For flows that users have less familiarity with, make the contextual help visible on the page.

## Examples

```vue
<template>
	<div>
		<o-icon
			v-hovertip="'Wrap the directive argument with single quotes if it\'s a string.'"
			class="icon"
			name="circle-question-mark"
			tabindex="0"
		/>

		<o-icon
			v-hovertip="myString"
			class="icon"
			name="circle-question-mark"
			tabindex="0"
		/>

		<o-icon
			v-hovertip="`
The Hover Tip will be opened on hover and focus.
For icons, make sure to add a tabindex attribute. This makes them focusable by
tabbing on a keyboard.
			`.trim()"
			class="icon"
			name="circle-question-mark"
			tabindex="0"
		/>

		<o-icon
			v-hovertip="formattedStr"
			class="icon"
			name="circle-question-mark"
			tabindex="0"
		/>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import { OHovertip } from '@square/orbit/components/Hovertip';

const outdent = ([str]) => {
	const tab = str.match(/^\t+/m);
	return str.replace(new RegExp(tab[0], 'gm'), '').trim();
};

export default {
	components: {
		OIcon,
	},
	directives: {
		Hovertip: OHovertip,
	},
	data() {
		return {
			myString: 'You can also pass in a variable. 👍',
			formattedStr: outdent`
			You can format your strings with...

			new lines!

				and tabs :)
			`,
		};
	},
};
</script>

<style scoped>
.icon {
	margin-right: 16px;
}
</style>
```

### Adding a Delay
To add a delay to your content on show or hide, you can do so by passing in an object with a `content` and `delay` property, where `delay` is a `number` for the Show/Hide delay, or an object: `{ show: 500, hide: 100 }` (ms).

```vue
<template>
	<div>
		<o-icon
			v-hovertip="{
				content: 'Delays 500ms on show and hide',
				delay: 500,
			}"
			class="icon"
			name="circle-question-mark"
			tabindex="0"
		/>
		<o-icon
			v-hovertip="{
				content: 'Delays 500ms on show and 0ms on hide',
				delay: { show: 500, hide: 0 },
			}"
			class="icon"
			name="circle-question-mark"
			tabindex="0"
		/>
	</div>
</template>
<script>
import { OIcon } from '@square/orbit/components/Icon';
import { OHovertip } from '@square/orbit/components/Hovertip';

export default {
	components: {
		OIcon,
	},
	directives: {
		Hovertip: OHovertip,
	},
};
</script>
<style scoped>
.icon {
	margin-right: 16px;
}
</style>
```

## API

### Directive

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `v-hovertip` | `String`, `HovertipConfig` <br> `interface HovertipConfig { content: String, delay?: Number | DelayConfig }` <br> `interface DelayConfig { show: Number, hide: Number }` | - | Hovertip directive's content & delay. |
