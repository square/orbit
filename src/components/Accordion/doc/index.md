# Accordion
A vertically stacked list of headers that can be clicked to reveal or hide content associated with
them.

## Examples

```vue
<template>
	<o-accordion aria-label="Frequently Asked Questions Accordion">
		<o-accordion-item label="Color">
			Ut nisi ligula, fermentum nec posuere quis, imperdiet sed leo. Phasellus at nisi nulla.
			Fusce semper, magna et gravida luctus, lacus tortor luctus augue, eget fermentum ligula
			ex sit amet risus. Vestibulum molestie vehicula ligula.
		</o-accordion-item>
		<o-accordion-item label="Spacing">
			Donec sit amet pretium dolor, sit amet finibus nibh. Integer gravida nulla nunc, eu
			fermentum elit rhoncus in. Nam maximus libero.
		</o-accordion-item>
		<o-accordion-item label="Layout">
			Aliquam laoreet enim ut egestas viverra. In quis elit dapibus, vestibulum turpis in,
			luctus nunc. Phasellus ultrices elementum lacinia. Vestibulum ac porttitor purus.
			Curabitur eleifend, risus a viverra viverra, eros massa elementum quam, sit amet
			malesuada magna orci quis eros. Mauris maximus tincidunt eros sed luctus. Morbi porta
			viverra cursus. Vivamus porta pulvinar ultricies.
		</o-accordion-item>
	</o-accordion>
</template>

<script>
import { OAccordion, OAccordionItem } from '@square/orbit/components/Accordion';

export default {
	components: {
		OAccordion,
		OAccordionItem,
	},
};
</script>
```

### _Contained_ style

Adds a drop shadow around each Accordion Item and separates them with a small margin.

Always use this variant when putting Accordions on gray backgrounds. Also consider using this option
when the Accordion does not appear clickable in its context. For example, a single panel floating
by itself in a side bar might lack enough visual affordance to appear interactive.

```vue
<template>
	<div class="page">
		<o-accordion
			aria-label="Frequently Asked Questions Accordion"
			variant="contained"
		>
			<o-accordion-item label="Color">
				Ut nisi ligula, fermentum nec posuere quis, imperdiet sed leo. Phasellus at nisi nulla.
				Fusce semper, magna et gravida luctus, lacus tortor luctus augue, eget fermentum ligula
				ex sit amet risus. Vestibulum molestie vehicula ligula.
			</o-accordion-item>
			<o-accordion-item label="Spacing">
				Donec sit amet pretium dolor, sit amet finibus nibh. Integer gravida nulla nunc, eu
				fermentum elit rhoncus in. Nam maximus libero.
			</o-accordion-item>
			<o-accordion-item label="Layout">
				Aliquam laoreet enim ut egestas viverra. In quis elit dapibus, vestibulum turpis in,
				luctus nunc. Phasellus ultrices elementum lacinia. Vestibulum ac porttitor purus.
				Curabitur eleifend, risus a viverra viverra, eros massa elementum quam, sit amet
				malesuada magna orci quis eros. Mauris maximus tincidunt eros sed luctus. Morbi porta
				viverra cursus. Vivamus porta pulvinar ultricies.
			</o-accordion-item>
		</o-accordion>
	</div>
</template>

<script>
import { OAccordion, OAccordionItem } from '@square/orbit/components/Accordion';

export default {
	components: {
		OAccordion,
		OAccordionItem,
	},
};
</script>

<style scoped>
.page {
	padding: 36px;
	background-color: #F5F6F7;
}
</style>
```

### _Subtle_ style
Subtle accordions are used for collapsing and expanding content in a more inline and readable way.

```vue
<template>
	<o-accordion
		label="Subtle accordion for inline suggestions"
		aria-label="Subtle Accordion"
		variant="subtle"
	>
		This is a single panel subtle accordion.
	</o-accordion>
</template>

<script>
import { OAccordion, OAccordionItem } from '@square/orbit/components/Accordion';

export default {
	components: {
		OAccordion,
		OAccordionItem,
	},
};
</script>
```

### Special syntax for single panels

If you only have a single panel, you can use Accordion without any AccordionItems.

To default the single panel to closed, set the v-model on Accordion to a value of -1.


```vue
<template>
	<o-accordion
		label="Change Layout"
		aria-label="Change Layout Accordion"
	>
		This is a single panel accordion for changing a layout option.
	</o-accordion>
</template>

<script>
import { OAccordion } from '@square/orbit/components/Accordion';

export default {
	components: {
		OAccordion,
	},
};
</script>
```

### Programatically controlling open and close states

To control the state of the Accordion — for example, when setting one to open by default, or to keep track of which one is open —, pass in the index of the AccordionItem that should be opened by default.

```vue
<template>
	<o-accordion
		v-model="accordion"
		aria-label="Frequently Asked Questions Accordion"
	>
		<o-accordion-item label="What are some useful tips?">
			Lorem ipsum dolor sit amet, consectetur. Mauris vel urna elit.
		</o-accordion-item>
		<o-accordion-item label="Any fun tricks?">
			Lorem ipsum dolor sit amet, consectetur. Mauris vel urna elit.
		</o-accordion-item>
		<o-accordion-item label="How should I market to my users?">
			Lorem ipsum dolor sit amet, consectetur. Mauris vel urna elit.
		</o-accordion-item>
	</o-accordion>
</template>

<script>
import { OAccordion, OAccordionItem } from '@square/orbit/components/Accordion';

export default {
	components: {
		OAccordion,
		OAccordionItem,
	},

	data() {
		return {
			accordion: 1,
		};
	},
};
</script>
```

Passing in a state to a single-panel Accordion.

```vue
<template>
	<o-accordion
		v-model="accordion"
		label="Change Layout"
		aria-label="Change Layout Accordion"
	>
		This is a single panel accordion for changing a layout option.
	</o-accordion>
</template>

<script>
import { OAccordion } from '@square/orbit/components/Accordion';

export default {
	components: {
		OAccordion,
	},

	data() {
		return {
			accordion: 0,
		};
	},
};
</script>
```

## API

### Accordion Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `v-model` | `Number` | `0` | The index of which Accordion item is open. Use `-1` for none. |
| `variant` | `String`<br>`normal`, `contained`  | `normal` | Controls the style of the Accordion. `contained` wraps each item with a box shadow. |
| `label`† | `String`  | —  | Label for the Accordion. |
| `subtitle`† | `String`  | —  | Secondary label. Displays below the primary label in a muted color. |
| `aria-label` | `String`  | —  | Aria-label on outer wrapper to let users know they’re dealing with accordions. |

† `label` and `subtitle` attributes are only utilized when the Accordion is used as a single-panel w/o any AccordionItems. If you are creating a multi-panel Accordion, put `label` and `subtitle` on the the AccordionItems.

### AccordionItem Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `label` | `String`  | —  | Label for the AccordionItem |
| `subtitle` | `String`  | —  | Secondary label. Displays below the primary label in a muted color. |

### Accordion Events
| Name         | Arguments         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `accordion:update` | `Number`   | The index of the AccordionItem that should be opened. Only triggered if `open` was intially passed in.  |
