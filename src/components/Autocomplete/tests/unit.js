import { testComponents } from 'testing/utils';
import { OLayout } from '@square/orbit/components/Layout';
import { OAutocomplete } from '@square/orbit/components/Autocomplete';

const createVm = testComponents({ OAutocomplete, OLayout });

describe('OAutocomplete', () => {
	it('Mounts', () => {
		const wrapper = createVm(`
			<o-layout has-layers>
				<o-autocomplete
					v-model="value"
					placeholder="NASA Missions... ex. Apollo, Constellation"
					:options="suggestions"
				/>
			</o-layout>
		`, {
			data() {
				return {
					value: {},
					dataSet: [
						{
							value: 'a',
						},
						{
							value: 'A',
						},
					],
				};
			},
			computed: {
				suggestions() {
					const inputVal = new RegExp(this.value.value, 'i');
					return this.dataSet.filter(({ value }) => value.match(inputVal));
				},
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
	it('Mounts with multi-select property', () => {
		const wrapper = createVm(`
			<o-layout has-layers>
				<o-autocomplete
					multi-select
					v-model="selectedItems"
					:options="suggestions"
				/>
			</o-layout>
		`, {
			data() {
				return {
					selectedItems: [{
						value: 'selected',
					}],
					suggestions: [{ value: 'test' }, { value: 'values' }],
				};
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
