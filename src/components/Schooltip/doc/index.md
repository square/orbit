# Schooltip

Schooltips are used to highlight specific features on a page. These messages are intended to be transient, but designed to stand out and require interaction to confirm or dismiss.

## Examples
A parent with a mountable layer is required for this component to work properly. All the examples below assume that your application has a parent `OLayout` with layers enabled with the `has-layers` prop. See the [OLayout](/components/Layout) docs for more information.

### Basic usage

```vue
<template>
	<o-schooltip
		:active-tip="currentTip"
		:tip-id="0"
		placement="right"
		offset="0, 50"
	>
		<template slot="title">
			Here's a tip for your new feature
		</template>
		<template slot="message">
			Looks like you're showing the user a schooltip. Put some great
			content here to help them understand what this new feature can do.
		</template>
		<div
			slot="action"
			class="action-slot"
		>
			<a
				href="#"
				@click.prevent="toggleTip()"
			>
				No thanks, maybe later
			</a>
			<o-button
				size="small"
				@click="doSomething()"
			>
				Confirm
			</o-button>
		</div>
		<o-button @click="toggleTip()">
			Got it
		</o-button>
	</o-schooltip>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OSchooltip } from '@square/orbit/components/Schooltip';

export default {
	components: {
		OButton,
		OSchooltip,
	},

	data() {
		return {
			currentTip: 0,
		};
	},

	methods: {
		doSomething() {
			this.toggleTip();
		},
		toggleTip() {
			this.currentTip = (this.currentTip === 0) ? null : 0;
		},
	},
};
</script>

<style scoped>
a {
	color: white;
}

.action-slot {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
```

### Control the placement

Control where the schooltip opens relative to your target element.

By default, the Schooltip is positioned on the side of the target element that has the most open space. If for
stylistic or technical reasons, you need to avoid having the schooltip open on a certain side or force a certain
position, use this `placement` prop to override the default.


```vue
<template>
	<div class="examples">
		<div
			v-for="(placement, index) in placements"
			:key="placement"
			class="example"
		>
			<o-schooltip
				:active-tip="currentTip"
				:tip-id="index"
				:placement="placement"
			>
				<template slot="title">
					{{ placement }}
				</template>
				<div
					slot="action"
					class="action-slot"
				>
					<a
						href="#"
						@click.prevent="setTip(null)"
					>
						Dismiss
					</a>
					<o-button
						size="small"
						@click="setTip(index+1)"
					>
						Next
					</o-button>
				</div>
				<o-button @click="setTip(index)">
					{{ placement }}
				</o-button>
			</o-schooltip>
		</div>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OSchooltip } from '@square/orbit/components/Schooltip';

export default {
	components: {
		OButton,
		OSchooltip,
	},

	data() {
		return {
			currentTip: null,
			placements: OSchooltip.supportedPlacements,
		};
	},

	methods: {
		setTip(tipId) {
			if (tipId === null) {
				this.currentTip = null;
				return;
			}
			tipId %= this.placements.length;
			if (this.currentTip === tipId) {
				this.currentTip = null;
			} else {
				this.currentTip = tipId;
			}
		},
	},
};
</script>

<style scoped>
a {
	color: white;
}

.action-slot {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.examples {
	display: flex;
	flex-wrap: wrap;
	min-width: 510px;
	margin: 0 auto;
	width: 80%;
}

.example {
	min-width: calc(30% - 20px);
	flex: 1 0 auto;
	display: flex;
	justify-content: center;
	margin: 10px;
}
</style>
```

### Adjust the gap

Increase or decrease the gap between the schooltip and the target element.

Add an `offset` property  to your schooltip component.

```vue
<template>
	<div>
		<o-schooltip
			:active-tip="currentTip"
			:tip-id="1"
			placement="right"
			offset="0, 100"
		>
			<template slot="title">
				0px off main-axis, 100px off cross-axis
			</template>
			<div
				slot="action"
				class="action-slot"
			>
				<o-button
					size="small"
					@click="setTip(null)"
				>
					Dismiss
				</o-button>
			</div>
			<o-button @click="setTip(1)">
				open right with offset
			</o-button>
		</o-schooltip>
		<o-schooltip
			:active-tip="currentTip"
			:tip-id="2"
			placement="top"
			offset="0, 100"
		>
			<template slot="title">
				0px off main-axis, 100px off cross-axis
			</template>
			<div
				slot="action"
				class="action-slot"
			>
				<o-button
					size="small"
					@click="setTip(null)"
				>
					Dismiss
				</o-button>
			</div>
			<o-button @click="setTip(2)">
				open top with offset
			</o-button>
		</o-schooltip>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OSchooltip } from '@square/orbit/components/Schooltip';

export default {
	components: {
		OButton,
		OSchooltip,
	},

	data() {
		return {
			currentTip: null,
		};
	},

	methods: {
		setTip(tipId) {
			if (tipId === null) {
				this.currentTip = null;
				return;
			}
			if (this.currentTip === tipId) {
				this.currentTip = null;
			} else {
				this.currentTip = tipId;
			}
		},
	},
};
</script>

<style scoped>
a {
	color: white;
}

.action-slot {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.examples {
	display: flex;
	flex-wrap: wrap;
	min-width: 510px;
	margin: 0 auto;
	width: 80%;
}

.example {
	min-width: calc(30% - 20px);
	flex: 1 0 auto;
	display: flex;
	justify-content: center;
	margin: 10px;
}
</style>
```

### Sequential Schooltips

Display a set of schooltips that open in sequence, one after another.

Sequential schooltips are useful to guide customers through multiple features in one swoop.

We recommend abstracting your Sequence into a new file so that it can be leveraged across multiple files. The example below leverages `v-model` per usage for demonstration purposes, but ideally your sequence would leverage centralized state management via the Sequence function. There's some additional information below on how to use Sequential Schooltips with Vuex.

```vue
<template>
	<div>
		<your-sequence
			v-model="currentTip"
			tip="1"
		>
			<o-button @click="startSequence">
				Start Sequence
			</o-button>
		</your-sequence>

		<your-sequence
			v-model="currentTip"
			tip="2"
		>
			<template slot-scope="api">
				<o-button @click="currentTip == 2 && api.nextTip()">
					Some Action
				</o-button>
			</template>
		</your-sequence>

		<your-sequence
			v-model="currentTip"
			tip="3"
		>
			<o-button>Tip 3</o-button>
		</your-sequence>
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { Sequence } from '@square/orbit/components/Schooltip';
import Tip1 from 'doc/Tip1.vue';
import Tip2 from 'doc/Tip2.vue';
import Tip3 from 'doc/Tip3.vue';

const YourSequence = Sequence({
	name: 'YourSequence',
	tips: [
		Tip1,
		Tip2,
		Tip3,
	],
});

export default {
	components: {
		YourSequence,
		OButton,
	},

	data() {
		return {
			currentTip: null,
		};
	},

	methods: {
		startSequence() {
			this.currentTip = 1;
		},
	},
};
</script>
```

_Tip1.vue_
```vue
<template>
	<o-schooltip>
		<template slot="title">
			1 of 3
		</template>
		<template slot="message">
			Clicking <strong>Next</strong> will close this tip and open the next in the Sequence.
			<br><br>
			You may allow Merchants to <strong>Dismiss</strong> a sequence at any time.
		</template>
		<div
			slot="action"
			class="action-slot"
		>
			<a
				href="#"
				@click.prevent="$emit('close-sequence')"
			>
				Dismiss
			</a>
			<o-button
				size="small"
				@click="$emit('next-tip')"
			>
				Next
			</o-button>
		</div>

		<slot />
	</o-schooltip>
</template>

<script>
import { OSchooltip } from '@square/orbit/components/Schooltip';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSchooltip,
		OButton,
	},
};
</script>

<style scoped>
a {
	color: white;
}

.action-slot {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
```

_Tip2.vue_
```vue
<template>
	<o-schooltip>
		<template slot="title">
			2 of 3
		</template>
		<template slot="message">
			You can also provide control to the target of the Schooltip to control the guide.
			Click the target button to go to the next step.
		</template>
		<div
			slot="action"
			class="action-slot"
		>
			<a
				href="#"
				@click.prevent="$emit('close-sequence')"
			>
				Dismiss
			</a>
		</div>

		<slot />
	</o-schooltip>
</template>
<script>
import { OSchooltip } from '@square/orbit/components/Schooltip';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSchooltip,
		OButton,
	},
};
</script>

<style scoped>
a {
	color: white;
}

.action-slot {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
```

_Tip3.vue_
```vue
<template>
	<o-schooltip>
		<template slot="title">
			3 of 3
		</template>
		<template slot="message">
			That's it!
		</template>
		<o-button
			slot="action"
			size="small"
			@click="$emit('next-tip')"
		>
			Done
		</o-button>

		<slot />
	</o-schooltip>
</template>
<script>
import { OSchooltip } from '@square/orbit/components/Schooltip';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSchooltip,
		OButton,
	},
};
</script>
```

Vuex example of passing in a Sequence state:
```
import { Sequence } from '@square/orbit/components/Schooltip';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('productGuide');

export default Sequence({
	name: 'ProductGuide',
	tips: [
		// Tips
	],
	...mapState({ getTip: state => state.currentTip }),
	...mapActions(['setTip']),
});
```


## API

### Schooltip Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `active-tip` | `*` | - | The id of the Schooltip that should be shown. |
| `tip-id` | `*` | — | ID to be compared against `active-tip` to determine whether the given tip should be shown. |
| `placement` | `String` | `auto` | Placement of popover.<br><br>Supports: `auto`, `auto-start`, `auto-end`, `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end` |
| `offset` | `Number`, `String` | `0, 4` | Offset from placement.<br><br>Supports single number, or comma-delimited String of up to 2 numbers with optional units, where the supported units are `px` (default), `%` (percentage relative to length of target element), `%p` (percentage relative to length of popover element), `vw`, `vh`. |
| `overflow-element` | `String` | `viewport` | Which element should the schooltip be bounded within.<br><br>Supports: `scroll-parent`, `window`, `viewport` |

### Schooltip Slots
| Name   | Description |
| ------ | ------------ |
| `title` | Title of the Schooltip. |
| `message` | Message of the Schooltip. |
| `action` | Action of the Schooltip. Typically a Button. |

### Sequence Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `active-tip` (v-model) | `*` | - | The nth Schooltip that should be currently active. |
| `tip` | `*` | — | The nth Schooltip passed into the `tips` array that should be shown. |

### Sequence scoped-slot API methods
| Name   | Description |
| ------ | ------------ |
| `nextTip` | Go to the next tip. |
| `prevTip` | Go to the previous tip. |
| `closeSequence` | Close the Sequence. |

### Sequence API events
| Name   | Description |
| ------ | ------------ |
| `next-tip` | Go to the next tip. |
| `prev-tip` | Go to the previous tip. |
| `close-sequence` | Close the sequence. |
