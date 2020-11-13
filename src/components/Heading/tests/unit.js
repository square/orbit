import { testComponents } from 'testing/utils';
import { OHeading } from '@square/orbit/components/Heading';

const createVm = testComponents({ OHeading });

describe('OHeading', () => {
	it('Mount OHeading', () => {
		const wrapper = createVm(`
			<o-heading>
				Hello World
			</o-heading>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
