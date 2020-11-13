import { testComponents } from 'testing/utils';
import { ORadioGroup, ORadio } from '@square/orbit/components/Radio';

const createVm = testComponents({ ORadioGroup, ORadio });

describe('ORadioGroup', () => {
	it('Mount ORadioGroup', () => {
		const wrapper = createVm(`
			<o-radio-group value="3">
				<o-radio value="3">Option A</o-radio>
			</o-radio-group>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
