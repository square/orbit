import { testComponents } from 'testing/utils';
import { OForm } from '@square/orbit/components/Form';

const createVm = testComponents({ OForm });

describe('OForm', () => {
	it('Mount OForm', () => {
		const wrapper = createVm(`
			<o-form>
				Hello World
			</o-form>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
