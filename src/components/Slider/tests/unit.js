import { testComponents } from 'testing/utils';
import { OSlider } from '@square/orbit/components/Slider';

const createVm = testComponents({ OSlider });

describe('OSlider', () => {
	it('Mount OSlider', () => {
		const wrapper = createVm(`
			<o-slider />
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
