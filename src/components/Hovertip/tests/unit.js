import { testComponents } from 'testing/utils';
import { OHovertip } from '@square/orbit/components/Hovertip';

const createVm = testComponents({ OHovertip });

describe('Hovertip', () => {
	it('Added as a directive', () => {
		const wrapper = createVm(`
			<div>
				<div class="trigger" v-hovertip="'Hover'">
					Hello
				</div>
			</div>
		`, {
			directives: {
				Hovertip: OHovertip,
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
