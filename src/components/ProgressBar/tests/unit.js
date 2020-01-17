import { testComponents } from 'testing/utils';
import { OProgressBar } from '@square/orbit/components/ProgressBar';

const createVm = testComponents({ OProgressBar });

describe('OProgressBar', () => {
	it('Mount OProgressBar', () => {
		const wrapper = createVm(`
			<o-progress-bar />
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
