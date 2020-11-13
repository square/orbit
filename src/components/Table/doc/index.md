# Table
The Table component displays a collection of data.

The data collection can be passed into the component through the `row-data` attribute, where every object-model in the collection represents a row in the table. Columns of the table are declared using the TableCol sub-component, using the slot to pass in the column label, and the `property` attribute to reference which attribute of the model to embed into the column.

```vue
<template>
	<o-table :row-data="tableData">
		<o-table-col property="name">
			Planet
		</o-table-col>
		<o-table-col property="type">
			Type
		</o-table-col>
		<o-table-col
			property="diameter"
			align="right"
		>
			Diameter ratio to Earth
		</o-table-col>
		<o-table-col
			property="mass"
			align="right"
		>
			Mass ratio to Earth
		</o-table-col>
	</o-table>
</template>

<script>
import { OTable, OTableCol } from '@square/orbit/components/Table';

export default {

	components: {
		OTable,
		OTableCol,
	},

	data() {
		return {
			tableData: [
				{
					name: 'Mercury',
					type: 'Terrestrial Planet',
					diameter: 0.382,
					mass: 0.06,
					rings: 0,
				},
				{
					name: 'Venus',
					type: 'Terrestrial Planet',
					diameter: 0.949,
					mass: 0.82,
					rings: 0,
				},
				{
					name: 'Earth',
					type: 'Terrestrial Planet',
					diameter: 1.000,
					mass: 1.00,
					rings: 0,
				},
			],
		};
	},
};
</script>
```


## Hide the Table Header

Reduce visual complexity by hiding the table header. Do this only when the data is clear to understand w/o table headings and no sorting is required.


### Example 1 - Label and Text Action
Use `@click.stop` if you want to prevent `rowClick` events when your action is clicked.

```vue
<template>
	<o-table
		:row-data="planets"
		no-header
	>
		<o-table-col property="name" />
		<o-table-col align="right">
			<template
				slot="formatter"
			>
				<o-button
					variant="text"
					@click.stop="handleClick"
				>
					Edit
				</o-button>
			</template>
		</o-table-col>
	</o-table>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OTable, OTableCol } from '@square/orbit/components/Table';

export default {
	components: {
		OButton,
		OTable,
		OTableCol,
	},

	data() {
		return {
			planets: [
				{
					name: 'Mercury',
				},
				{
					name: 'Venus',
				},
				{
					name: 'Earth',
				},
			],
		};
	},

	methods: {
		handleClick() {
			// do something
		},
	},
};
</script>
```


### Example 2 - Thumbnail, Label, and Icon Action
Use `@click.stop` if you want to prevent `rowClick` events when your action is clicked.

```vue
<template>
	<o-table
		:row-data="planets"
		no-header
	>
		<o-table-col>
			<template
				slot="formatter"
				slot-scope="props"
			>
				<div class="thumbnail-with-label">
					<div class="thumbnail" />
					<div>
						<div class="planet-name">
							{{ props.data.name }}
						</div>
						<div class="planet-moons">
							{{ props.data.moons }} Moons
						</div>
					</div>
				</div>
			</template>
		</o-table-col>
		<o-table-col align="right">
			<template
				slot="formatter"
			>
				<o-icon
					name="circle-x"
					@click.stop="destroyPlanet"
				/>
			</template>
		</o-table-col>
	</o-table>
</template>

<script>
import { OIcon } from '@square/orbit/components/Icon';
import { OTable, OTableCol } from '@square/orbit/components/Table';

export default {
	components: {
		OIcon,
		OTable,
		OTableCol,
	},
	data() {
		return {
			planets: [
				{
					name: 'Mars',
					moons: 0,
				},
				{
					name: 'Venus',
					moons: 0,
				},
				{
					name: 'Jupiter',
					moons: 69,
				},
				{
					name: 'Saturn',
					moons: 62,
				},

			],
		};
	},
	methods: {
		destroyPlanet() {
			// Your code here.
		},
	},
};
</script>

<style scoped>
.thumbnail-with-label {
	display: flex;
	align-items: center;
}

.thumbnail {
	width: 40px;
	height: 40px;
	margin-right: 16px;
	background: #e9f1f7;
	border: 1px solid #ccced0;
	border-radius: 2px;
}

.planet-name {
	font-weight: 500;
	margin-right: 8px;
}

.planet-moons {
	color: #9bafc5;
}
</style>
```


## Cell Formatters
Formatting cell content is done by passing in a content-template to the `formatter` slot along with the column label. The content of the column is provided through `props.content`, the entire model can be accessed through `props.data`, and the row index can be accessed through `props.index`.

Use `@click.stop` if you want to prevent `rowClick` events when your action is clicked.

```vue
<template>
	<div>
		<p>User clicked to edit the planet: {{ rowToEdit }}</p>
		<o-table :row-data="tableData">
			<o-table-col property="name">
				Planet
				<template
					slot="formatter"
					slot-scope="props"
				>
					{{ props.content }}<br>
					({{ props.data.type }})
				</template>
			</o-table-col>
			<o-table-col
				property="diameter"
				align="right"
			>
				Diameter
				<template
					slot="formatter"
					slot-scope="props"
				>
					{{ formatNumber(earthDiameter * props.content) }} km
				</template>
			</o-table-col>
			<o-table-col
				property="mass"
				align="right"
			>
				Mass
				<template
					slot="formatter"
					slot-scope="props"
				>
					{{ formatNumber(earthMass * props.content) }} × 10<sup>24</sup> kg
				</template>
			</o-table-col>
			<o-table-col
				width="10%"
				align="right"
			>
				<template
					slot="formatter"
					slot-scope="props"
				>
					<o-button
						variant="muted"
						@click.stop="editRow(props.data)"
					>
						Edit
					</o-button>
				</template>
			</o-table-col>
		</o-table>
	</div>
</template>

<script>
import { OTable, OTableCol } from '@square/orbit/components/Table';
import { OButton } from '@square/orbit/components/Button';

export default {

	components: {
		OTable,
		OTableCol,
		OButton,
	},

	data() {
		return {
			earthDiameter: 12742,
			earthMass: 5.972,
			rowToEdit: undefined,
			tableData: [
				{
					name: 'Mercury',
					type: 'Terrestrial Planet',
					diameter: 0.382,
					mass: 0.06,
					rings: 0,
				},
				{
					name: 'Venus',
					type: 'Terrestrial Planet',
					diameter: 0.949,
					mass: 0.82,
					rings: 0,
				},
				{
					name: 'Earth',
					type: 'Terrestrial Planet',
					diameter: 1.000,
					mass: 1.00,
					rings: 0,
				},
			],
		};
	},

	methods: {
		formatNumber: (n) => n.toLocaleString('en-US'),
		editRow(row) {
			this.rowToEdit = row.name;
		},
	},
};
</script>
```

## Clickable rows
Clickable rows are used when you need to view the details of the item. This is different from checkable cells and cells with meatballs.

The Table rows can be made clickable by adding a `rowClick` event handler on the Table component.

```vue
<template>
	<div>
		<p>Planet clicked: {{ planetClicked }}</p>
		<o-table
			:row-data="tableData"
			@rowClick="rowClicked"
		>
			<o-table-col property="name">
				Planet
			</o-table-col>
			<o-table-col property="type">
				Type
			</o-table-col>
			<o-table-col
				property="diameter"
				align="right"
			>
				Diameter ratio to Earth
			</o-table-col>
			<o-table-col
				property="mass"
				align="right"
			>
				Mass ratio to Earth
			</o-table-col>
		</o-table>
	</div>
</template>

<script>
import { OTable, OTableCol } from '@square/orbit/components/Table';

export default {

	components: {
		OTable,
		OTableCol,
	},

	data() {
		return {
			planetClicked: undefined,
			tableData: [
				{
					name: 'Mercury',
					type: 'Terrestrial Planet',
					diameter: 0.382,
					mass: 0.06,
					rings: 0,
				},
				{
					name: 'Venus',
					type: 'Terrestrial Planet',
					diameter: 0.949,
					mass: 0.82,
					rings: 0,
				},
				{
					name: 'Earth',
					type: 'Terrestrial Planet',
					diameter: 1.000,
					mass: 1.00,
					rings: 0,
				},
			],
		};
	},

	methods: {
		rowClicked(planet) {
			this.planetClicked = planet.name;
		},
	},
};
</script>
```

## Sortable columns
Use the `sortable` attribute to make a column sortable. The Table component will not handle the sorting to remain agnostic of the collection API and will leave it to the data-layer to mutate the collection. The `sort` event can be listened to and handled on the Table component.

To assist in the discoverability of sorting functionality for a table it is recommended that you sort one column by default. To do this, you will need to sort the data in your data layer and pass the order (`asc` or `desc`) into the `sortable` prop, as shown here.

```vue
<template>
	<o-table
		:row-data="tableData"
		@sort="sortByKey"
	>
		<o-table-col
			property="name"
			sortable="asc"
		>
			Planet
		</o-table-col>
		<o-table-col property="type">
			Type
		</o-table-col>
		<o-table-col
			property="diameter"
			align="right"
			sortable
		>
			Diameter ratio to Earth
		</o-table-col>
		<o-table-col
			property="mass"
			align="right"
			sortable
		>
			Mass ratio to Earth
		</o-table-col>
	</o-table>
</template>

<script>
import { OTable, OTableCol } from '@square/orbit/components/Table';

export default {

	components: {
		OTable,
		OTableCol,
	},

	data() {
		return {
			tableData: [
				{
					name: 'Earth',
					type: 'Terrestrial Planet',
					diameter: 1.000,
					mass: 1.00,
					rings: 0,
				},
				{
					name: 'Mercury',
					type: 'Terrestrial Planet',
					diameter: 0.382,
					mass: 0.06,
					rings: 0,
				},
				{
					name: 'Venus',
					type: 'Terrestrial Planet',
					diameter: 0.949,
					mass: 0.82,
					rings: 0,
				},
			],
		};
	},

	methods: {

		sortByKey(key, order) {
			const x2y = (order === 'asc') ? -1 : 1;

			this.tableData.sort(({ [key]: x }, { [key]: y }) => {
				if (x < y) { return x2y; }
				if (x > y) { return -x2y; }
				return 0;
			});
		},
	},
};
</script>
```


## Checkable rows
The Table can be made checkable by passing in another collection into the `checked` attribute of the Table component. This checkable collection can contain object references to models in the `row-data` collection to indicate that they are already checked. **Note, the references must be identical `===` to those in `row-data` as object-references are the only unique identifier known to the Table component.** When a row is checked, it will be added to this collection and removed when unchecked.

```vue
<template>
	<div>
		<p>Rows Checked: {{ checked }}</p>

		<o-table
			:row-data="tableData"
			:checked="checked"
			@row:checked="onCheckedRow"
			@row:unchecked="onUncheckedRow"
		>
			<o-table-col property="name">
				Planet
			</o-table-col>
			<o-table-col property="type">
				Type
			</o-table-col>
			<o-table-col
				property="diameter"
				align="right"
			>
				Diameter ratio to Earth
			</o-table-col>
			<o-table-col
				property="mass"
				align="right"
			>
				Mass ratio to Earth
			</o-table-col>
		</o-table>
	</div>
</template>

<script>
import { OTable, OTableCol } from '@square/orbit/components/Table';

export default {

	components: {
		OTable,
		OTableCol,
	},

	data() {
		return {
			tableData: [
				{
					name: 'Mercury',
					type: 'Terrestrial Planet',
					diameter: 0.382,
					mass: 0.06,
					rings: 0,
				},
				{
					name: 'Venus',
					type: 'Terrestrial Planet',
					diameter: 0.949,
					mass: 0.82,
					rings: 0,
				},
				{
					name: 'Earth',
					type: 'Terrestrial Planet',
					diameter: 1.000,
					mass: 1.00,
					rings: 0,
				},
			],
			checked: [],
		};
	},

	watch: {
		checked() {
			// Listen for changes
		},
	},

	methods: {
		onCheckedRow(checkedRowData) { // eslint-disable-line no-unused-vars
			// Handle checked row
		},

		onUncheckedRow(uncheckedRowData) { // eslint-disable-line no-unused-vars
			// Handle unchecked row
		},
	},
};
</script>
```

## Paginating, Filtering, Empty States, and Bulk Actions

**Pagination.** To enable pagination on the table, pass in the total number of rows, the number of rows per page, and what page it's currently on. You can override the rows per page options with an array of numbers and turn it off by passing in `false`. The example below contains an arbitrary data-layer to exemplify how they can communicate with each other.

**Adding Filters.** To add filters to your table (such as a drop-down filter or search) you can add the component and tie it together with the Table via the data-layer. The data-layer in this example is made-up to show how it can bridge the Search component with the Table.

**Adding an Empty State.** If the user applies filters such that zero results are returned, you can display a custom message by adding an `empty` slot. ex. `<template slot="empty">No items found. Try adjusting your filters.</template>`.

If there are zero items to display in the table before any filters have been
applied, don't utilize this slot to communicate that message, instead hide the Table component entirely and add your explanation and guidance around the goals of that screen outside of the Table component.

**Adding Bulk Actions** You can use the Section and SectionHeader component to easily format any actions associated with checking rows in the table. Actions should only appear when rows are checked and should replace any search or filters above the table. Provide an 'X' button to facilitate cancelling the bulk selection, and display the number of rows checked beside the X.

```vue
<template>
	<o-section>
		<o-section-header
			:class="{ 'unstuck': !hasSelected }"
			:sticky="hasSelected"
		>
			<template v-if="!hasSelected">
				<o-search
					v-model="rockets.searchQuery"
					:loading="!!(rockets.searchQuery && rockets.isLoading)"
					class="search"
				/>
			</template>
			<template v-else>
				<o-button
					variant="muted"
					@click="clearSelection"
				>
					<o-icon name="x" />
				</o-button>
				<span class="rows-selected">
					{{ checkedRows.length }} selected
				</span>
			</template>

			<template
				v-if="hasSelected"
				slot="actions"
			>
				<o-button>Copy</o-button>
				<o-button variant="destructive-secondary">
					Delete
				</o-button>
			</template>
		</o-section-header>

		<o-table
			:row-data="rockets.data"
			:total-rows="rockets.total"
			:rows-per-page.sync="rockets.perPage"
			:current-page.sync="rockets.onPage"
			:loading="rockets.isLoading"
			:checked="checkedRows"
			@rowClick="rowClicked"
		>
			<o-table-col
				width="90px"
				property="thumbnail"
			>
				<template
					slot="formatter"
					slot-scope="{ content }"
				>
					<img
						v-if="content.match('http')"
						:src="content"
						width="50px"
					>
				</template>
			</o-table-col>
			<o-table-col property="title">
				Title
			</o-table-col>
			<template slot="empty">
				No photos found for "<span class="query">{{ rockets.searchQuery }}"</span>
			</template>
		</o-table>
	</o-section>
</template>

<script>
import { OSearch } from '@square/orbit/components/Search';
import { OSection, OSectionHeader } from '@square/orbit/components/Section';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';
import { OTable, OTableCol } from '@square/orbit/components/Table';
import axios from 'axios';

// Arbitrary data layer
class Rockets {
	constructor() {
		this._perPage = 10;
		this._onPage = 1;
		this.total = 0;
		this.serverTotal = 50;
		this.data = [];
		this.isLoading = false;

		this.fetch();
	}

	get onPage() {
		return this._onPage;
	}

	set onPage(newPage) {
		this._onPage = newPage;
		this.fetch();
	}

	get perPage() {
		return this._perPage;
	}

	set perPage(newPerPage) {
		this._perPage = newPerPage;
		this.fetch();
	}

	get searchQuery() {
		return this._searchQuery;
	}

	set searchQuery(query) {
		this.onPage = 1;
		this._searchQuery = query;
		this.fetch();
	}

	fetch() {
		clearTimeout(this.debounce);
		this.debounce = setTimeout(() => this._fetch(), 500);
	}

	_fetch() {
		let url = 'https://www.reddit.com/r/spaceporn/new.json';
		const params = { limit: this.serverTotal };

		if (this.searchQuery) {
			url = 'https://www.reddit.com/r/spaceporn/search.json';
			Object.assign(params, {
				restrict_sr: true,
				q: this.searchQuery,
			});
		}

		this.isLoading = true;
		axios(url, { params }).then(({ data: { data } }) => {
			this.isLoading = false;

			const len = data.children.length;
			this.total = len < this.serverTotal ? len : this.serverTotal;

			const posts = data.children
				.splice(this.perPage * (this.onPage - 1), this.perPage)
				.map((post) => post.data);

			this.data.splice(0, this.data.length, ...posts);
		});
	}
}

export default {

	components: {
		OSection,
		OSectionHeader,
		OTable,
		OTableCol,
		OSearch,
		OButton,
		OIcon,
	},

	data() {
		return {
			rockets: new Rockets(),
			checkedRows: [],
		};
	},

	methods: {
		rowClicked(row) {
			window.open(row.url);
		},
		clearSelection() {
			this.checkedRows = [];
		},
	},

	computed: {
		hasSelected() {
			return this.checkedRows.length > 0;
		},
	},
};
</script>

<style scoped>
.rows-selected {
	margin-left: 16px; /* var(--space-x2); */
	color: #70767c; /* var(--color-gray-50) */
}

.search {
	max-width: 400px;
}

.query,
.rows-selected {
	font-weight: 500; /* var(--font-weight-medium) */
}

.unstuck {
	padding-top: 16px; /* var(--space-x2); */
}
</style>
```


## Table Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `row-data`   | `Array<Object>` | - | Array of objects that will be inserted into the table's rows. |
| `checked` | `Array` | - | A collection of models that matches checked rows passed in the `row-data`. |
| `no-header` | `Boolean` | `false` | Hides the column headers. Use when you want that simple _list_ look. |
| `rows-per-page-options` | `Array`, `Boolean` | `[10, 25, 50]` | Array of numbers to show as options for how many items to show per page. `false` to disable per-page configuration. Resets current page to the first page anytime an option is selected. |
| `rows-per-page` | `Number` | - | How many rows to show per page. |
| `total-rows` | `Number` | - | Total number of rows for table pagination. |
| `current-page` | `Number` | - | The number representing the current page. |
| `loading` | `Boolean` | `false` | When set to true, the table will appear as if it's loading and disable it's pagination controls. |

## Table Slots
| Name          | Description   |
| ------------- | ------------- |
| `empty` | Shown when the `row-data` array is empty and `loading` is false. |


## TableCol Attributes
| Name   | Type | Default | Description |
| ------ |----- | ------- |------------ |
| `property` | `String` | - | The key inside the row data object that the column will represent. |
| `align` | `String`<br/>`left`, `right`, `center` | `left` | Determines text alignment of the td cells within the column. |
| `sortable` |  `Boolean`, `String`<br/>  `true`, `asc`, `desc` | - | Whether or not you can sort the items of the table in relation to this column. |

## TableCol Slots
| Name          | Description   |
| ------------- | ------------- |
| `formatter` | Use a content-template with the `formatter` slot to format cell content.<br><br>Use the `slot-scope` attribute (ex. `slot-scope="props"`) to access the column content (`props.content`), entire row model (`props.data`), and the row index (`props.index`). |


## Table Events
| Name         | Parameters         | Triggers when...   |
| ------------ | ----------------- | ------------- |
| `rowClick` | `(row: Object)` | Table row is clicked
| `row:checked` | `(row: Object)` | Checkable table row is checked
| `row:unchecked` | `(row: Object)` | Checkable row is unchecked
| `update:currentPage` | `(currentPage: Number)` | Current page is updated with any of the pagination controls
| `update:rowsPerPage` | `(rowsPerPage: Number)` | Number of rows per page is updated with the button group
| `sort` | `(columnProperty: String, sortOrder: Order)`<br>`Order` possible values: `'asc'`, `'desc'` | A sortable column is clicked
