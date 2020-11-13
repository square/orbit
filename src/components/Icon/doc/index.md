# Icon

Displays a 16x16 icon.

If you need to display an icon or illustration at a different size, use an `<img>` tag instead of this component.

```vue
<template>
	<div>
		<pre><code class="code">&lt;o-icon name="NAME" /&gt;</code></pre><br>
		<div class="grid">
			<div
				v-for="(icon, idx) in icons"
				:key="idx"
				class="row"
			>
				<o-icon
					:key="icon"
					:name="icon"
					class="icon"
				/>
				<div class="name">
					{{ icon }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OIcon,
	},
	data() {
		return {
			icons: OIcon.icons,
		};
	},
};
</script>

<style scoped>
/*
You do not have to write any CSS to use the o-icon component.
The CSS below is only to help in the presentation of the example above.
*/
.code {
	font-size: 18px;
}

.grid {
	display: flex;
	flex-wrap: wrap;
	font-weight: 400;
}

.row {
	margin-bottom: 16px;
	width: 200px;
}

.icon {
	display: inline-block;
	margin-right: 8px;
}

.name{
	display: inline-block;
}
</style>

```

## Changing Icon color
Change the icon color by adding a CSS class to the Icon component or a parent element and then
adding a CSS color prop to the class.

The icon uses the current CSS text color and applies that to itself with the `currentColor` value.


```vue
<template>
	<div class="icon-example">
		<o-icon
			name="check"
			class="green"
		/>

		<span class="red">
			<o-icon name="circle-x" />
		</span>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OIcon,
	},
};
</script>

<style scoped>
.green {
	color: green;
}

.red {
	color: #b00;

	&:hover {
		color: #f00;
	}
}
</style>
```

## Clickable Icons
You can add an `@click` or an `href` directly to your `<o-icon />` and it will become a clickable icon. Clickable icons will render as a `<button>`, `<a>` or `<router-link>` as needed and have hover and cursor styles.

Below we show an icon with a `@click`, a `disabled` icon, and an icon that opens an external link.

```vue
<template>
	<div class="flex">
		<div class="item">
			<o-icon
				name="circle-question-mark"
				@click="numClicks += 1"
			/>

			<o-icon
				name="circle-question-mark"
				disabled
				@click="numClicks += 1"
			/>

			<p>Icon clicked: {{ numClicks }} times.</p>
		</div>

		<div class="item">
			<o-icon
				name="google"
				href="http://www.google.com"
				target="_blank"
			/>
			<p>Icon links to a url in a new window.</p>
		</div>
	</div>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OIcon,
	},

	data() {
		return {
			numClicks: 0,
		};
	},
};
</script>

<style scoped>
.flex {
	display: flex;
}

.item + .item {
	margin-left: 40px;
}
</style>
```

## Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `name` | `String` | - | The name of the icon to show |
| `href` | `String` | - | The `href` prop accepts external URLs and the same values a [`router-link` `to` prop](https://router.vuejs.org/en/api/router-link.html) would. Will make the icon render as an `<a>` or `<router-link>` as needed. |
| `label` | `String` | - | If set, a label with the value. It also updates the `role` attribute from `presentation` to `img`. |


If your icon has an `@click`, then all [native button attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) will be accessible.

If your icon has an `href` and renders as an anchor, then [anchor tag attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) will work on your icon component.


## Events
| Attribute | Arguments | Triggers when... |
| --------- | --------- | ---------------- |
| `click` | Event obj | Propagates native event. |
