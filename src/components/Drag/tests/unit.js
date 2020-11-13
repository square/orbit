import { testComponents } from 'testing/utils';
import { ODrag, ODragItem } from '@square/orbit/components/Drag';

const createVm = testComponents({ ODrag, ODragItem });

describe('ODrag', () => {
	it('mounts', () => {
		const wrapper = createVm(`
			<o-drag :value="[]"></o-drag>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

describe('ODragItem', () => {
	it('mounts inside ODrag', () => {
		const wrapper = createVm(`
			<o-drag :value="[]">
				<o-drag-item :index="0"></o-drag-item>
			</o-drag>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
