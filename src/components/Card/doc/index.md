# Card
Cards are a container that show a few pieces of related information. Cards should drive Merchants to interact with them as a link or action to get more details.

If you want a bordered, non-clickable content area, use [bordered sections](/components/section) instead.

## Simple Card
Cards typically consist of at least a title and some content summary.  If there is no media in the card we recommend adding an additional call to action as shown below.

Cards support click events or setting a `:to` prop to go to a specific URL.

```vue
<template>
	<o-card
		class="my-card"
		@click="handleClick"
	>
		<o-card-header title="My Card" />
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d
		eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ve
		iam, quis nostrud exercitation ullamco.

		<o-button
			slot="actions"
			variant="muted-primary"
			@click.stop="handleClick"
		>
			Muted Primary
		</o-button>
	</o-card>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OCard, OCardHeader } from '@square/orbit/components/Card';

export default {
	components: {
		OButton,
		OCard,
		OCardHeader,
	},

	methods: {
		handleClick() {
			// perform action here
			// notice the stop event on the button to prevent this method being called twice
		},
	},
};
</script>

<style scoped>
.my-card {
	max-width: 420px;
}
</style>
```

## Full height
The `full-height` prop makes cards fill the height of their containers.

Use this when you are placing cards in grids and want them all to be the same height.

### Basic Demo
```vue
<template>
	<o-grid>
		<o-grid-item>
			<o-card
				full-height
				@click="handleClick"
			>
				<o-card-header title="Lorem ipsum dolor sit amet" />
				Integer risus elit, accumsan non rutrum sit amet, elementum in elit.
				Vivamus sit amet magna gravida, dapibus metus ac, suscipit lacus.
				Fusce eleifend id tellus in aliquet. Etiam id odio a lectus sollicitudin.
			</o-card>
		</o-grid-item>
		<o-grid-item>
			<o-card
				full-height
				@click="handleClick"
			>
				<o-card-header title="Nulla nec nibh" />
				Nullam in egestas neque. Nam non dui vitae purus ullamcorper feugiat et et enim.
				Vestibulum est quam, mattis at felis et, tincidunt commodo mi.
				Curabitur tempor, justo ac egestas feugiat, tortor nulla finibus sem,
				in porta lacus erat vel magna. Nullam malesuada lectus risus.
			</o-card>
		</o-grid-item>
		<o-grid-item>
			<o-card
				full-height
				@click="handleClick"
			>
				<o-card-header title="Donec bibendum" />
				Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
				Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus.
			</o-card>
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';
import { OCard, OCardHeader } from '@square/orbit/components/Card';

export default {
	components: {
		OGrid,
		OGridItem,
		OCard,
		OCardHeader,
	},

	methods: {
		handleClick() {
			// perform action here
		},
	},
};
</script>
```

## Card Media
Card Media can really help draw attention to your content. We recommend adding images to your card with the `o-card-media` component. If leveraging SVG icons, coloring them blue help communicate to Merchants these cards are actionable.

### Basic Demo
```vue
<template>
	<o-grid class="my-grid">
		<o-grid-item>
			<o-card
				full-height
				@click="handleClick"
			>
				<o-card-media
					:src="envelopeUri"
					class="envelope"
				/>
				<o-card-header title="Collect Emails" />
				I'd like to collect email addresses for my mailing list.
			</o-card>
		</o-grid-item>
		<o-grid-item>
			<o-card
				full-height
				@click="handleClick"
			>
				<o-card-media
					:src="tagUri"
					class="tag"
				/>
				<o-card-header title="Offer a Coupon" />
				I'd like to offer a store coupon to capture emails.
			</o-card>
		</o-grid-item>
		<o-grid-item>
			<o-card
				full-height
				@click="handleClick"
			>
				<o-card-media
					:src="megaphoneUri"
					class="megaphone"
				/>
				<o-card-header title="Make an Announcement" />
				I'd like to announce a special deal.
			</o-card>
		</o-grid-item>
	</o-grid>
</template>

<script>
import { OGrid, OGridItem } from '@square/orbit/components/Grid';
import { OCard, OCardHeader, OCardMedia } from '@square/orbit/components/Card';

import envelopeUri from './envelope.svg';
import megaphoneUri from './megaphone.svg';
import tagUri from './tag.svg';

export default {
	components: {
		OGrid,
		OGridItem,
		OCard,
		OCardHeader,
		OCardMedia,
	},

	data() {
		return {
			envelopeUri,
			megaphoneUri,
			tagUri,
		};
	},

	methods: {
		handleClick() {
			// perform action here
		},
	},
};
</script>

<style scoped>
.my-grid {
	max-width: 680px;
}

.envelope {
	margin: 8px 0 32px 0;
}

.megaphone {
	margin: 7px 0 31px 0;
}
</style>
```

### Cover Media
The `cover` prop makes the image stretch to the edges of the card. The height of the media is determined by the source img.

If your images are of varying heights and you want them to all be the same size, set a height on your card media in `px` with CSS.

```vue
<template>
	<o-card
		class="my-card"
		@click="handleClick"
	>
		<o-card-media
			src="https://weeblyblog.ghost.io/content/images/2018/10/4-lessions-from-real-entrepreneurs.jpg"
			cover
		/>
		<o-card-header title="4 Lessons from a Seasoned Entrepreneur" />
		One of the advantages of being an entrepreneur in the internet age
		is that the web is full of resources that can help you learn as you go,
		including advice from other business owners just like you.
	</o-card>
</template>

<script>
import { OCard, OCardHeader, OCardMedia } from '@square/orbit/components/Card';

export default {
	components: {
		OCard,
		OCardHeader,
		OCardMedia,
	},

	methods: {
		handleClick() {
			// perform action here
		},
	},
};
</script>

<style scoped>
.my-card {
	max-width: 420px;
}
</style>
```

## Loading Cards
Loading states on cards should be created with [Skeleton loaders](/components/skeleton). In this example, we add the `loading` prop to CardMedia and assemble some [SkeletonText](/components/skeleton) elements for the card's content. Because our CardMedia has the `loading` prop added, it will fire a `load` event when the media has loaded. We can use this event to toggle our template to switch from skeleton loaders to the real content.

```vue
<template>
	<div>
		<o-card
			class="my-card"
			@click="handleClick"
		>
			<o-card-media
				:loading="isLoading"
				src="https://weeblyblog.ghost.io/content/images/2019/02/header-blog.png"
				cover
				@load="isLoading = false"
			/>
			<template v-if="isLoading">
				<o-skeleton-text variant="title" />
				<o-skeleton-text :lines="5" />
			</template>
			<template v-else>
				<o-card-header title="7 Rules For Writing Great Product Descriptions" />
				A picture may be worth a thousand words, but that doesn’t mean you should
				overlook writing your product descriptions. While you don’t need to write
				a novel, your product description should pique a buyer’s interest and share
				details that a photo just can’t convey. Here are seven rules to help you get
				product descriptions right.
			</template>
		</o-card>
		<br>
		<o-button @click="isLoading = !isLoading">
			Toggle Loading
		</o-button>
	</div>
</template>

<script>
import { OCard, OCardHeader, OCardMedia } from '@square/orbit/components/Card';
import { OSkeletonText, OSkeletonMedia } from '@square/orbit/components/Skeleton';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OCard,
		OCardHeader,
		OCardMedia,
		OSkeletonText,
		OSkeletonMedia,
		OButton,
	},

	data() {
		return {
			isLoading: true,
		};
	},

	methods: {
		handleClick() {
			// perform action here
		},
	},
};
</script>

<style scoped>
.my-card {
	max-width: 420px;
}
</style>
```

## Disabled Cards

Disable clicks on the card. The card drop shadow will be removed and the text lightened to signify
the disabled state.

We recommend providing a Hovertip with more information on why the Card is disabled. Put the Hovertip
on a wrapping element. This is because pointer events, including hover, will not be fired on disabled
cards.

```vue
<template>
	<div
		v-hovertip="`A reason on why the card is disabled is helpful here`"
		class="card-wrapper"
	>
		<o-card
			disabled
			@click="handleClick"
		>
			<o-card-header title="Disabled Card" />
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ve
			iam, quis nostrud exercitation ullamco.
		</o-card>
	</div>
</template>

<script>
import { OCard, OCardHeader } from '@square/orbit/components/Card';
import { OHovertip } from '@square/orbit/components/Hovertip';

export default {
	components: {
		OCard,
		OCardHeader,
	},

	directives: {
		Hovertip: OHovertip,
	},

	methods: {
		handleClick() {
			// perform action here
		},
	},
};
</script>

<style scoped>
.card-wrapper {
	max-width: 420px;
}
</style>
```


## API

### Card Attributes
| Name | Type | Default | Description |
| ---- | ---- |-------- |------------ |
| `disabled` | `Boolean` | `false` | Disables click events and styles the card to look disabled. |
| `full-height` | `Boolean` | `false` | Makes the card 100% height. |
| `theme` | `String`<br> `default`, `primary` | `'default'` | Default theme for cards have a white background, gray box shadow. Primary theme has a blue gradient background. |
| `title` | `String` | - | Adds a title to the card using the heading component. |
| `titleIcon` | `String` | - | Adds an icon in front of the `title`. This should either be the name of an `o-icon` or the src an `<img />` thats 32x32. Requires the `title` prop to be set. |
| `to` | `String`, `Object` | - | The value to be passed into the `to` attribute of router-link or the `href` attribute of the anchor tag. If your Card is an anchor, then you can also use [native anchor attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) such as `target="_blank"`. |

### Card Slots
| Name | Description |
| ---- | ----------- |
| `default` | This is where default slot content will live. |
| `actions` | Buttons positioned in the bottom of the card |

### Card Media Attributes
| Name | Type | Default | Description |
| ---- | ---- |-------- |------------ |
| `src` | `String` | - | The media to be used. Supports image types. |
| `alt` | `String` | - | Alt text for your media. |
| `cover` | `Boolean` | `false` | Makes the media stretch to the edges. |
| `loading` | `Boolean` | `false` | If true, the CardMedia will render a [Skeleton loader](/components/skeleton) and fire a `load` event when the media is loaded. |

### Card Media Events
| Name | Arguments | Triggers when... |
| ---- | --------- | ---------------- |
| `load` | - | The `loading` prop is applied and the media has finished loading. |

## Card Header Attributes
| Name | Type | Default | Description |
| ---- | ---- |-------- |------------ |
| `title` | `String` | - | Adds a title to the card using the heading component. |
| `title-icon` | `String` | - | Adds an icon in front of the `title`. This should either be the name of an `o-icon` or the src an `<img />` thats 32x32. |
