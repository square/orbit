import { testComponents } from 'testing/utils';
import { OLayer } from '@square/orbit/components/Layer';

const createVm = testComponents({ OLayer });

describe('OLayer', () => {
	it('Mount OLayer', () => {
		const wrapper = createVm(`
			<o-layer id="mountId" />
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
