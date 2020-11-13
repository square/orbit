import { testComponents } from 'testing/utils';
import { OButtonGroup, OButtonGroupItem } from '@square/orbit/components/ButtonGroup';

const createVm = testComponents({ OButtonGroup, OButtonGroupItem });

describe('OButtonGroup', () => {
	it('Mount OButtonGroup', () => {
		const wrapper = createVm(`
			<o-button-group v-model="count">
				<o-button-group-item value="1">A</o-button-group-item>
			</o-button-group>
		`, {
			data() {
				return {
					count: 1,
				};
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
