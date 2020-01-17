import { testComponents } from 'testing/utils';
import { OLayout } from '@square/orbit/components/Layout';
import { ODatepicker } from '@square/orbit/components/Datepicker';

const createVm = testComponents({ OLayout, ODatepicker });

describe('ODatepicker', () => {
	it('Mount ODatepicker', () => {
		const wrapper = createVm(`
			<o-layout has-layers>
				<o-datepicker
					v-model="myDate"
					placeholder="Select a date"
				/>
			</o-layout>
		`, {
			data() {
				return {
					myDate: Date.now(),
				};
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
