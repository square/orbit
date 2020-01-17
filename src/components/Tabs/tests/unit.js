import { testComponents } from 'testing/utils';
import { OTabs, OTabPane } from '@square/orbit/components/Tabs';

const createVm = testComponents({ OTabs, OTabPane });

describe('OTabs', () => {
	it('Mount OTabs', () => {
		const wrapper = createVm(`
			<o-tabs>
				<o-tab-pane>
					<template slot="label">Hello World</template>

					Hello World
				</o-tab-pane>
			</o-tabs>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});
