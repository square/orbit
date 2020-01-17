import { testComponents } from 'testing/utils';
import { OToggle } from '@square/orbit/components/Toggle';

const createVm = testComponents({ OToggle });

describe('OToggle', () => {
	it('Mount OToggle', () => {
		const wrapper = createVm(`
			<o-toggle />
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
