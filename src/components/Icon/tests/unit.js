import { testComponents } from 'testing/utils';
import { OIcon } from '@square/orbit/components/Icon';

const createVm = testComponents({ OIcon });

describe('OIcon', () => {
	it('Mount OIcon', () => {
		const wrapper = createVm(`
			<o-icon name="x" />
		`);

		expect(wrapper.vm._isMounted).toBe(true);
	});
});
