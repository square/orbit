import { testComponents } from 'testing/utils';
import {
	OLayout,
	OLayoutSider,
	OLayoutHeader,
	OLayoutContent,
} from '@square/orbit/components/Layout';

const createVm = testComponents({
	OLayout,
	OLayoutSider,
	OLayoutHeader,
	OLayoutContent,
});

describe('OLayout', () => {
	it('Mount OLayout', () => {
		const wrapper = createVm(`
			<o-layout>
				Hello World

				<o-layout-sider>
					Sider
				</o-layout-sider>

				<o-layout-header>
					Header
				</o-layout-header>

				<o-layout-content>
					Content
				</o-layout-content>

			</o-layout>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
