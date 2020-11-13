# Zero state
A Zero state component defines how a page or feature looks before a user has taken any actions, and provides context and next steps.

## Variants

### Normal (default)
Use the default zero state when it's meant as the primary content of the page.

```vue
<template>
	<o-zero-state title="Zero State Title">
		<img
			slot="media"
			:src="tagSvg"
		>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim metus,
		vestibulum ut tortor a, bibendum placerat mauris.
		<template slot="actions">
			<o-button variant="primary">
				Action
			</o-button>
		</template>
	</o-zero-state>
</template>

<script>
import { OZeroState } from '@square/orbit/components/ZeroState';
import { OButton } from '@square/orbit/components/Button';
import tagSvg from './tag.svg';

export default {
	components: {
		OZeroState,
		OButton,
	},
	data() {
		return {
			tagSvg,
		};
	},
};
</script>
```

### Secondary
Use the `secondary` zero state when your page has multiple separate features that each have their own actions.

```vue
<template>
	<o-zero-state
		title="Zero State Title"
		variant="secondary"
	>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim metus,
		vestibulum ut tortor a, bibendum placerat mauris.
		<template slot="actions">
			<o-button variant="secondary">
				Action
			</o-button>
		</template>
	</o-zero-state>
</template>

<script>
import { OZeroState } from '@square/orbit/components/ZeroState';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OZeroState,
		OButton,
	},
};
</script>
```

### No Actions
If your zero state has no actions in the `actions` slot, it will have an altered appearance that gives it a grey background.

```vue
<template>
	<o-zero-state title="Zero State Title">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim metus,
		vestibulum ut tortor a, bibendum placerat mauris.
	</o-zero-state>
</template>

<script>
import { OZeroState } from '@square/orbit/components/ZeroState';

export default {
	components: {
		OZeroState,
	},
};
</script>
```

## Footer
When desired, additional content can be placed into the `footer` slot, which will render at the bottom of the zero state below a divider.

```vue
<template>
	<o-zero-state title="Zero State Title">
		<img
			slot="media"
			:src="tagSvg"
		>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim metus,
		vestibulum ut tortor a, bibendum placerat mauris.
		<template slot="actions">
			<o-button variant="primary">
				Action
			</o-button>
		</template>
		<o-grid
			slot="footer"
			class="grid"
		>
			<o-grid-item
				v-for="(benefit, idx) in benefits"
				:key="idx"
				:span="6"
			>
				<div class="flex">
					<o-icon
						class="icon"
						name="check"
					/>
					<div :class="benefit">
						{{ benefit }}
					</div>
				</div>
			</o-grid-item>
		</o-grid>
	</o-zero-state>
</template>

<script>
import { OZeroState } from '@square/orbit/components/ZeroState';
import { OButton } from '@square/orbit/components/Button';
import { OGrid, OGridItem } from '@square/orbit/components/Grid';
import { OIcon } from '@square/orbit/components/Icon';
import tagSvg from './tag.svg';

export default {
	components: {
		OZeroState,
		OButton,
		OGrid,
		OGridItem,
		OIcon,
	},
	data() {
		return {
			tagSvg,
			benefits: [
				'53% of people are more likely to shop with a business that they can message directly.',
				'Any website visitor with a Messenger account can use the live chat.',
				'Managed conversations on the go through your Facebook Inbox.',
				'Carry on potential leads in real time by providing instant automated answers.',
			],
		};
	},
};
</script>

<style scoped>
.grid {
	max-width: 640px;
	margin: 0 auto;
}

.flex {
	display: flex;
}

.icon {
	flex: 0 0 auto;
	height: 100%;
	margin-top: 4px;
	margin-right: 8px;
	color: #3374ff;
}

.benefit {
	flex: 1;
}
</style>
```

## Attributes
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | `String` | - | The title of the zero state. Renders as a `title-3` OHeading for zero states with actions and as a `title-4` OHeading for zero states with no actions.
| `variant` | `String`<br>`normal`,`secondary` | `normal` | Changes the layout and padding of the zero state. |

## Slots
| slot | Description |
| ---- | ----------- |
| media | Use for your imagery. Appears centered at the top for `normal` zero states and to the left of the content for `secondary` zero states. |
| default | The default slot for the content. Appears between the title and `actions` slot. |
| actions | Use for the buttons in your zero state. The slot output will be determined by the zero state `variant`. Only accepts `OButton` components. |
| footer | Appears under a divider at the bottom of the component. |
