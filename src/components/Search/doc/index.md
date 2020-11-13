# Search

An input with a couple of special traits to aid with _search_ and _filter_ use cases: magnifying glass icon on the left, clear text button on the right, and a loading indicator.

## Example

```vue
<template>
	<div>
		<o-search
			v-model="query"
			:loading="loading"
			placeholder="Search"
			@search:update="onUpdate"
			@search:clear="onClear"
		/>

		<p>
			Search query: {{ query }}<br>
			Searching: {{ loading }}<br>
			Cleared: {{ numClears }} time(s)
		</p>
	</div>
</template>

<script>
import { OSearch } from '@square/orbit/components/Search';

export default {
	components: {
		OSearch,
	},
	data() {
		return {
			query: 'Sputnik',
			loading: false,
			numClears: 0,
		};
	},
	methods: {
		onClear() {
			this.numClears += 1;
		},
		onUpdate() {
			this.search();
		},
		search() {
			this.loading = true;

			const searchPromise = new Promise((resolve, reject) => {
				setTimeout(() => {
					if (this.searchPromise === searchPromise) {
						resolve();
					} else {
						reject();
					}
				}, 3000 * Math.random());
			}).then(() => {
				this.loading = false;
			}, () => {});

			this.searchPromise = searchPromise;
		},
	},
};
</script>
```

## API

### Attributes

The search component also supports [native attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `loading` | `Boolean` | `false` | Shows a loading indicator in the input. |
| `placeholder` | `String` | `false` | Adds a placeholder |

### Events

| Event | Arguments | Triggers when... |
| ----- | --------- | ---------------- |
| `search:clear` | Event obj | The clear icon is clicked. |
| `search:update` | Event obj | Propagates value of search. |
