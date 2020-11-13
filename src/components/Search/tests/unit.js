import { testComponents } from 'testing/utils';
import { OSearch } from '@square/orbit/components/Search';

const createVm = testComponents({ OSearch });

describe('OSearch', () => {
	it('Mount OSearch', () => {
		const wrapper = createVm(`
			<o-search />
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
