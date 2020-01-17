import { testComponents } from 'testing/utils';
import { OSelect } from '@square/orbit/components/Select';

const createVm = testComponents({ OSelect });

describe('OSelect', () => {
	it('mounts', () => {
		const wrapper = createVm(`
			<o-select :options="options" />
		`, {
			data() {
				return {
					options: [
						{
							value: 1,
							label: 'Option 1',
						},
					],
				};
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});

	it('shows placeholder if an invalid option value is set', () => {
		const placeholderText = 'Select an option';

		createVm(`
			<o-select
				placeholder="${placeholderText}"
				v-model="selectVal"
				:options="options"
			/>
		`, {
			data() {
				return {
					options: [
						{
							value: 1,
							label: 'Option 1',
						},
					],
					selectVal: 2,
				};
			},

			mounted() {
				let selectEl;
				if (this.$el.tagName === 'SELECT') {
					selectEl = this.$el;
				} else {
					selectEl = this.$el.getElementsByTagName('select')[0]; // eslint-disable-line prefer-destructuring
				}
				expect(selectEl.selectedOptions[0].text).toEqual(placeholderText);
			},
		});
	});
});
