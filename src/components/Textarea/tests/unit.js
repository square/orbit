import { testComponents } from 'testing/utils';
import { OTextarea } from '@square/orbit/components/Textarea';

const createVm = testComponents({ OTextarea });

describe('OTextarea', () => {
	it('Mount OTextarea', () => {
		const wrapper = createVm(`
			<o-textarea />
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
