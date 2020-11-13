import { testComponents } from 'testing/utils';
import { OCard } from '@square/orbit/components/Card';

const createVm = testComponents({ OCard });

describe('OCard', () => {
	it('Mount OCard', () => {
		const wrapper = createVm(`
			<o-card @click="handleClick">
				Hello World
			</o-card>
		`, {
			methods: {
				handleClick: () => {},
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
