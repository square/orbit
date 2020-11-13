# Nav
The Nav component has built-in compatibility with the [Vue Router](https://router.vuejs.org/en/) but falls back to using an anchor tag if Vue Router is not detected.

The active link styles are automatically applied to your links if you're using Vue Router, but you can do this manually as shown here with the `active` prop. Use this when your app doesn't use Vue Router.

```vue
<template>
	<o-nav>
		<o-nav-link to="/mercury">
			Mercury
		</o-nav-link>
		<o-nav-link to="/venus">
			Venus
		</o-nav-link>
		<o-nav-link
			to="/earth"
			active
		>
			Earth
		</o-nav-link>
		<o-nav-link to="/mars">
			Mars
		</o-nav-link>
		<o-nav-link to="/jupiter">
			Jupiter
		</o-nav-link>
	</o-nav>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>
```

## Variants

### Secondary Nav
The secondary nav is used when the navigation isn't primary. You can enable secondary mode by passing in `secondary`. Nav links have a `children` slot where you can nest links under a secondary nav link. If a nav link or it's children is active (the browser is on that page), it will automatically expand and highlight the active link.

Although the Nav component has built-in logic to detect if your browser is on the target link, you can override it by using the `active` boolean prop.
```vue
<template>
	<o-nav variant="secondary">
		<o-nav-link to="/mercury">
			Mercury
		</o-nav-link>
		<o-nav-link to="/venus">
			Venus
		</o-nav-link>
		<o-nav-link>
			Earth
			<template slot="children">
				<o-nav-link to="/moon">
					Moon
				</o-nav-link>
			</template>
		</o-nav-link>
		<o-nav-link>
			Mars
			<template slot="children">
				<o-nav-link
					to="/deimos"
					active
				>
					Deimos
				</o-nav-link>
				<o-nav-link to="/phobos">
					Phobos
				</o-nav-link>
			</template>
		</o-nav-link>
		<o-nav-link to="/jupiter">
			Jupiter
		</o-nav-link>
	</o-nav>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>
```

With indicators enabled
```vue
<template>
	<o-nav
		variant="secondary"
		has-indicator
	>
		<o-nav-link to="/mercury">
			Mercury
		</o-nav-link>
		<o-nav-link to="/venus">
			Venus
		</o-nav-link>
		<o-nav-link>
			Earth
			<template slot="children">
				<o-nav-link to="/moon">
					Moon
				</o-nav-link>
			</template>
		</o-nav-link>
		<o-nav-link>
			Mars
			<template slot="children">
				<o-nav-link
					to="/deimos"
					active
				>
					Deimos
				</o-nav-link>
				<o-nav-link to="/phobos">
					Phobos
				</o-nav-link>
			</template>
		</o-nav-link>
		<o-nav-link to="/jupiter">
			Jupiter
		</o-nav-link>
	</o-nav>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>
```

### Menu
Use `variant="menu"` when you want to display a list of actions in a [Popovers](/components/popover). The variant will add a border between items and make the entire row clickable.

```vue
<template>
	<o-nav variant="menu">
		<o-nav-link to="/mercury">
			Mercury
		</o-nav-link>
		<o-nav-link to="/venus">
			Venus
		</o-nav-link>
		<o-nav-link
			to="/earth"
			active
		>
			Earth
		</o-nav-link>
		<o-nav-link to="/mars">
			Mars
		</o-nav-link>
		<o-nav-link to="/jupiter">
			Jupiter
		</o-nav-link>
	</o-nav>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>
```

## Horizontal Nav
Primary horizontal nav
```vue
<template>
	<o-nav horizontal>
		<o-nav-link to="/mercury">
			Mercury
		</o-nav-link>
		<o-nav-link to="/venus">
			Venus
		</o-nav-link>
		<o-nav-link
			to="/earth"
			active
		>
			Earth
		</o-nav-link>
		<o-nav-link to="/mars">
			Mars
		</o-nav-link>
		<o-nav-link to="/jupiter">
			Jupiter
		</o-nav-link>
	</o-nav>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>
```

Secondary horizontal nav
```vue
<template>
	<o-nav
		variant="secondary"
		horizontal
	>
		<o-nav-link to="/mercury">
			Mercury
		</o-nav-link>
		<o-nav-link to="/venus">
			Venus
		</o-nav-link>
		<o-nav-link
			to="/earth"
			active
		>
			Earth
		</o-nav-link>
		<o-nav-link to="/mars">
			Mars
		</o-nav-link>
		<o-nav-link to="/jupiter">
			Jupiter
		</o-nav-link>
	</o-nav>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>
```

## Themes
Themes change the style of the links in a nav. By default, `NavLinks` are grey but can be made light or dark using the `theme` prop.

### Default Theme
```vue
<template>
	<div class="container">
		<o-nav horizontal>
			<o-nav-link to="/mercury">
				Mercury
			</o-nav-link>
			<o-nav-link to="/venus">
				Venus
			</o-nav-link>
			<o-nav-link
				to="/earth"
				active
			>
				Earth
			</o-nav-link>
			<o-nav-link to="/mars">
				Mars
			</o-nav-link>
			<o-nav-link to="/jupiter">
				Jupiter
			</o-nav-link>
		</o-nav>
	</div>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>

<style scoped>
.container {
	padding: 24px;
}
</style>
```

### Light Theme
```vue
<template>
	<div class="container">
		<o-nav
			theme="light"
			horizontal
		>
			<o-nav-link to="/mercury">
				Mercury
			</o-nav-link>
			<o-nav-link to="/venus">
				Venus
			</o-nav-link>
			<o-nav-link
				to="/earth"
				active
			>
				Earth
			</o-nav-link>
			<o-nav-link to="/mars">
				Mars
			</o-nav-link>
			<o-nav-link to="/jupiter">
				Jupiter
			</o-nav-link>
		</o-nav>
	</div>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>

<style scoped>
.container {
	padding: 24px;
	background: #3374ff;
}
</style>
```

### Dark Theme
```vue
<template>
	<div class="container">
		<o-nav
			theme="dark"
			horizontal
		>
			<o-nav-link to="/mercury">
				Mercury
			</o-nav-link>
			<o-nav-link to="/venus">
				Venus
			</o-nav-link>
			<o-nav-link
				to="/earth"
				active
			>
				Earth
			</o-nav-link>
			<o-nav-link to="/mars">
				Mars
			</o-nav-link>
			<o-nav-link to="/jupiter">
				Jupiter
			</o-nav-link>
		</o-nav>
	</div>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},
};
</script>

<style scoped>
.container {
	padding: 24px;
	background: #f5f6f7;
}
</style>
```

## Generating a nav from data
```vue
<template>
	<o-nav
		variant="secondary"
		has-indicator
	>
		<o-nav-link
			v-for="(link, idx1) in children"
			:key="idx1"
			:to="link.to"
			:active="link.active"
		>
			{{ link.title }}

			<template slot="children">
				<o-nav-link
					v-for="(childLink, idx2) in link.children"
					:key="idx2"
					:to="childLink.to"
					:active="childLink.active"
				>
					{{ childLink.title }}
				</o-nav-link>
			</template>
		</o-nav-link>
	</o-nav>
</template>

<script>
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		ONav,
		ONavLink,
	},

	data() {
		return {
			title: 'Solar system',
			children: [
				{
					title: 'Mercury',
					to: '/mercury',
				},
				{
					title: 'Venus',
					to: '/venus',
				},
				{
					title: 'Earth',
					to: '/earth',
				},
				{
					title: 'Mars',
					children: [
						{
							title: 'Deimos',
							to: '/deimos',
							active: true,
						},
						{
							title: 'Phobos',
							to: '/phobos',
						},
					],
				},
				{
					title: 'Jupiter',
					to: '/jupiter',
				},
			],
		};
	},
};
</script>
```

## Customization
Since the nav component is markup based, you can easily pass in things like icons and add classes to customize your nav links.

```vue
<template>
	<o-nav variant="secondary">
		<o-nav-link
			class="upgrade-link"
			to="/upgrade"
			target="_blank"
			@click="openUpgrade"
		>
			<o-icon name="bolt" /> Upgrade
		</o-nav-link>

		<o-nav-link to="/account">
			<o-icon name="person-plus" /> Astronaut
		</o-nav-link>
	</o-nav>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import { ONav, ONavLink } from '@square/orbit/components/Nav';

export default {
	components: {
		OIcon,
		ONav,
		ONavLink,
	},

	methods: {
		openUpgrade(e) {
			e.preventDefault();
		},
	},
};
</script>

<style scoped>

.upgrade-link, .upgrade-link:hover {
	color: #ff9f00;
}
</style>
```

## Nav Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `variant` | `String` <br> `primary`, `secondary`, `menu` | `primary` | Changes the style of the navigation. 'menu' will add borders between links and make the entire row clickable. |
| `theme` | `String` <br> `normal`, `light`, `dark` | `normal` | Changes the color of the links. |
| `horizontal`  | `Boolean` | `false` | Whether the Nav should be horizontal or not. |
| `hasIndicator`  | `Boolean` | `false` | Whether the Nav should show an indicator to reflect the active state of a nav-link. |

## NavLink Attributes
If your NavLink is an anchor, then you can also use [native anchor attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `to`*  | `String`, `Object` | — | The value to be passed into the `to` attribute of router-link or the `href` attribute of the anchor tag. |
| `active` | `Boolean` | - | Will give the link an active appearance. This will be handled automatically if you're using [Vue Router](https://router.vuejs.org/en/). |

## NavLink Slots
| Name | Description |
| ---- | ----------- |
| `children` | Allows you to nest links under a `secondary` nav link. Will not render for primary nav's or the "menu" variant. |
