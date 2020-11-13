# Autocomplete
The autocomplete component provides contextual suggestions underneath an input based on the input provided. It is used when we are able to help the user quickly complete the field.

The **`value`(v-model)** property expects an **object or array of objects**, formatted like:

| Single Select | Multi-Select |
| ---- | ------- |
| `{value: '', }` | `[{ value: '' }, ...]` |

 By default, it reads from the from a `value` property on the object. If you would like to change the property evaluated on the `value`(v-model) and `options` object, see how to set the `valueKey` [property](#Custom-Object-Keys-\(value-key\)).


```vue
<template>
	<div>
		<strong>Mission:</strong> {{ mission }}<br>
		<strong>updateCount:</strong> {{ updateCount }}<br>
		<strong>selectCount:</strong> {{ selectCount }}<br>
		<strong>selectedOption:</strong> {{ selectedOption }}<br>
		<o-autocomplete
			v-model="mission"
			:options="suggestions"
			placeholder="Select shipping zones"
			@autocomplete:update="onUpdate"
			@option-select="onSelect"
		/>
	</div>
</template>

<script>
import { OAutocomplete } from '@square/orbit/components/Autocomplete';

export default {
	components: {
		OAutocomplete,
	},

	data() {
		return {
			mission: {},
			dataSet: [
				{
					value: 'Mercury Program',
					color: 'gray',
				},
				{
					value: 'Gemini Program',
				},
				{
					value: 'Apollo',
				},
				{
					value: 'Apollo–Soyuz Test Project',
				},
				{
					value: 'Shuttle-Mir Program',
				},
			],
			updateCount: 0,
			selectCount: 0,
			selectedOption: null,
		};
	},
	computed: {
		suggestions() {
			const mission = new RegExp(this.mission.value, 'i');
			return this.dataSet.filter(({ value }) => value.match(mission));
		},
	},
	methods: {
		onSelect(value, option) {
			this.selectCount += 1;
			this.selectedOption = option;
		},
		onUpdate() {
			this.updateCount += 1;
			this.selectedOption = null;
		},
	},
};
</script>
```

### Multiple Select
A multiple select is used when the user is able to select multiple items within an input. Users may paste a comma separated list, or interact with the autocomplete in order to add multiple items.

```vue
<template>
	<div>
		<strong>newValue</strong> {{ newValue }}<br>
		<strong>v-model:</strong> {{ selectedZones }}
		<br>
		<o-autocomplete
			v-model="selectedZones"
			:options="zoneSuggestions"
			multi-select
			placeholder="Select shipping zones"
			@autocomplete:input="setNewValue"
		/>
	</div>
</template>

<script>
import { OAutocomplete } from '@square/orbit/components/Autocomplete';

export default {
	components: {
		OAutocomplete,
	},

	data() {
		return {
			selectedZones: [
				{
					value: 'United States',
				},
			],
			shippingZones: [
				{
					value: 'Canada',
				},
				{
					value: 'China',
				},
				{
					value: 'Italy',
				},
				{
					value: 'United States',
				},
			],
			newValue: '',
		};
	},

	computed: {
		zoneSuggestions() {
			const zoneSuggestions = this.shippingZones.filter(({ value }) => {
				const lowercaseValue = value.toLowerCase();

				return lowercaseValue.search(this.newValue.toLowerCase()) > -1
				&& !this.selectedZones.find(
					({ value: selectedValue }) => selectedValue.toLowerCase() === lowercaseValue,
				);
			});

			zoneSuggestions.sort((a, b) => {
				const searchPosA = a.value.toLowerCase().search(this.newValue.toLowerCase());
				const searchPosB = b.value.toLowerCase().search(this.newValue.toLowerCase());

				return searchPosA - searchPosB;
			});

			return zoneSuggestions;
		},
	},

	methods: {
		setNewValue(val) {
			this.newValue = val;
		},
	},
};
</script>
```


### Allow users to add new values

It's possible to allow users to add their own custom values to an autocomplete and append a new value that's not part of the original data set.

To add this functionality:

- Add the prop `allow-custom-values` with a `String` to prefix the user's custom input
- Add `@option-select` event with a custom method to push the custom value into your data set

_Future Considerations are being considered to bundle default filter / sort methods that would help simplify the API on this feature_

```vue
<template>
	<div>
		<strong>v-model:</strong> {{ favoriteStars }}<br>
		<strong>newValue:</strong> {{ newValue }}<br>
		<o-autocomplete
			v-model="favoriteStars"
			:options="suggestedStars"
			multi-select
			allow-custom-values="Add new star"
			value-key="name"
			placeholder="What's your favorite star?"
			@autocomplete:input="setNewValue"
			@option-select="addNewSuggestion"
		/>
	</div>
</template>

<script>
import { OAutocomplete } from '@square/orbit/components/Autocomplete';

export default {
	components: {
		OAutocomplete,
	},

	data() {
		return {
			favoriteStars: [{
				name: 'Sirius',
			}],
			stars: [
				{ name: 'Sirius' },
				{ name: 'Arcturus' },
				{ name: 'Deneb' },
				{ name: 'Vega' },
				{ name: 'Altair' },
				{ name: 'Iota Draconis' },
			],
			newValue: '',
		};
	},

	computed: {
		suggestedStars() {
			const suggestedStars = this.stars.filter(({ name }) => {
				const lowercaseName = name.toLowerCase();

				return lowercaseName.search(this.newValue.toLowerCase()) > -1
				&& !this.favoriteStars.find(
					({ name: favoriteName }) => favoriteName.toLowerCase() === lowercaseName,
				);
			});

			suggestedStars.sort((a, b) => {
				const searchPosA = a.name.toLowerCase().search(this.newValue.toLowerCase());
				const searchPosB = b.name.toLowerCase().search(this.newValue.toLowerCase());

				return searchPosA - searchPosB;
			});
			return suggestedStars;
		},
	},

	methods: {
		setNewValue(val) {
			this.newValue = val;
		},
		addNewSuggestion(newName, optionObj) {
			const matchedStar = this.stars.find((currentStar) => currentStar.name
				&& currentStar.name.toLowerCase() === newName.toLowerCase());

			if (!matchedStar) {
				this.stars.push(optionObj);
			}
		},
	},
};
</script>
```

### Highlight invalid values

**Passing in a validation function.** Create a function that runs your validation logic against an input value and returns a `Boolean`. Pass this function into the `validator` prop.

**Filtering invalid values.** The `value` (v-model) the component returns will include all values, including invalid values. To get
just the valid values, we recommend creating a computed prop that runs your validation function
against each item.

```vue
<template>
	<div>
		<strong>v-model (includes *invalid* values):</strong> {{ selectedContacts }}<br>
		<strong>Invalid values:</strong> {{ invalidEmails }}<br><br>

		<div>
			<o-autocomplete
				v-model="selectedContacts"
				:options="suggestedContacts"
				:validator="isEmail"
				:delimiter="separateBy"
				value-key="email"
				allow-custom-values="Add new email"
				placeholder="ex. hiroki@hotmail.com, linnea@yahoo.com"
				multi-select
				@autocomplete:input="setNewValue"
			>
				<o-autocomplete-item
					slot-scope="email"
					:option="email"
					:disabled="email.disabled"
				>
					<div class="name">
						{{ email.name }}
					</div>
					<div :class="[ email, { disabled: email.disabled }]">
						{{ email.email }}
					</div>
				</o-autocomplete-item>
			</o-autocomplete>
		</div>
	</div>
</template>

<script>
import { OAutocomplete, OAutocompleteItem } from '@square/orbit/components/Autocomplete';

export default {
	components: {
		OAutocomplete,
		OAutocompleteItem,
	},

	data() {
		return {
			selectedContacts: [],
			newValue: '',
			value: '',
			separateBy: [',', ' '],
			contacts: [
				{
					name: 'Garner Bentley',
					company: 'TALKALOT',
					email: 'garner.bentley@talkalot.com',
				},
				{
					name: 'Elisa Vazquez',
					company: 'STRALUM',
					email: 'elisa.vazquez@stralum.co.uk',
					disabled: true,
				},
				{
					name: 'Stacie Petersen',
					company: 'NAMEBOX',
					email: 'stacie.petersen@namebox.me',
				},
				{
					name: 'Leigh Sykes',
					company: 'ZIDANT',
					email: 'leigh.sykes@zidant.biz',
				},
				{
					name: 'Marisa Le',
					company: 'PLASMOS',
					email: 'marisa.le@plasmos.io',
				},
				{
					name: 'Tania Patterson',
					company: 'CORMORAN',
					email: 'tania.patterson@cormoran.us',
				},
				{
					name: 'Gardner Jennings',
					company: 'UNISURE',
					email: 'gardner.jennings@unisure.ca',
					disabled: true,
				},
				{
					name: 'Oconnor Larsen',
					company: 'FITCORE',
					email: 'oconnor.larsen@fitcore.name',
				},
				{
					name: 'Mosley Rowland',
					company: 'DANJA',
					email: 'mosley.rowland@danja.net',
				},
				{
					name: 'Marks Meyer',
					company: 'XLEEN',
					email: 'marks.meyer@xleen.tv',
				},
				{
					name: 'Knowles Zimmerman',
					company: 'ISOSTREAM',
					email: 'knowles.zimmerman@isostream.org',
				},
				{
					name: 'Charity Winters',
					company: 'INSECTUS',
					email: 'charity.winters@insectus.info',
				},
			],
		};
	},

	computed: {
		// Filter the dropdown suggestions against the user input `newVal` and then alphabetize.
		suggestedContacts() {
			const suggestions = this.contacts.filter(({ email }) => {
				const lowercaseEmail = email.toLowerCase();

				return lowercaseEmail.search(this.newValue.toLowerCase()) > -1
				&& !this.selectedContacts.find(
					({ email: selectedEmail }) => selectedEmail.toLowerCase() === lowercaseEmail,
				);
			});

			suggestions.sort((a, b) => {
				const searchPosA = a.email.toLowerCase().search(this.newValue.toLowerCase());
				const searchPosB = b.email.toLowerCase().search(this.newValue.toLowerCase());
				return searchPosA - searchPosB;
			});
			return suggestions;
		},
		invalidEmails() {
			return this.selectedContacts.filter((contact) => !this.isEmail(contact));
		},
	},

	methods: {
		setNewValue(val) {
			this.newValue = val;
		},
		isEmail(contact) {
			// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(contact.email).toLowerCase());
		},
	},
};
</script>
<style scoped>
.autocomplete-ex {
	height: 300px;
}

.name {
	font-weight: 500;
}

.email {
	font-weight: 400;
	font-size: 14px;
}

.email:not(.disabled) {
	color: #708399;
}
</style>
```

### Custom Object Keys (value-key)
**If you'd like to change the object key relating to the `value` of the Autocomplete, you can do so by setting the `value-key` property.** This changes the expected format of the object created and evaluated within the `value`(v-model) property.

**Default value-key**
```
value(v-model) = {
	value: '',
},
```

**value-key="name"**
```
value(v-model) = {
	name: '',
},
```

The `value-key` affects what objects are created for new `value`(v-model) values, as well as the value that appears in multi-select Autocomplete pills. It also appears in the dropdown item when the `allow-custom-values` property is set.

Setting the `value-key` also affects the property evaluated on the `options` object, such as the default text displayed in dropdown items and determining whether a pill can be added in multi-select autocompletes (must be a valid dropdown option).


```vue
<template>
	<div>
		Country: {{ country }}<br>
		Selected Option: {{ selectedOption }}<br>
		Suggestions count: {{ suggestions.length }}<br>
		@autocomplete:update count: {{ updateCount }}<br>
		@option-select count: {{ selectCount }}<br>

		<o-autocomplete
			v-model="country"
			:options="suggestions"
			value-key="name"
			placeholder="Search for a country to add this region..."
			@autocomplete:update="updateCount += 1"
			@option-select="onSelect"
		>
			<o-autocomplete-item
				slot-scope="optionObj"
				:option="optionObj"
			>
				{{ optionObj.name }}
			</o-autocomplete-item>
		</o-autocomplete>
	</div>
</template>

<script>
import axios from 'axios';
import { OAutocomplete, OAutocompleteItem } from '@square/orbit/components/Autocomplete';

export default {
	components: {
		OAutocomplete,
		OAutocompleteItem,
	},

	data() {
		return {
			updateCount: 0,
			selectCount: 0,
			country: {
				name: '',
				field: 'shipping address',
			},
			selectedOption: null,
			countriesArr: [],
		};
	},

	created() {
		this.fetchCountries();
	},

	computed: {
		suggestions() {
			if (!this.country) { return []; }

			const country = new RegExp(this.country.name, 'i');
			return this.countriesArr.filter(({ name }) => name.match(country));
		},
	},
	methods: {
		fetchCountries() {
			axios('https://restcountries.eu/rest/v2/all?fields=name')
				.then(({ data }) => {
					this.countriesArr = data;
				});
		},

		onSelect(value, option) {
			this.selectCount += 1;
			this.selectedOption = option;
		},
	},
};
</script>
```

### Custom Formatted Dropdown Suggestions
If you'd like to customize how your options appear in the dropdown, can use the OAutocompleteItem component to format how your suggested options appear.

Be sure to pass in the component through a scoped slot, and set the `option` prop to the option provided.


```vue
<template>
	<div>
		<strong>v-model:</strong> {{ company }}
		<o-autocomplete
			v-model="company"
			:options="data"
			:empty-str="emptyText"
			:loading="isLoading"
			has-search-icon
			placeholder="Search for a company: NASA, SpaceX..."
			value-key="name"
			@autocomplete:input="fetchSuggestions"
		>
			<o-autocomplete-item
				slot-scope="optionObj"
				:option="optionObj"
			>
				<div
					:style="{ backgroundImage: `url(${optionObj.logo})` }"
					class="thumbnail"
				/>
				<div class="suggestion-text">
					{{ optionObj.name }}
					<br>
					{{ optionObj.domain }}
				</div>
			</o-autocomplete-item>
		</o-autocomplete>
	</div>
</template>

<script>
import axios from 'axios';
import { OAutocomplete, OAutocompleteItem } from '@square/orbit/components/Autocomplete';

export default {
	components: {
		OAutocomplete,
		OAutocompleteItem,
	},

	data() {
		return {
			company: {},
			data: [],
			isLoading: false,
		};
	},
	computed: {
		emptyText() {
			return this.isLoading ? '' : 'No results found';
		},
	},
	methods: {
		fetchSuggestions() {
			this.isLoading = true;
			clearTimeout(this.debounce);
			this.debounce = setTimeout(() => this._fetchSuggestions(), 100);
		},
		_fetchSuggestions() {
			if (!this.company || !this.company.name) {
				this.data = [];
				this.isLoading = false;
			} else {
				axios(
					'https://autocomplete.clearbit.com/v1/companies/suggest',
					{ params: { query: this.company.name } },
				).then(({ data }) => {
					this.isLoading = false;
					this.data = data;
				});
			}
		},
	},
};
</script>

<style scoped>
.autocomplete-ex {
	height: 300px;
}

.thumbnail {
	display: inline-block;
	height: 60px;
	width: 60px;
	margin-right: 16px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;
}

.suggestion-text {
	display: inline-block;
	line-height: 32px;
	vertical-align: top;
}
</style>
```

### Dropdown Footer
If you'd like to add a footer to your dropdown, you can use the `footer` slot to pass in your custom content.

```vue
<template>
	<div>
		<strong>v-model:</strong> {{ asteroid }}
		<o-autocomplete
			v-model="asteroid"
			:options="visibleSuggestions"
			value-key="name"
			placeholder="Search for an asteroid number..."
			@autocomplete:input="limit = 4"
		>
			<o-autocomplete-item
				slot-scope="optionObj"
				:option="optionObj"
			>
				<strong>{{ optionObj.name }}</strong> flew by at {{ optionObj.miss_mph }} mph
				<br>
				It missed {{ optionObj.orbiting }} by {{ optionObj.miss_miles }}
				miles on {{ optionObj.approach_date }}
			</o-autocomplete-item>
			<div
				v-show="canShowMore"
				slot="footer"
				class="footer"
				@click="limit += 4"
			>
				<o-icon name="plus" /> Show more results
			</div>
		</o-autocomplete>
	</div>
</template>

<script>
import { OAutocomplete, OAutocompleteItem } from '@square/orbit/components/Autocomplete';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OAutocomplete,
		OAutocompleteItem,
		OIcon,
	},

	data() {
		return {
			asteroid: {},
			limit: 4,
			asteroids: [
				{
					name: '315020 (2007 BG49)',
					miss_miles: '2850816',
					miss_mph: '18010',
					approach_date: '1990-05-26',
					orbiting: 'Mars',
				},
				{
					name: '356285 (2010 DE)',
					miss_miles: '5268794.5',
					miss_mph: '30714',
					approach_date: '1957-09-17',
					orbiting: 'Earth',
				},
				{
					name: '397237 (2006 KZ112)',
					miss_miles: '183263328',
					miss_mph: '36217',
					approach_date: '1927-07-10',
					orbiting: 'Merc',
				},
				{
					name: '153306 (2001 JL1)',
					miss_miles: '45810576',
					miss_mph: '29911',
					approach_date: '1932-03-30',
					orbiting: 'Earth',
				},
				{
					name: '210012 (2006 KT1)',
					miss_miles: '182420752',
					miss_mph: '4443',
					approach_date: '1956-01-02',
					orbiting: 'Juptr',
				},
				{
					name: '385580 (2004 XO14)',
					miss_miles: '43946552',
					miss_mph: '28863',
					approach_date: '1969-12-22',
					orbiting: 'Earth',
				},
			],
		};
	},

	computed: {
		suggestions() {
			const asteroid = this.asteroid && new RegExp(this.asteroid.name, 'i');
			return this.asteroids.filter(({ name }) => name.match(asteroid))
				.sort((a, b) => {
					const searchPosA = a.name.search(this.asteroid);
					const searchPosB = b.name.toLowerCase().search(this.asteroid);

					return searchPosA - searchPosB;
				});
		},
		visibleSuggestions() {
			return this.suggestions.slice(0, this.limit);
		},
		canShowMore() {
			if (this.visibleSuggestions && this.suggestions) {
				return this.visibleSuggestions.length < this.suggestions.length;
			}
			return false;
		},
	},
};
</script>

<style scoped>
.footer {
	padding: 24px;
	text-align: center;
	font-size: 16px;
	color: #0073ff;

	&:hover {
		cursor: pointer;
		color: #005ac7;
	}
}

.autocomplete-ex {
	height: 300px;
}
</style>
```

## Validation and Errors
Use the `o-form-item` component for validation and errors. See the docs for that [here](/components/Form).

### Autocomplete Attributes

| Name | Type    | Default | Description            |
| --------- |----------------------- |-------- |----- |
| `placeholder` | `String` | — | Adds a placeholder. |
| `disabled` | `Boolean` | `false` | Disables the input. |
| `prefix` | Add a prefix to the autocomplete field. Available only for `single-select` autocomplete. |
| `options` | `Array` | `false` | Array of objects which represent the options presented in the dropdown. |
| `value-key` | `String` | `value` | The property on the `value (v-model)` object to use as the input's value. |
| `delimiter` | `String`, `Array` | `','` | Used to separate content entered or pasted into the multiple select autocomplete. A String or Array of Strings that act as delimiters between multi-select values. |
| `empty-str` | `String` | - | Text shown in the dropdown when there are no results found. |
| `multi-select` | `Boolean` | `false` | Whether or not the user can select multiple options. |
| `allow-custom-values` | `String` | - | Whether or not the user can add custom options into the input. Expects a string that prefaces the new value in the dropdown item. |
| `validator` | `Function` | - | This function gets called for each user input value. Add your validation logic, return `true` to indicate a valid value and return `false` to indicate an invalid value. Invalid values will be highlighted in red.<br><br>This attribute can only be used with `multi-select` Autocompletes. |
| `loading` | `Boolean` | `false`   | Shows a loading indicator in the input.   |
| `disable-suggested-match` | `Boolean` | `false` | By default (`false`), the autocomplete highlights the first match in the dropdown for easy selection when the autocomplete has an inputted value. If set to true, the autocomplete will not highlight the first match in the dropdown when it has input, but it will highlight a value suggested by the property `allow-custom-values` if set.  |

## Autocomplete Methods

| Name | Accepts | Description |
| ---- | ------- | ----------- |
| `blur` | - | Removes focus from the input. |
| `focus` | - | Sets focus on the input. |

## Autocomplete Slots
| Name | Description |
| ---- | ----------- |
| `prefix` | Add a prefix to the autocomplete field. Available only for `single-select` autocomplete. |
| `footer` | Use to add a footer to your dropdown. Appears at the bottom of the dropdown. |

### Autocomplete Events

| Event       | Arguments     | Triggers when...            |
| ----------- |---------------|---------------------------- |
| `@autocomplete:update` | value(Object) | When the value of the value property changes. |
| `@autocomplete:input` | value(String) | When the value of the text input changes. |
| `@option-select` | value(String), option(Object) | When one of the options has been selected. Arguments are string value of the input when selected, and the option that was selected. |
| `@autocomplete:multi:delete` | deletedValue | When an already selected value is deleted from a multi-select Autocomplete. |

## AutocompleteItem Attributes

| Name | Type    | Default | Description            |
| --------- |----------------------- |-------- |----- |
| `option`* | `null` | - | *Required. The full object for the autocomplete option. Expects an object with a property `value`.  |
| `disabled` | `Boolean` | `false` | Disabled the individual autocomplete row option. |
